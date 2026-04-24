import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const projectSteps = [
  'Ambiente installato',
  'Progetto Expo creato',
  'App avviata nel browser',
  'Primo salvataggio Git completato',
  'Idea misteriosa scelta',
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0F766E', dark: '#12312F' }}
      headerImage={
        <View style={styles.headerContent}>
          <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.kicker}>
            Soglia
          </ThemedText>
          <ThemedText type="title" lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.headerTitle}>
            Il segnale di oggi
          </ThemedText>
          <ThemedText lightColor="#D9FFFB" darkColor="#D9FFFB" style={styles.headerText}>
            Una piccola traccia quotidiana. Sottile, ambigua, forse solo una coincidenza.
          </ThemedText>
        </View>
      }>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Stato progetto</ThemedText>
        <ThemedText>
          Soglia sara una app di intrattenimento misterioso: ogni giorno rivela un segnale da
          interpretare, conservare e collegare agli altri frammenti.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.progressPanel}>
        <ThemedText type="defaultSemiBold">Avanzamento verso pubblicazione store</ThemedText>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <ThemedText type="title" style={styles.progressNumber}>
          20%
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Fatto finora</ThemedText>
        {projectSteps.map((step) => (
          <View key={step} style={styles.stepRow}>
            <View style={styles.stepDot} />
            <ThemedText>{step}</ThemedText>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Primo rituale</ThemedText>
        <ThemedText>
          Il prossimo checkpoint costruira il primo gesto di Soglia: toccare, rivelare il segnale
          del giorno e salvarlo in archivio.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    bottom: 28,
    left: 28,
    maxWidth: 520,
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
  section: {
    gap: 10,
  },
  progressPanel: {
    borderColor: '#0F766E',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  progressTrack: {
    backgroundColor: '#CFEDEA',
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: '#0F766E',
    height: '100%',
    width: '20%',
  },
  progressNumber: {
    color: '#0F766E',
  },
  stepRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  stepDot: {
    backgroundColor: '#0F766E',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
});
