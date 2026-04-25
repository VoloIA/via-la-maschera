import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BrandColors } from '@/constants/brand';
import { maskPaths } from '@/data/mask-paths';
import { questionPathIds } from '@/data/question-paths';

function getQuestionCount(pathId: string) {
  return questionPathIds.filter((questionPathId) => questionPathId === pathId).length;
}

export default function PathsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#331A42', dark: '#170D20' }}
      headerImage={
        <View style={styles.headerContent}>
          <ThemedText lightColor="#F4E8FF" darkColor="#F4E8FF" style={styles.kicker}>
            Percorsi
          </ThemedText>
          <ThemedText type="title" lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.headerTitle}>
            Scegli quale maschera sfiorare
          </ThemedText>
          <ThemedText lightColor="#E8D8F6" darkColor="#E8D8F6" style={styles.headerText}>
            Ogni percorso raccoglie domande con lo stesso odore emotivo.
          </ThemedText>
        </View>
      }>
      <ThemedView style={styles.featuredPanel}>
        <ThemedText type="defaultSemiBold" style={styles.featuredLabel}>
          Percorso aperto
        </ThemedText>
        <ThemedText type="title" style={styles.featuredTitle}>
          Una domanda al giorno
        </ThemedText>
        <ThemedText>
          Le maschere non si aprono tutte insieme. Tornano una alla volta, quando hai abbastanza
          silenzio per riconoscerle.
        </ThemedText>
      </ThemedView>

      <View style={styles.pathsGrid}>
        {maskPaths.map((path) => (
          <ThemedView key={path.id} style={[styles.pathCard, path.locked ? styles.lockedCard : undefined]}>
            <View style={styles.pathHeader}>
              <View style={[styles.pathMark, { backgroundColor: path.accent }]} />
              <ThemedText style={path.locked ? styles.lockedBadge : styles.openBadge}>
                {path.locked ? 'Presto' : `${getQuestionCount(path.id)} domande`}
              </ThemedText>
            </View>

            <ThemedText type="subtitle">{path.title}</ThemedText>
            <ThemedText style={styles.pathDescription}>{path.description}</ThemedText>
            <ThemedText type="defaultSemiBold" style={[styles.pathSignal, { color: path.accent }]}>
              {path.signal}
            </ThemedText>
          </ThemedView>
        ))}
      </View>

      <ThemedView style={styles.notePanel}>
        <ThemedText type="subtitle">La stanza chiusa</ThemedText>
        <ThemedText>
          Alcune maschere restano in attesa. Non tutto deve aprirsi subito: certe porte funzionano
          proprio perche non rispondono quando le tocchi.
        </ThemedText>
      </ThemedView>
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
  featuredPanel: {
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.primary,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 18,
  },
  featuredLabel: {
    color: BrandColors.violet,
    textTransform: 'uppercase',
  },
  featuredTitle: {
    lineHeight: 38,
  },
  pathsGrid: {
    gap: 12,
  },
  pathCard: {
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  lockedCard: {
    opacity: 0.72,
  },
  pathHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pathMark: {
    borderRadius: 999,
    height: 14,
    width: 44,
  },
  openBadge: {
    backgroundColor: BrandColors.primarySoft,
    borderRadius: 999,
    color: BrandColors.primary,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lockedBadge: {
    backgroundColor: '#F1F1F1',
    borderRadius: 999,
    color: BrandColors.muted,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pathDescription: {
    color: BrandColors.muted,
  },
  pathSignal: {
    marginTop: 2,
  },
  notePanel: {
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
});
