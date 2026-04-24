import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const projectSteps = [
  'Ambiente installato',
  'Progetto Expo creato',
  'App avviata nel browser',
  'Primo salvataggio Git completato',
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0F766E', dark: '#12312F' }}
      headerImage={
        <View style={styles.headerContent}>
          <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.kicker}>
            AppMobile
          </ThemedText>
          <ThemedText type="title" lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.headerTitle}>
            La mia prima app
          </ThemedText>
          <ThemedText lightColor="#D9FFFB" darkColor="#D9FFFB" style={styles.headerText}>
            Base iniziale pronta: ora possiamo decidere funzioni, utenti e schermate.
          </ThemedText>
        </View>
      }>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Stato progetto</ThemedText>
        <ThemedText>
          Siamo nella fase in cui il progetto funziona, e abbiamo iniziato a sostituire la demo
          di Expo con contenuti nostri.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.progressPanel}>
        <ThemedText type="defaultSemiBold">Avanzamento verso pubblicazione store</ThemedText>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <ThemedText type="title" style={styles.progressNumber}>
          15%
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
        <ThemedText type="subtitle">Prossima decisione</ThemedText>
        <ThemedText>
          Il prossimo checkpoint serve a scegliere che problema deve risolvere la app. Da quella
          scelta nasceranno schermate e funzioni vere.
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
    width: '15%',
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
