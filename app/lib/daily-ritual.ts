import { defaultLanguage, type AppLanguageCode } from '@/constants/localization';
import { getMaskQuestionsForLanguage, maskQuestions } from '@/data/mask-questions';
import { type MaskPathId } from '@/data/mask-paths';
import { getMaskPathForQuestionIndex } from '@/data/question-paths';
import { getLocalItem, removeLocalItem, setLocalItem } from '@/lib/local-storage';

export const REFLECTION_DELAY_MS = 24 * 60 * 60 * 1000;

const LEGACY_STORAGE_KEY = 'via-la-maschera:digital-ritual:v1';
const ENTRIES_STORAGE_KEY = 'via-la-maschera:entries:v1';

export type DailyEntry = {
  answer: string;
  createdAt: number;
  dateKey: string;
  id: string;
  pathId: MaskPathId;
  question: string;
  questionKey: string;
  reflection: string;
  reflectionReadyAt: number;
  shareWithCommunity: boolean;
};

type LegacyDailyEntry = Omit<
  DailyEntry,
  'id' | 'pathId' | 'questionKey' | 'shareWithCommunity'
> &
  Partial<Pick<DailyEntry, 'pathId' | 'questionKey' | 'shareWithCommunity'>>;

export function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getQuestionIndex(dateKey: string) {
  const dayNumber = Math.floor(new Date(`${dateKey}T00:00:00`).getTime() / REFLECTION_DELAY_MS);

  return dayNumber % maskQuestions.length;
}

export function getQuestionKeyForIndex(questionIndex: number) {
  return `q-${questionIndex}`;
}

export function getQuestionKeyForDate(dateKey: string) {
  return getQuestionKeyForIndex(getQuestionIndex(dateKey));
}

export function getQuestionKeyForQuestion(question: string, dateKey: string) {
  const questionIndex = maskQuestions.findIndex((savedQuestion) => savedQuestion === question);

  return getQuestionKeyForIndex(questionIndex >= 0 ? questionIndex : getQuestionIndex(dateKey));
}

export function getQuestionForDate(dateKey: string, language: AppLanguageCode = defaultLanguage) {
  return getMaskQuestionsForLanguage(language)[getQuestionIndex(dateKey)];
}

export function getMaskPathForDate(dateKey: string) {
  return getMaskPathForQuestionIndex(getQuestionIndex(dateKey));
}

export function buildReflection(
  answer: string,
  question: string,
  language: AppLanguageCode = defaultLanguage
) {
  const isLongAnswer = answer.trim().length > 130;
  const reflectionCopy = {
    it: {
      close:
        'Per oggi basta questo: hai tolto un millimetro di maschera. Non serve strappare tutto insieme.',
      long:
        'Hai risposto senza restare in superficie, e questo di solito accade quando una domanda ha toccato qualcosa che meritava spazio.',
      notice:
        'Il punto non è giudicare la risposta. Il punto è notare dove hai esitato, cosa hai scelto di dire e cosa hai lasciato appena fuori dalla porta.',
      question: `La domanda era: "${question}"`,
      short: 'Hai lasciato una traccia breve, ma anche le risposte brevi a volte proteggono qualcosa di preciso.',
    },
    en: {
      close:
        'For today, this is enough: you removed one millimetre of mask. You do not need to tear everything away at once.',
      long:
        'You answered without staying on the surface, and that usually happens when a question touches something that needed space.',
      notice:
        'The point is not to judge the answer. The point is to notice where you hesitated, what you chose to say, and what stayed just outside the door.',
      question: `The question was: "${question}"`,
      short: 'You left a brief trace, but brief answers sometimes protect something precise.',
    },
    uk: {
      close: 'На сьогодні цього достатньо: ти зняв міліметр маски. Не треба зривати все одразу.',
      long:
        'Ти відповів не поверхово, і так часто буває, коли запитання торкнулося чогось, що потребувало простору.',
      notice:
        'Сенс не в тому, щоб судити відповідь. Сенс у тому, щоб помітити, де ти вагався, що вирішив сказати і що залишив за дверима.',
      question: `Запитання було: "${question}"`,
      short: 'Ти залишив короткий слід, але короткі відповіді іноді захищають щось дуже точне.',
    },
    ru: {
      close: 'На сегодня этого достаточно: ты снял миллиметр маски. Не нужно срывать всё сразу.',
      long:
        'Ты ответил не поверхностно, и так обычно бывает, когда вопрос коснулся чего-то, чему нужно было место.',
      notice:
        'Смысл не в том, чтобы судить ответ. Смысл в том, чтобы заметить, где ты колебался, что решил сказать и что оставил за дверью.',
      question: `Вопрос был: "${question}"`,
      short: 'Ты оставил короткий след, но короткие ответы иногда защищают что-то очень точное.',
    },
    es: {
      close:
        'Por hoy basta esto: quitaste un milímetro de máscara. No hace falta arrancarlo todo de una vez.',
      long:
        'Respondiste sin quedarte en la superficie, y eso suele ocurrir cuando una pregunta tocó algo que necesitaba espacio.',
      notice:
        'El punto no es juzgar la respuesta. El punto es notar dónde dudaste, qué elegiste decir y qué dejaste apenas fuera de la puerta.',
      question: `La pregunta era: "${question}"`,
      short: 'Dejaste una huella breve, pero las respuestas breves a veces protegen algo muy preciso.',
    },
  }[language];

  return [
    isLongAnswer ? reflectionCopy.long : reflectionCopy.short,
    reflectionCopy.question,
    reflectionCopy.notice,
    reflectionCopy.close,
  ].join('\n\n');
}

export function formatRemainingTime(milliseconds: number) {
  const safeMilliseconds = Math.max(milliseconds, 0);
  const hours = Math.floor(safeMilliseconds / (60 * 60 * 1000));
  const minutes = Math.ceil((safeMilliseconds % (60 * 60 * 1000)) / (60 * 1000));

  if (hours <= 0) {
    return `${minutes} min`;
  }

  return `${hours} h ${minutes} min`;
}

function normalizeEntry(entry: DailyEntry | LegacyDailyEntry): DailyEntry {
  return {
    ...entry,
    id: 'id' in entry && entry.id ? entry.id : `${entry.dateKey}-${entry.createdAt}`,
    pathId: entry.pathId ?? getMaskPathForDate(entry.dateKey).id,
    questionKey: entry.questionKey ?? getQuestionKeyForQuestion(entry.question, entry.dateKey),
    shareWithCommunity: entry.shareWithCommunity ?? false,
  };
}

export function sortEntries(entries: DailyEntry[]) {
  return [...entries].sort((first, second) => second.createdAt - first.createdAt);
}

export function mergeDailyEntries(primaryEntries: DailyEntry[], secondaryEntries: DailyEntry[]) {
  const entryMap = new Map<string, DailyEntry>();

  [...secondaryEntries, ...primaryEntries].forEach((entry) => {
    entryMap.set(entry.dateKey, normalizeEntry(entry));
  });

  return sortEntries([...entryMap.values()]);
}

export async function replaceDailyEntries(entries: DailyEntry[]) {
  const nextEntries = sortEntries(entries.map(normalizeEntry));
  await setLocalItem(ENTRIES_STORAGE_KEY, JSON.stringify(nextEntries));

  return nextEntries;
}

export async function loadDailyEntries() {
  const savedEntries = await getLocalItem(ENTRIES_STORAGE_KEY);

  if (savedEntries) {
    try {
      const parsedEntries = JSON.parse(savedEntries) as Array<DailyEntry | LegacyDailyEntry>;

      return sortEntries(parsedEntries.map(normalizeEntry));
    } catch {
      await removeLocalItem(ENTRIES_STORAGE_KEY);
    }
  }

  const legacyEntry = await getLocalItem(LEGACY_STORAGE_KEY);

  if (!legacyEntry) {
    return [];
  }

  try {
    const migratedEntry = normalizeEntry(JSON.parse(legacyEntry) as LegacyDailyEntry);
    await setLocalItem(ENTRIES_STORAGE_KEY, JSON.stringify([migratedEntry]));
    await removeLocalItem(LEGACY_STORAGE_KEY);

    return [migratedEntry];
  } catch {
    await removeLocalItem(LEGACY_STORAGE_KEY);
    return [];
  }
}

export async function saveDailyEntry(entry: DailyEntry) {
  const entries = await loadDailyEntries();
  const nextEntries = sortEntries([
    entry,
    ...entries.filter((savedEntry) => savedEntry.dateKey !== entry.dateKey),
  ]);

  await setLocalItem(ENTRIES_STORAGE_KEY, JSON.stringify(nextEntries));

  return nextEntries;
}

export function getEntryForDate(entries: DailyEntry[], dateKey: string) {
  return entries.find((entry) => entry.dateKey === dateKey) ?? null;
}

export function createDailyEntry(
  answer: string,
  question: string,
  dateKey: string,
  shareWithCommunity = false,
  language: AppLanguageCode = defaultLanguage
) {
  const createdAt = Date.now();

  return {
    answer: answer.trim(),
    createdAt,
    dateKey,
    id: `${dateKey}-${createdAt}`,
    pathId: getMaskPathForDate(dateKey).id,
    question,
    questionKey: getQuestionKeyForDate(dateKey),
    reflection: buildReflection(answer, question, language),
    reflectionReadyAt: createdAt + REFLECTION_DELAY_MS,
    shareWithCommunity,
  };
}
