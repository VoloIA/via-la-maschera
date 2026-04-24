import { maskQuestions } from '@/data/mask-questions';
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
  reflection: string;
  reflectionReadyAt: number;
};

type LegacyDailyEntry = Omit<DailyEntry, 'id' | 'pathId'> & Partial<Pick<DailyEntry, 'pathId'>>;

export function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getQuestionIndex(dateKey: string) {
  const dayNumber = Math.floor(new Date(`${dateKey}T00:00:00`).getTime() / REFLECTION_DELAY_MS);

  return dayNumber % maskQuestions.length;
}

export function getQuestionForDate(dateKey: string) {
  return maskQuestions[getQuestionIndex(dateKey)];
}

export function getMaskPathForDate(dateKey: string) {
  return getMaskPathForQuestionIndex(getQuestionIndex(dateKey));
}

export function buildReflection(answer: string, question: string) {
  const trimmedAnswer = answer.trim();
  const sentence =
    trimmedAnswer.length > 130
      ? 'Hai risposto senza restare in superficie, e questo di solito accade quando una domanda ha toccato qualcosa che meritava spazio.'
      : 'Hai lasciato una traccia breve, ma anche le risposte brevi a volte proteggono qualcosa di preciso.';

  return [
    sentence,
    `La domanda era: "${question}"`,
    'Il punto non e giudicare la risposta. Il punto e notare dove hai esitato, cosa hai scelto di dire e cosa hai lasciato appena fuori dalla porta.',
    'Per oggi basta questo: hai tolto un millimetro di maschera. Non serve strappare tutto insieme.',
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
  if ('id' in entry && entry.id) {
    return entry;
  }

  return {
    ...entry,
    id: `${entry.dateKey}-${entry.createdAt}`,
    pathId: entry.pathId ?? getMaskPathForDate(entry.dateKey).id,
  };
}

function sortEntries(entries: DailyEntry[]) {
  return [...entries].sort((first, second) => second.createdAt - first.createdAt);
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

export function createDailyEntry(answer: string, question: string, dateKey: string) {
  const createdAt = Date.now();

  return {
    answer: answer.trim(),
    createdAt,
    dateKey,
    id: `${dateKey}-${createdAt}`,
    pathId: getMaskPathForDate(dateKey).id,
    question,
    reflection: buildReflection(answer, question),
    reflectionReadyAt: createdAt + REFLECTION_DELAY_MS,
  };
}
