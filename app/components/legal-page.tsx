import { Link } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BrandColors, BrandRadii, BrandShadows, BrandSpacing, BrandThemes } from '@/constants/brand';
import { useColorScheme } from '@/hooks/use-color-scheme';

type LegalPageProps = {
  backLabel: string;
  children?: ReactNode;
  intro: string;
  kicker: string;
  sections: {
    body: string[];
    title: string;
  }[];
  title: string;
  updated: string;
};

export function LegalPage({ backLabel, children, intro, kicker, sections, title, updated }: LegalPageProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = BrandThemes[colorScheme];
  const actionTextColor = colorScheme === 'dark' ? BrandThemes.dark.background : '#FFFFFF';

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.content}>
      <ThemedView
        style={[
          styles.hero,
          {
            backgroundColor: palette.surface,
            borderColor: palette.borderStrong,
            shadowColor: palette.cardShadow,
          },
        ]}>
        <View style={[styles.iconWrap, { backgroundColor: palette.primarySoft }]}>
          <IconSymbol name="shield.fill" color={palette.primary} size={22} />
        </View>
        <ThemedText type="defaultSemiBold" style={[styles.kicker, { color: palette.primary }]}>
          {kicker}
        </ThemedText>
        <ThemedText type="title">{title}</ThemedText>
        <ThemedText style={[styles.updated, { color: palette.muted }]}>{updated}</ThemedText>
        <ThemedText style={[styles.intro, { color: palette.muted }]}>{intro}</ThemedText>
      </ThemedView>

      {sections.map((section) => (
        <ThemedView
          key={section.title}
          style={[
            styles.section,
            {
              backgroundColor: palette.surface,
              borderColor: palette.border,
            },
          ]}>
          <ThemedText type="subtitle">{section.title}</ThemedText>
          {section.body.map((paragraph) => (
            <ThemedText key={paragraph} style={[styles.paragraph, { color: palette.muted }]}>
              {paragraph}
            </ThemedText>
          ))}
        </ThemedView>
      ))}

      {children}

      <Link href="/profile" asChild>
        <Pressable
          accessibilityRole="link"
          style={[styles.backLink, { backgroundColor: palette.primary }]}>
          <ThemedText style={[styles.backLinkText, { color: actionTextColor }]}>
            {backLabel}
          </ThemedText>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    gap: BrandSpacing.lg,
    maxWidth: 760,
    padding: BrandSpacing.xl,
    paddingBottom: 36,
    width: '100%',
  },
  hero: {
    ...BrandShadows.lifted,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.sm,
    padding: BrandSpacing.xl,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: BrandColors.primarySoft,
    borderRadius: BrandRadii.pill,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  kicker: {
    color: BrandColors.primary,
    textTransform: 'uppercase',
  },
  updated: {
    color: BrandColors.muted,
    fontSize: 14,
  },
  intro: {
    color: BrandColors.muted,
  },
  section: {
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.sm,
    padding: BrandSpacing.lg,
  },
  paragraph: {
    color: BrandColors.muted,
  },
  backLink: {
    alignItems: 'center',
    backgroundColor: BrandColors.primary,
    borderRadius: BrandRadii.control,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  backLinkText: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
