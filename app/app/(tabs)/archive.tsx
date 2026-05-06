import { useFocusEffect } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BrandColors, BrandRadii, BrandShadows, BrandSpacing } from '@/constants/brand';
import { communityRulesCopy } from '@/constants/community-rules';
import { FontFamilies } from '@/constants/typography';
import { useAuth } from '@/contexts/auth-context';
import { useSettings } from '@/contexts/settings-context';
import { localizeMaskPath } from '@/data/mask-paths';
import { getMaskPathById } from '@/data/question-paths';
import {
  type DailyEntry,
  formatRemainingTime,
  loadDailyEntries,
  mergeDailyEntries,
  replaceDailyEntries,
  saveDailyEntry,
} from '@/lib/daily-ritual';
import {
  loadRemoteDailyEntries,
  loadSharedAnswersForEntry,
  reportSharedAnswer,
  saveRemoteDailyEntry,
  type SharedAnswer,
} from '@/lib/remote-ritual';

function formatDate(dateKey: string) {
  const [year, month, day] = dateKey.split('-');

  return `${day}/${month}/${year}`;
}

function getUnlockedCount(entries: DailyEntry[], now: number) {
  return entries.filter((entry) => now >= entry.reflectionReadyAt).length;
}

function getDominantMaskPath(entries: DailyEntry[]) {
  const pathCounts = entries.reduce<Record<string, number>>((counts, entry) => {
    counts[entry.pathId] = (counts[entry.pathId] ?? 0) + 1;

    return counts;
  }, {});

  const dominantPath = Object.entries(pathCounts).sort(
    (first, second) => second[1] - first[1]
  )[0];

  if (!dominantPath) {
    return null;
  }

  const [pathId, count] = dominantPath;

  return {
    count,
    path: getMaskPathById(pathId as DailyEntry['pathId']),
  };
}

function getNextLockedEntry(entries: DailyEntry[], now: number) {
  return (
    entries
      .filter((entry) => now < entry.reflectionReadyAt)
      .sort((first, second) => first.reflectionReadyAt - second.reflectionReadyAt)[0] ?? null
  );
}

function SharedAnswersPanel({ entry }: { entry: DailyEntry }) {
  const { copy, language } = useSettings();
  const communityRules = communityRulesCopy[language];
  const {
    isFirebaseConfigured,
    isAppleAuthAvailable,
    isGoogleAuthConfigured,
    isSigningIn,
    signInWithApple,
    signInWithGoogle,
    user,
  } = useAuth();
  const [answers, setAnswers] = useState<SharedAnswer[]>([]);
  const [acceptedCommunityRules, setAcceptedCommunityRules] = useState(false);
  const [isShared, setIsShared] = useState(entry.shareWithCommunity);
  const [isLoading, setIsLoading] = useState(false);
  const [reportedAnswerIds, setReportedAnswerIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsShared(entry.shareWithCommunity);
    setAcceptedCommunityRules(false);
  }, [entry.id, entry.shareWithCommunity]);

  useEffect(() => {
    let isActive = true;

    async function loadAnswers() {
      if (!user || !isFirebaseConfigured || !isShared) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const sharedAnswers = await loadSharedAnswersForEntry(user.uid, entry);

        if (isActive) {
          setAnswers(sharedAnswers);
        }
      } catch {
        if (isActive) {
          setError(copy.shared.loadAnswersError);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadAnswers();

    return () => {
      isActive = false;
    };
  }, [copy.shared.loadAnswersError, entry, isFirebaseConfigured, isShared, user]);

  const shareEntry = async () => {
    if (!user || !isFirebaseConfigured) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const nextEntry = {
      ...entry,
      shareWithCommunity: true,
    };

    try {
      await saveDailyEntry(nextEntry);
      await saveRemoteDailyEntry(user, nextEntry);
      setIsShared(true);
      setStatusMessage(copy.shared.openStatus);
    } catch {
      setError(copy.shared.openError);
    } finally {
      setIsLoading(false);
    }
  };

  const makeEntryPrivate = async () => {
    if (!user || !isFirebaseConfigured) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setStatusMessage(null);

    const nextEntry = {
      ...entry,
      shareWithCommunity: false,
    };

    try {
      await saveDailyEntry(nextEntry);
      await saveRemoteDailyEntry(user, nextEntry);
      setAnswers([]);
      setIsShared(false);
      setStatusMessage(copy.shared.privateStatus);
    } catch {
      setError(copy.shared.privateError);
    } finally {
      setIsLoading(false);
    }
  };

  const reportAnswer = async (answer: SharedAnswer) => {
    if (!user) {
      return;
    }

    setReportedAnswerIds((currentIds) => [...currentIds, answer.id]);
    setAnswers((currentAnswers) =>
      currentAnswers.filter((currentAnswer) => currentAnswer.id !== answer.id)
    );

    try {
      await reportSharedAnswer(user, answer);
    } catch {
      setError(copy.shared.reportError);
    }
  };

  const toggleCommunityRulesAcceptance = () => {
    setAcceptedCommunityRules((currentValue) => !currentValue);
  };

  if (!isFirebaseConfigured) {
    return (
      <ThemedView style={styles.sharedPanel}>
        <View style={styles.sharedPanelTitle}>
          <IconSymbol name="person.2.fill" color={BrandColors.primary} size={18} />
          <ThemedText type="defaultSemiBold">{copy.shared.title}</ThemedText>
        </View>
        <ThemedText style={styles.answerPreview}>
          {copy.shared.firebaseMissing}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!user) {
    return (
      <ThemedView style={styles.sharedPanel}>
        <View style={styles.sharedPanelTitle}>
          <IconSymbol name="person.2.fill" color={BrandColors.primary} size={18} />
          <ThemedText type="defaultSemiBold">{copy.shared.title}</ThemedText>
        </View>
        <ThemedText style={styles.answerPreview}>
          {copy.shared.googlePrompt}
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          disabled={!isGoogleAuthConfigured || isSigningIn}
          onPress={signInWithGoogle}
          style={[
            styles.sharedButton,
            !isGoogleAuthConfigured || isSigningIn ? styles.sharedButtonDisabled : undefined,
          ]}>
          <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.sharedButtonText}>
            {isSigningIn ? copy.profile.loginOpening : copy.profile.login}
          </ThemedText>
          <IconSymbol name="arrow.right.circle.fill" color="#FFFFFF" size={17} />
        </Pressable>
        {isAppleAuthAvailable ? (
          <AppleAuthentication.AppleAuthenticationButton
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            cornerRadius={BrandRadii.control}
            onPress={() => {
              if (!isSigningIn) {
                void signInWithApple();
              }
            }}
            style={styles.appleSharedButton}
          />
        ) : null}
      </ThemedView>
    );
  }

  if (!isShared) {
    return (
      <ThemedView style={styles.sharedPanel}>
        <View style={styles.sharedPanelTitle}>
          <IconSymbol name="person.2.fill" color={BrandColors.primary} size={18} />
          <ThemedText type="defaultSemiBold">{copy.shared.title}</ThemedText>
        </View>
        <ThemedText style={styles.answerPreview}>
          {copy.shared.privateText}
        </ThemedText>
        <View style={styles.rulesRow}>
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: acceptedCommunityRules }}
            onPress={toggleCommunityRulesAcceptance}
            style={[
              styles.rulesCheckbox,
              acceptedCommunityRules ? styles.rulesCheckboxChecked : undefined,
            ]}>
            {acceptedCommunityRules ? (
              <IconSymbol name="checkmark" color="#FFFFFF" size={14} />
            ) : null}
          </Pressable>
          <View style={styles.rulesCopy}>
            <Pressable onPress={toggleCommunityRulesAcceptance}>
              <ThemedText style={styles.rulesText}>
                {communityRules.acceptText}
              </ThemedText>
            </Pressable>
            <Link href="/terms" asChild>
              <Pressable accessibilityRole="link" style={styles.rulesLink}>
                <ThemedText type="defaultSemiBold" style={styles.rulesLinkText}>
                  {communityRules.linkText}
                </ThemedText>
              </Pressable>
            </Link>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={isLoading || !acceptedCommunityRules}
          onPress={shareEntry}
          style={[
            styles.sharedButton,
            isLoading || !acceptedCommunityRules ? styles.sharedButtonDisabled : undefined,
          ]}>
          <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.sharedButtonText}>
            {isLoading ? copy.shared.opening : copy.shared.openWithInitials}
          </ThemedText>
          <IconSymbol name="arrow.right.circle.fill" color="#FFFFFF" size={17} />
        </Pressable>
        {error ? <ThemedText style={styles.sharedWarning}>{error}</ThemedText> : null}
        {statusMessage ? <ThemedText style={styles.answerPreview}>{statusMessage}</ThemedText> : null}
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.sharedPanel}>
      <View style={styles.sharedPanelTitle}>
        <IconSymbol name="person.2.fill" color={BrandColors.primary} size={18} />
        <ThemedText type="defaultSemiBold">{copy.shared.title}</ThemedText>
      </View>
      <View style={styles.sharedControls}>
        <Pressable
          accessibilityRole="button"
          disabled={isLoading}
          onPress={makeEntryPrivate}
          style={styles.privateButton}>
          <IconSymbol name="shield.fill" color={BrandColors.primary} size={15} />
          <ThemedText type="defaultSemiBold" style={styles.privateButtonText}>
            {copy.shared.makePrivate}
          </ThemedText>
        </Pressable>
      </View>

      {isLoading ? <ThemedText style={styles.answerPreview}>{copy.shared.loadingAnswers}</ThemedText> : null}
      {error ? <ThemedText style={styles.sharedWarning}>{error}</ThemedText> : null}
      {statusMessage ? <ThemedText style={styles.answerPreview}>{statusMessage}</ThemedText> : null}

      {!isLoading && !error && answers.length === 0 ? (
        <ThemedText style={styles.answerPreview}>
          {copy.shared.noAnswers}
        </ThemedText>
      ) : null}

      {answers.map((answer) => (
        <View key={answer.id} style={styles.sharedAnswer}>
          <View style={styles.sharedInitials}>
            <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.sharedInitialsText}>
              {answer.initials}
            </ThemedText>
          </View>
          <View style={styles.sharedAnswerBody}>
            <ThemedText style={styles.sharedAnswerText}>{answer.answer}</ThemedText>
            <Pressable
              accessibilityRole="button"
              disabled={reportedAnswerIds.includes(answer.id)}
              onPress={() => reportAnswer(answer)}
              style={styles.reportButton}>
              <ThemedText type="defaultSemiBold" style={styles.reportButtonText}>
                {copy.shared.report}
              </ThemedText>
            </Pressable>
          </View>
        </View>
      ))}
    </ThemedView>
  );
}

export default function ArchiveScreen() {
  const { isFirebaseConfigured, user } = useAuth();
  const { copy, language } = useSettings();
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadArchive() {
        let savedEntries = await loadDailyEntries();

        if (user && isFirebaseConfigured) {
          try {
            const remoteEntries = await loadRemoteDailyEntries(user.uid);
            savedEntries = mergeDailyEntries(remoteEntries, savedEntries);
            await replaceDailyEntries(savedEntries);
            await Promise.all(savedEntries.map((entry) => saveRemoteDailyEntry(user, entry)));
          } catch {
            // L'archivio locale resta disponibile anche se la rete non risponde.
          }
        }

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
    }, [isFirebaseConfigured, user])
  );

  const unlockedCount = getUnlockedCount(entries, now);
  const lockedCount = Math.max(entries.length - unlockedCount, 0);
  const dominantPath = getDominantMaskPath(entries);
  const nextLockedEntry = getNextLockedEntry(entries, now);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#173B33', dark: '#0D1E1A' }}
      headerImage={
        <View style={styles.headerContent}>
          <View style={styles.headerLogoFrame}>
            <Image
              resizeMode="contain"
              source={require('@/assets/images/via-la-maschera-logo-header-light.png')}
              style={styles.headerLogo}
            />
          </View>
          <Text style={styles.kicker}>
            {copy.archive.headerKicker}
          </Text>
          <Text style={styles.headerTitle}>
            {copy.archive.headerTitle}
          </Text>
          <Text style={styles.headerText}>
            {copy.archive.headerText}
          </Text>
        </View>
      }>
      <ThemedView style={styles.statsPanel}>
        <View style={styles.statItem}>
          <IconSymbol name="sparkles" color={BrandColors.primary} size={18} />
          <ThemedText type="title" style={styles.statNumber}>
            {entries.length}
          </ThemedText>
          <ThemedText>{copy.archive.statsAnswers}</ThemedText>
        </View>
        <View style={styles.statItem}>
          <IconSymbol name="eye.fill" color={BrandColors.teal} size={18} />
          <ThemedText type="title" style={styles.statNumber}>
            {unlockedCount}
          </ThemedText>
          <ThemedText>{copy.archive.statsOpen}</ThemedText>
        </View>
        <View style={styles.statItem}>
          <IconSymbol name="lock.fill" color={BrandColors.warm} size={18} />
          <ThemedText type="title" style={styles.statNumber}>
            {lockedCount}
          </ThemedText>
          <ThemedText>{copy.archive.statsWaiting}</ThemedText>
        </View>
      </ThemedView>

      {!isLoading && entries.length > 0 ? (
        <ThemedView style={styles.mapPanel}>
          <View style={styles.mapHeader}>
            <View style={styles.mapTitleRow}>
              <IconSymbol name="checkmark.seal.fill" color={BrandColors.primary} size={19} />
              <ThemedText type="subtitle">{copy.archive.mapTitle}</ThemedText>
            </View>
            <ThemedText style={styles.mapBadge}>
              {copy.archive.mapBadge(entries.length)}
            </ThemedText>
          </View>

          {dominantPath ? (
            <View style={styles.mapItem}>
              <ThemedText style={styles.mapLabel}>{copy.archive.mapDominant}</ThemedText>
              <View style={styles.pathRow}>
                <View style={[styles.pathMark, { backgroundColor: dominantPath.path.accent }]} />
                <ThemedText
                  type="defaultSemiBold"
                  style={[styles.pathTitle, { color: dominantPath.path.accent }]}>
                  {localizeMaskPath(dominantPath.path, language).title}
                </ThemedText>
              </View>
              <ThemedText style={styles.mapText}>
                {dominantPath.count === 1
                  ? copy.archive.mapDominantOnce
                  : copy.archive.mapDominantMany(dominantPath.count)}
              </ThemedText>
            </View>
          ) : null}

          <View style={styles.mapDivider} />

          <View style={styles.mapItem}>
            <ThemedText style={styles.mapLabel}>{copy.archive.mapNext}</ThemedText>
            {nextLockedEntry ? (
              <ThemedText style={styles.mapText}>
                {copy.archive.nextMirrorIn(formatRemainingTime(nextLockedEntry.reflectionReadyAt - now))}
              </ThemedText>
            ) : (
              <ThemedText style={styles.mapText}>
                {copy.archive.nextMirrorEmpty}
              </ThemedText>
            )}
          </View>
        </ThemedView>
      ) : null}

      {isLoading ? (
        <ThemedView style={styles.notePanel}>
          <ThemedText>{copy.archive.loading}</ThemedText>
        </ThemedView>
      ) : null}

      {!isLoading && entries.length === 0 ? (
        <ThemedView style={styles.emptyPanel}>
          <ThemedText type="subtitle">{copy.archive.emptyTitle}</ThemedText>
          <ThemedText>
            {copy.archive.emptyBody}
          </ThemedText>
        </ThemedView>
      ) : null}

      {entries.map((entry) => {
        const isReflectionReady = now >= entry.reflectionReadyAt;
        const maskPath = localizeMaskPath(getMaskPathById(entry.pathId), language);

        return (
          <ThemedView key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <ThemedText type="defaultSemiBold">{formatDate(entry.dateKey)}</ThemedText>
              <ThemedText style={isReflectionReady ? styles.openBadge : styles.lockedBadge}>
                {isReflectionReady ? copy.archive.opened : copy.archive.sealed}
              </ThemedText>
            </View>

            <View style={styles.pathRow}>
              <View style={[styles.pathMark, { backgroundColor: maskPath.accent }]} />
              <ThemedText
                type="defaultSemiBold"
                style={[styles.pathTitle, { color: maskPath.accent }]}>
                {maskPath.title}
              </ThemedText>
            </View>

            <ThemedText type="subtitle">{entry.question}</ThemedText>
            <ThemedText style={styles.answerPreview}>{entry.answer}</ThemedText>

            {isReflectionReady ? (
              <ThemedView style={styles.reflectionPanel}>
                <ThemedText type="defaultSemiBold">{copy.archive.reflection}</ThemedText>
                <ThemedText>{entry.reflection}</ThemedText>
              </ThemedView>
            ) : (
              <ThemedView style={styles.lockedPanel}>
                <ThemedText>
                  {copy.archive.reflectionOpensIn(formatRemainingTime(entry.reflectionReadyAt - now))}
                </ThemedText>
              </ThemedView>
            )}

            <SharedAnswersPanel entry={entry} />
          </ThemedView>
        );
      })}
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
  statsPanel: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: BrandSpacing.sm,
    padding: BrandSpacing.lg,
  },
  statItem: {
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    flex: 1,
    gap: BrandSpacing.xs,
    padding: BrandSpacing.md,
  },
  statNumber: {
    color: BrandColors.primary,
  },
  mapPanel: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.lg,
    padding: BrandSpacing.lg,
  },
  mapHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.md,
    justifyContent: 'space-between',
  },
  mapTitleRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: BrandSpacing.sm,
  },
  mapBadge: {
    backgroundColor: BrandColors.tealSoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.teal,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  mapItem: {
    gap: 8,
  },
  mapLabel: {
    color: BrandColors.muted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  mapText: {
    color: BrandColors.muted,
  },
  mapDivider: {
    backgroundColor: BrandColors.border,
    height: 1,
  },
  notePanel: {
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    padding: 16,
  },
  emptyPanel: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  entryCard: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.md,
    padding: BrandSpacing.lg,
  },
  entryHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  openBadge: {
    backgroundColor: BrandColors.tealSoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.teal,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lockedBadge: {
    backgroundColor: BrandColors.warmSoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.warm,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  answerPreview: {
    color: BrandColors.muted,
  },
  pathRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.md,
  },
  pathMark: {
    borderRadius: BrandRadii.pill,
    height: 10,
    width: 36,
  },
  pathTitle: {
    flex: 1,
  },
  reflectionPanel: {
    backgroundColor: BrandColors.tealSoft,
    borderColor: '#BFE6D4',
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: 8,
    padding: 12,
  },
  lockedPanel: {
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    padding: 12,
  },
  sharedPanel: {
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.sm,
    padding: BrandSpacing.md,
  },
  sharedPanelTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.sm,
  },
  sharedButton: {
    alignItems: 'center',
    backgroundColor: BrandColors.primary,
    borderRadius: BrandRadii.control,
    flexDirection: 'row',
    gap: BrandSpacing.sm,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 14,
  },
  sharedButtonDisabled: {
    backgroundColor: '#A997B9',
  },
  sharedButtonText: {
    fontWeight: '700',
  },
  appleSharedButton: {
    height: 46,
    width: '100%',
  },
  rulesRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: BrandSpacing.sm,
  },
  rulesCheckbox: {
    alignItems: 'center',
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.teal,
    borderRadius: 6,
    borderWidth: 1,
    height: 24,
    justifyContent: 'center',
    marginTop: 2,
    width: 24,
  },
  rulesCheckboxChecked: {
    backgroundColor: BrandColors.teal,
  },
  rulesCopy: {
    flex: 1,
    gap: 4,
  },
  rulesText: {
    color: BrandColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  rulesLink: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
  },
  rulesLinkText: {
    color: BrandColors.primary,
    fontSize: 14,
  },
  sharedControls: {
    alignItems: 'flex-start',
  },
  privateButton: {
    alignItems: 'center',
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.control,
    borderWidth: 1,
    flexDirection: 'row',
    gap: BrandSpacing.xs,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  privateButtonText: {
    color: BrandColors.primary,
    fontSize: 13,
  },
  sharedWarning: {
    color: BrandColors.rose,
  },
  sharedAnswer: {
    alignItems: 'flex-start',
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: BrandSpacing.md,
    padding: BrandSpacing.md,
  },
  sharedInitials: {
    alignItems: 'center',
    backgroundColor: BrandColors.primary,
    borderRadius: BrandRadii.pill,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  sharedInitialsText: {
    fontWeight: '700',
  },
  sharedAnswerText: {
    flex: 1,
  },
  sharedAnswerBody: {
    flex: 1,
    gap: 6,
  },
  reportButton: {
    alignSelf: 'flex-start',
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.control,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  reportButtonText: {
    color: BrandColors.muted,
    fontSize: 12,
  },
});
