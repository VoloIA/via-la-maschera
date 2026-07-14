import { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BrandColors, BrandRadii, BrandShadows, BrandSpacing } from '@/constants/brand';
import type { AppLanguageCode } from '@/constants/localization';
import { FontFamilies } from '@/constants/typography';
import { useSettings } from '@/contexts/settings-context';
import { localizeMaskPath, maskPaths, type MaskPathId } from '@/data/mask-paths';
import { getMaskQuestionsForLanguage } from '@/data/mask-questions';
import { questionPathIds } from '@/data/question-paths';

const firstOpenPath = maskPaths.find((path) => !path.locked) ?? maskPaths[0];

function getQuestionCount(pathId: MaskPathId) {
  return questionPathIds.filter((questionPathId) => questionPathId === pathId).length;
}

function getQuestionsForPath(pathId: MaskPathId, language: AppLanguageCode) {
  return getMaskQuestionsForLanguage(language).filter((_, index) => questionPathIds[index] === pathId);
}

export default function PathsScreen() {
  const { copy, language } = useSettings();
  const [selectedPathId, setSelectedPathId] = useState<MaskPathId>(firstOpenPath.id);
  const localizedPaths = useMemo(
    () => maskPaths.map((path) => localizeMaskPath(path, language)),
    [language]
  );
  const selectedPath = useMemo(
    () => localizedPaths.find((path) => path.id === selectedPathId) ?? localizedPaths[0],
    [localizedPaths, selectedPathId]
  );
  const selectedQuestions = useMemo(
    () => getQuestionsForPath(selectedPath.id, language),
    [language, selectedPath.id]
  );
  const visibleQuestions = selectedQuestions.slice(0, 5);
  const hiddenQuestionCount = Math.max(selectedQuestions.length - visibleQuestions.length, 0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#263A4F', dark: '#111C25' }}
      headerImage={
        <View style={styles.headerContent}>
          <View style={styles.headerLogoFrame}>
            <Image
              resizeMode="contain"
              source={require('@/assets/images/via-la-maschera-logo-header-light.png')}
              style={styles.headerLogo}
            />
          </View>
          <Text style={styles.kicker}>{copy.paths.headerKicker}</Text>
          <Text style={styles.headerTitle}>{copy.paths.headerTitle}</Text>
          <Text style={styles.headerText}>{copy.paths.headerText}</Text>
        </View>
      }>
      <ThemedView style={styles.featuredPanel}>
        <View style={styles.featuredHeader}>
          <View style={styles.featuredIcon}>
            <IconSymbol name="sparkles" color={BrandColors.primary} size={20} />
          </View>
          <View style={styles.featuredCopy}>
            <ThemedText type="defaultSemiBold" style={styles.featuredLabel}>
              {copy.paths.featuredKicker}
            </ThemedText>
            <ThemedText type="subtitle">{copy.paths.featuredTitle}</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.pathDescription}>
          {copy.paths.featuredBody}
        </ThemedText>
        <View style={styles.featuredSignals}>
          <ThemedText style={styles.signalBadge}>{copy.home.ritualTitle}</ThemedText>
          <ThemedText style={styles.signalBadgeWarm}>{copy.archive.headerKicker}</ThemedText>
          <ThemedText style={styles.signalBadgeTeal}>{copy.archive.reflection}</ThemedText>
        </View>
      </ThemedView>

      <View style={styles.pathsGrid}>
        {localizedPaths.map((path) => {
          const isSelected = path.id === selectedPath.id;

          return (
            <Pressable
              accessibilityRole="button"
              key={path.id}
              onPress={() => setSelectedPathId(path.id)}
              style={({ pressed }) => (pressed ? styles.pathCardPressed : undefined)}>
              <ThemedView
                style={[
                  styles.pathCard,
                  isSelected ? [styles.selectedPathCard, { borderColor: path.accent }] : undefined,
                  path.locked ? styles.lockedCard : undefined,
                ]}>
                <View style={styles.pathHeader}>
                  <View style={[styles.pathMark, { backgroundColor: path.accent }]} />
                  <ThemedText style={path.locked ? styles.lockedBadge : styles.openBadge}>
                    {path.locked ? copy.paths.presto : copy.paths.openQuestions(getQuestionCount(path.id))}
                  </ThemedText>
                </View>

                <ThemedText type="subtitle">{path.title}</ThemedText>
                <ThemedText style={styles.pathDescription}>{path.description}</ThemedText>
                <ThemedText type="defaultSemiBold" style={[styles.pathSignal, { color: path.accent }]}>
                  {path.signal}
                </ThemedText>
                {isSelected ? (
                  <View style={styles.selectedSignal}>
                    <IconSymbol name="checkmark.seal.fill" color={path.accent} size={16} />
                    <ThemedText type="defaultSemiBold" style={[styles.selectedSignalText, { color: path.accent }]}>
                      {copy.paths.selected}
                    </ThemedText>
                  </View>
                ) : null}
              </ThemedView>
            </Pressable>
          );
        })}
      </View>

      <ThemedView style={[styles.questionsPanel, { borderColor: selectedPath.accent }]}>
        <View style={styles.selectedHeader}>
          <View style={[styles.pathMark, { backgroundColor: selectedPath.accent }]} />
          <ThemedText type="subtitle" style={[styles.selectedTitle, { color: selectedPath.accent }]}>
            {selectedPath.title}
          </ThemedText>
        </View>

        {selectedPath.locked ? (
          <View style={styles.lockedNotice}>
            <IconSymbol name="lock.fill" color={BrandColors.primary} size={20} />
            <ThemedText style={styles.questionText}>
              {copy.paths.locked}
            </ThemedText>
          </View>
        ) : (
          <>
            <ThemedText style={styles.pathDescription}>
              {copy.paths.questionIntro}
            </ThemedText>

            <View style={styles.questionList}>
              {visibleQuestions.map((question) => (
                <View key={question} style={styles.questionRow}>
                  <View style={[styles.questionDot, { backgroundColor: selectedPath.accent }]} />
                  <ThemedText style={styles.questionText}>{question}</ThemedText>
                </View>
              ))}
            </View>

            {hiddenQuestionCount > 0 ? (
              <ThemedText type="defaultSemiBold" style={[styles.moreQuestions, { color: selectedPath.accent }]}>
                {copy.paths.moreQuestions(hiddenQuestionCount)}
              </ThemedText>
            ) : null}
          </>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    alignSelf: 'center',
    flex: 1,
    maxWidth: 560,
    paddingHorizontal: 24,
    paddingTop: 40,
    width: '100%',
  },
  headerLogoFrame: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderColor: 'rgba(255, 255, 255, 0.24)',
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    marginBottom: 12,
    width: 64,
  },
  headerLogo: {
    height: 50,
    width: 50,
  },
  kicker: {
    color: '#F4E8FF',
    fontFamily: FontFamilies.semibold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontFamily: FontFamilies.bold,
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 12,
  },
  headerText: {
    color: '#E8D8F6',
    fontFamily: FontFamilies.regular,
    fontSize: 17,
    lineHeight: 25,
  },
  featuredPanel: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.md,
    padding: BrandSpacing.xl,
  },
  featuredHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.md,
  },
  featuredIcon: {
    alignItems: 'center',
    backgroundColor: BrandColors.primarySoft,
    borderRadius: BrandRadii.pill,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  featuredCopy: {
    flex: 1,
    gap: 2,
  },
  featuredLabel: {
    color: BrandColors.violet,
    textTransform: 'uppercase',
  },
  featuredSignals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: BrandSpacing.sm,
  },
  signalBadge: {
    backgroundColor: BrandColors.primarySoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.primary,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  signalBadgeWarm: {
    backgroundColor: BrandColors.warmSoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.warm,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  signalBadgeTeal: {
    backgroundColor: BrandColors.tealSoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.teal,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pathsGrid: {
    gap: BrandSpacing.md,
  },
  pathCardPressed: {
    opacity: 0.86,
  },
  pathCard: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.sm,
    padding: BrandSpacing.lg,
  },
  selectedPathCard: {
    backgroundColor: BrandColors.surfaceAlt,
    borderWidth: 2,
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
    borderRadius: BrandRadii.pill,
    height: 14,
    width: 44,
  },
  openBadge: {
    backgroundColor: BrandColors.primarySoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.primary,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lockedBadge: {
    backgroundColor: BrandColors.sageSoft,
    borderRadius: BrandRadii.pill,
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
  selectedSignal: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.xs,
    marginTop: 2,
  },
  selectedSignalText: {
    fontSize: 13,
  },
  questionsPanel: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.lg,
    padding: BrandSpacing.lg,
  },
  selectedHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.md,
  },
  selectedTitle: {
    flex: 1,
  },
  questionList: {
    gap: BrandSpacing.sm,
  },
  questionRow: {
    alignItems: 'flex-start',
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: BrandSpacing.md,
    padding: BrandSpacing.md,
  },
  questionDot: {
    borderRadius: 5,
    height: 10,
    marginTop: 7,
    width: 10,
  },
  questionText: {
    flex: 1,
  },
  lockedNotice: {
    alignItems: 'flex-start',
    backgroundColor: BrandColors.primarySoft,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: BrandSpacing.md,
    padding: BrandSpacing.md,
  },
  moreQuestions: {
    marginTop: 2,
  },
});
