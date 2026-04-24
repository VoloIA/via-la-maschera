import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { maskQuestions } from '@/data/mask-questions';

const productLoop = [
  'Domanda giornaliera',
  'Risposta sigillata',
  'Riflessione dopo 24 ore',
  'Archivio personale',
  'Serie di maschere sbloccabili',
];

const monetization = [
  'Gratis: una domanda al giorno',
  'Premium futuro: percorsi tematici',
  'Premium futuro: riflessioni AI piu profonde',
  'Premium futuro: archivio avanzato',
];

export default function JourneyScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#331A42', dark: '#170D20' }}
      headerImage={
        <View style={styles.headerContent}>
          <ThemedText lightColor="#F4E8FF" darkColor="#F4E8FF" style={styles.kicker}>
            Dietro il rito
          </ThemedText>
          <ThemedText type="title" lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.headerTitle}>
            Perche torna in mente
          </ThemedText>
          <ThemedText lightColor="#E8D8F6" darkColor="#E8D8F6" style={styles.headerText}>
            Via la Maschera usa attesa, scarsita e domande intime per creare ritorno quotidiano.
          </ThemedText>
        </View>
      }>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Loop magnetico</ThemedText>
        {productLoop.map((phase, index) => (
          <View key={phase} style={styles.phaseRow}>
            <ThemedText type="defaultSemiBold" style={styles.phaseNumber}>
              {index + 1}
            </ThemedText>
            <ThemedText>{phase}</ThemedText>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={styles.notePanel}>
        <ThemedText type="subtitle">Basso costo API</ThemedText>
        <ThemedText>
          La prima versione usa domande pre-caricate e riflessioni locali. L AI puo arrivare dopo,
          solo una volta per risposta e solo per utenti premium o test selezionati.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Monetizzazione futura</ThemedText>
        {monetization.map((item) => (
          <View key={item} style={styles.bulletRow}>
            <View style={styles.dot} />
            <ThemedText>{item}</ThemedText>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={styles.notePanel}>
        <ThemedText type="defaultSemiBold">Domande caricate: {maskQuestions.length}</ThemedText>
        <ThemedText>
          Questo basta per quasi due mesi di rituale giornaliero senza generare contenuti via API.
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
  section: {
    gap: 14,
  },
  phaseRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  phaseNumber: {
    backgroundColor: '#EFE4F7',
    borderRadius: 8,
    color: '#5A2D82',
    height: 32,
    lineHeight: 32,
    textAlign: 'center',
    width: 32,
  },
  notePanel: {
    borderColor: '#5A2D82',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  bulletRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  dot: {
    backgroundColor: '#5A2D82',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
});
