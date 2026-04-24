import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const checkpoints = [
  { label: 'Check 1-2', text: 'Cartella pronta, Node.js e npm verificati.' },
  { label: 'Check 3-5', text: 'Progetto Expo creato, avviato e visto nel browser.' },
  { label: 'Check 6-7', text: 'Prima modifica fatta e primo salvataggio Git creato.' },
  { label: 'Check 8', text: 'Schermata demo sostituita con una base iniziale nostra.' },
  { label: 'Check 9', text: 'Scelta app: Soglia, intrattenimento misterioso quotidiano.' },
];

const nextPhases = [
  'Costruire il segnale giornaliero',
  'Creare archivio anomalie',
  'Aggiungere frammenti rari',
  'Preparare icona, nome, privacy e build store',
];

export default function JourneyScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1E3A5F', dark: '#172334' }}
      headerImage={
        <View style={styles.headerContent}>
          <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.kicker}>
            Percorso
          </ThemedText>
          <ThemedText type="title" lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.headerTitle}>
            La ricetta di Soglia
          </ThemedText>
          <ThemedText lightColor="#DCEBFF" darkColor="#DCEBFF" style={styles.headerText}>
            Ogni checkpoint chiude un passaggio e rende il progetto piu stabile.
          </ThemedText>
        </View>
      }>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Checkpoint completati</ThemedText>
        {checkpoints.map((checkpoint) => (
          <View key={checkpoint.label} style={styles.timelineRow}>
            <View style={styles.timelineMarker} />
            <View style={styles.timelineText}>
              <ThemedText type="defaultSemiBold">{checkpoint.label}</ThemedText>
              <ThemedText>{checkpoint.text}</ThemedText>
            </View>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Prossime fasi</ThemedText>
        {nextPhases.map((phase, index) => (
          <View key={phase} style={styles.phaseRow}>
            <ThemedText type="defaultSemiBold" style={styles.phaseNumber}>
              {index + 1}
            </ThemedText>
            <ThemedText>{phase}</ThemedText>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={styles.notePanel}>
        <ThemedText type="defaultSemiBold">Percentuale attuale: 20%</ThemedText>
        <ThemedText>
          La base tecnica esiste e ora abbiamo scelto un prodotto di intrattenimento. Per arrivare
          al 100% servono funzioni reali, atmosfera, test, build e pubblicazione negli store.
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
    gap: 14,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineMarker: {
    backgroundColor: '#1E3A5F',
    borderRadius: 6,
    height: 12,
    marginTop: 6,
    width: 12,
  },
  timelineText: {
    flex: 1,
    gap: 2,
  },
  phaseRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  phaseNumber: {
    backgroundColor: '#DCEBFF',
    borderRadius: 8,
    color: '#1E3A5F',
    height: 32,
    lineHeight: 32,
    textAlign: 'center',
    width: 32,
  },
  notePanel: {
    borderColor: '#1E3A5F',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
});
