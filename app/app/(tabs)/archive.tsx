import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getMaskPathById } from '@/data/question-paths';
import { type DailyEntry, formatRemainingTime, loadDailyEntries } from '@/lib/daily-ritual';

function formatDate(dateKey: string) {
  const [year, month, day] = dateKey.split('-');

  return `${day}/${month}/${year}`;
}

function getUnlockedCount(entries: DailyEntry[], now: number) {
  return entries.filter((entry) => now >= entry.reflectionReadyAt).length;
}

export default function ArchiveScreen() {
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadArchive() {
        const savedEntries = await loadDailyEntries();

        if (isActive) {
          setEntries(savedEntries);
          setNow(Date.now());
          setIsLoading(false);
        }
      }

      loadArchive();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const unlockedCount = getUnlockedCount(entries, now);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#2B1E38', dark: '#150D1E' }}
      headerImage={
        <View style={styles.headerContent}>
          <ThemedText lightColor="#F4E8FF" darkColor="#F4E8FF" style={styles.kicker}>
            Archivio
          </ThemedText>
          <ThemedText type="title" lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.headerTitle}>
            Le maschere tolte
          </ThemedText>
          <ThemedText lightColor="#E8D8F6" darkColor="#E8D8F6" style={styles.headerText}>
            Ogni risposta resta qui. Alcune si aprono solo quando e passato abbastanza tempo.
          </ThemedText>
        </View>
      }>
      <ThemedView style={styles.statsPanel}>
        <View style={styles.statItem}>
          <ThemedText type="title" style={styles.statNumber}>
            {entries.length}
          </ThemedText>
          <ThemedText>risposte</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="title" style={styles.statNumber}>
            {unlockedCount}
          </ThemedText>
          <ThemedText>specchi aperti</ThemedText>
        </View>
      </ThemedView>

      {isLoading ? (
        <ThemedView style={styles.notePanel}>
          <ThemedText>Sto cercando le tracce salvate...</ThemedText>
        </ThemedView>
      ) : null}

      {!isLoading && entries.length === 0 ? (
        <ThemedView style={styles.emptyPanel}>
          <ThemedText type="subtitle">Ancora nessuna maschera</ThemedText>
          <ThemedText>
            Rispondi alla domanda del giorno nella Home. Da quel momento l archivio iniziera a
            ricordare.
          </ThemedText>
        </ThemedView>
      ) : null}

      {entries.map((entry) => {
        const isReflectionReady = now >= entry.reflectionReadyAt;
        const maskPath = getMaskPathById(entry.pathId);

        return (
          <ThemedView key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <ThemedText type="defaultSemiBold">{formatDate(entry.dateKey)}</ThemedText>
              <ThemedText style={isReflectionReady ? styles.openBadge : styles.lockedBadge}>
                {isReflectionReady ? 'Aperta' : 'Sigillata'}
              </ThemedText>
            </View>

            <View style={styles.pathRow}>
              <View style={[styles.pathMark, { backgroundColor: maskPath.accent }]} />
              <ThemedText
                type="defaultSemiBold"
                style={[styles.pathTitle, { color: maskPath.accent }]}>
                Maschera {maskPath.title}
              </ThemedText>
            </View>

            <ThemedText type="subtitle">{entry.question}</ThemedText>
            <ThemedText style={styles.answerPreview}>{entry.answer}</ThemedText>

            {isReflectionReady ? (
              <ThemedView style={styles.reflectionPanel}>
                <ThemedText type="defaultSemiBold">Riflessione</ThemedText>
                <ThemedText>{entry.reflection}</ThemedText>
              </ThemedView>
            ) : (
              <ThemedView style={styles.lockedPanel}>
                <ThemedText>
                  Lo specchio si apre tra {formatRemainingTime(entry.reflectionReadyAt - now)}.
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        );
      })}
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
  statsPanel: {
    borderColor: '#5A2D82',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    gap: 2,
  },
  statNumber: {
    color: '#5A2D82',
  },
  notePanel: {
    borderColor: '#D9C6E8',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  emptyPanel: {
    borderColor: '#D9C6E8',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  entryCard: {
    borderColor: '#D9C6E8',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  entryHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  openBadge: {
    backgroundColor: '#E1F4EC',
    borderRadius: 999,
    color: '#2F765C',
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lockedBadge: {
    backgroundColor: '#EFE4F7',
    borderRadius: 999,
    color: '#5A2D82',
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  answerPreview: {
    color: '#6F6478',
  },
  pathRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  pathMark: {
    borderRadius: 999,
    height: 10,
    width: 36,
  },
  pathTitle: {
    flex: 1,
  },
  reflectionPanel: {
    borderColor: '#BFE6D4',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 12,
  },
  lockedPanel: {
    borderColor: '#D9C6E8',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
});
