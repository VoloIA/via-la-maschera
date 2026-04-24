import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { maskQuestions } from '@/data/mask-questions';
import { getLocalItem, removeLocalItem, setLocalItem } from '@/lib/local-storage';

const REFLECTION_DELAY_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'via-la-maschera:digital-ritual:v1';

type DailyEntry = {
  answer: string;
  createdAt: number;
  dateKey: string;
  question: string;
  reflection: string;
  reflectionReadyAt: number;
};

function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getQuestionIndex(dateKey: string) {
  const dayNumber = Math.floor(new Date(`${dateKey}T00:00:00`).getTime() / REFLECTION_DELAY_MS);

  return dayNumber % maskQuestions.length;
}

function buildReflection(answer: string, question: string) {
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

function formatRemainingTime(milliseconds: number) {
  const safeMilliseconds = Math.max(milliseconds, 0);
  const hours = Math.floor(safeMilliseconds / (60 * 60 * 1000));
  const minutes = Math.ceil((safeMilliseconds % (60 * 60 * 1000)) / (60 * 1000));

  if (hours <= 0) {
    return `${minutes} min`;
  }

  return `${hours} h ${minutes} min`;
}

export default function HomeScreen() {
  const todayKey = getDateKey();
  const question = useMemo(() => maskQuestions[getQuestionIndex(todayKey)], [todayKey]);
  const [answer, setAnswer] = useState('');
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const [isLoadingEntry, setIsLoadingEntry] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let isMounted = true;

    async function loadEntry() {
      const savedEntry = await getLocalItem(STORAGE_KEY);

      if (!isMounted) {
        return;
      }

      if (!savedEntry) {
        setIsLoadingEntry(false);
        return;
      }

      try {
        const parsedEntry = JSON.parse(savedEntry) as DailyEntry;

        if (parsedEntry.dateKey === todayKey) {
          setEntry(parsedEntry);
          setAnswer(parsedEntry.answer);
        }
      } catch {
        await removeLocalItem(STORAGE_KEY);
      } finally {
        if (isMounted) {
          setIsLoadingEntry(false);
        }
      }
    }

    loadEntry();

    return () => {
      isMounted = false;
    };
  }, [todayKey]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const isAnswerReady = answer.trim().length >= 8;
  const isReflectionReady = entry ? now >= entry.reflectionReadyAt : false;
  const remainingTime = entry ? formatRemainingTime(entry.reflectionReadyAt - now) : null;

  const saveAnswer = async () => {
    if (!isAnswerReady) {
      return;
    }

    const createdAt = Date.now();
    const nextEntry: DailyEntry = {
      answer: answer.trim(),
      createdAt,
      dateKey: todayKey,
      question,
      reflection: buildReflection(answer, question),
      reflectionReadyAt: createdAt + REFLECTION_DELAY_MS,
    };

    setEntry(nextEntry);
    await setLocalItem(STORAGE_KEY, JSON.stringify(nextEntry));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#251433', dark: '#160D22' }}
      headerImage={
        <View style={styles.headerContent}>
          <ThemedText lightColor="#F4E8FF" darkColor="#F4E8FF" style={styles.kicker}>
            Via la Maschera
          </ThemedText>
          <ThemedText type="title" lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.headerTitle}>
            Una domanda. Poi silenzio.
          </ThemedText>
          <ThemedText lightColor="#E8D8F6" darkColor="#E8D8F6" style={styles.headerText}>
            Rispondi oggi. Domani la app ti restituisce uno specchio gentile.
          </ThemedText>
        </View>
      }>
      <ThemedView style={styles.ritualCard}>
        <View style={styles.cardHeader}>
          <ThemedText type="defaultSemiBold" style={styles.eyebrow}>
            Domanda del giorno
          </ThemedText>
          <ThemedText style={styles.badge}>25%</ThemedText>
        </View>

        <ThemedText type="title" style={styles.question}>
          {question}
        </ThemedText>

        <ThemedText style={styles.smallText}>
          {isLoadingEntry
            ? 'Sto riaprendo il sigillo di oggi...'
            : 'Intrattenimento introspettivo, non terapia. Scrivi senza fare bella figura.'}
        </ThemedText>

        <TextInput
          editable={!entry}
          multiline
          onChangeText={setAnswer}
          placeholder="Togli la prima maschera qui..."
          placeholderTextColor="#8E8198"
          style={[styles.input, entry ? styles.inputLocked : undefined]}
          textAlignVertical="top"
          value={answer}
        />

        {!entry ? (
          <Pressable
            accessibilityRole="button"
            disabled={!isAnswerReady || isLoadingEntry}
            onPress={saveAnswer}
            style={[
              styles.primaryButton,
              !isAnswerReady || isLoadingEntry ? styles.primaryButtonDisabled : undefined,
            ]}>
            <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.primaryButtonText}>
              Sigilla la risposta
            </ThemedText>
          </Pressable>
        ) : (
          <ThemedView style={styles.lockedPanel}>
            <ThemedText type="defaultSemiBold">Risposta sigillata</ThemedText>
            <ThemedText>
              La riflessione si apre tra {remainingTime}. Questo ritardo e parte del rituale:
              impedisce alla app di diventare una gratificazione immediata qualsiasi.
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      {entry && isReflectionReady ? (
        <ThemedView style={styles.reflectionCard}>
          <ThemedText type="subtitle">Lo specchio di ieri</ThemedText>
          <ThemedText>{entry.reflection}</ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Come trattiene le persone</ThemedText>
          <View style={styles.stepRow}>
            <View style={styles.stepDot} />
            <ThemedText>Una sola domanda al giorno: scarsita e attesa.</ThemedText>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepDot} />
            <ThemedText>La risposta viene riletta dopo 24 ore, quando fa meno rumore.</ThemedText>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepDot} />
            <ThemedText>Le riflessioni partono locali: poche API, costi bassi.</ThemedText>
          </View>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    bottom: 28,
    left: 28,
    maxWidth: 560,
    position: 'absolute',
    right: 28,
  },
  kicker: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  headerTitle: {
    lineHeight: 38,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 17,
    lineHeight: 25,
  },
  ritualCard: {
    borderColor: '#5A2D82',
    borderRadius: 8,
    borderWidth: 1,
    gap: 16,
    padding: 18,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: '#7B3FB2',
    textTransform: 'uppercase',
  },
  badge: {
    backgroundColor: '#EFE4F7',
    borderRadius: 999,
    color: '#5A2D82',
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  question: {
    lineHeight: 38,
  },
  smallText: {
    color: '#6F6478',
  },
  input: {
    borderColor: '#C9B6D8',
    borderRadius: 8,
    borderWidth: 1,
    color: '#24152E',
    fontSize: 16,
    lineHeight: 24,
    minHeight: 150,
    padding: 14,
  },
  inputLocked: {
    backgroundColor: '#F7F1FA',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#5A2D82',
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryButtonDisabled: {
    backgroundColor: '#A997B9',
  },
  primaryButtonText: {
    fontWeight: '700',
  },
  lockedPanel: {
    borderColor: '#D9C6E8',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 14,
  },
  reflectionCard: {
    borderColor: '#2F765C',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 18,
  },
  section: {
    gap: 12,
  },
  stepRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  stepDot: {
    backgroundColor: '#5A2D82',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
});
