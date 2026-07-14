import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BrandColors, BrandRadii, BrandShadows, BrandSpacing } from '@/constants/brand';
import { useSettings } from '@/contexts/settings-context';

export default function ModalScreen() {
  const { copy } = useSettings();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.panel}>
        <View style={styles.iconWrap}>
          <IconSymbol name="eye.fill" color={BrandColors.teal} size={24} />
        </View>
        <ThemedText type="title" style={styles.title}>
          {copy.archive.reflection}
        </ThemedText>
        <ThemedText style={styles.copy}>
          {copy.home.ritualStep3}
        </ThemedText>
        <Link href="/" dismissTo style={styles.link}>
          <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.linkText}>
            {copy.common.home}
          </ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  panel: {
    ...BrandShadows.lifted,
    alignItems: 'center',
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.md,
    maxWidth: 420,
    padding: BrandSpacing.xxl,
    width: '100%',
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: BrandColors.tealSoft,
    borderRadius: BrandRadii.pill,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  title: {
    textAlign: 'center',
  },
  copy: {
    color: BrandColors.muted,
    textAlign: 'center',
  },
  link: {
    alignItems: 'center',
    backgroundColor: BrandColors.primary,
    borderRadius: BrandRadii.control,
    justifyContent: 'center',
    marginTop: 6,
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 12,
    width: '100%',
  },
  linkText: {
    fontWeight: '700',
  },
});
