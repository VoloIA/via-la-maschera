import { useEffect, useMemo, useState } from 'react';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

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
  createDailyEntry,
  formatRemainingTime,
  getDateKey,
  getEntryForDate,
  getMaskPathForDate,
  getQuestionForDate,
  loadDailyEntries,
  mergeDailyEntries,
  replaceDailyEntries,
  saveDailyEntry,
} from '@/lib/daily-ritual';
import { loadRemoteDailyEntries, saveRemoteDailyEntry } from '@/lib/remote-ritual';

function getUnlockedCount(entries: DailyEntry[], now: number) {
  return entries.filter((savedEntry) => now >= savedEntry.reflectionReadyAt).length;
}

function getLatestEntry(entries: DailyEntry[]) {
  return [...entries].sort((first, second) => second.createdAt - first.createdAt)[0] ?? null;
}

export default function HomeScreen() {
  const { isAuthReady, isFirebaseConfigured, user } = useAuth();
  const { copy, language } = useSettings();
  const communityRules = communityRulesCopy[language];
  const todayKey = getDateKey();
  const question = useMemo(() => getQuestionForDate(todayKey, language), [language, todayKey]);
  const maskPath = useMemo(
    () => localizeMaskPath(getMaskPathForDate(todayKey), language),
    [language, todayKey]
  );
  const [answer, setAnswer] = useState('');
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [isLoadingEntry, setIsLoadingEntry] = useState(true);
  const [now, setNow] = useState(Date.now());
  const [acceptedCommunityRules, setAcceptedCommunityRules] = useState(false);
  const [shareWithCommunity, setShareWithCommunity] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadEntry() {
      let savedEntries = await loadDailyEntries();

      if (user && isFirebaseConfigured) {
        try {
          const remoteEntries = await loadRemoteDailyEntries(user.uid);
          savedEntries = mergeDailyEntries(remoteEntries, savedEntries);
          await replaceDailyEntries(savedEntries);
          await Promise.all(savedEntries.map((savedEntry) => saveRemoteDailyEntry(user, savedEntry)));
          setSyncMessage(copy.home.remoteConnected);
        } catch {
          setSyncMessage(copy.home.remoteLoadError);
        }
      }

      if (!isMounted) {
        return;
      }

      const todayEntry = getEntryForDate(savedEntries, todayKey);
      setEntries(savedEntries);

      if (todayEntry) {
        setEntry(todayEntry);
        setAnswer(todayEntry.answer);
        setShareWithCommunity(todayEntry.shareWithCommunity);
      }

      setIsLoadingEntry(false);
    }

    loadEntry();

    return () => {
      isMounted = false;
    };
  }, [copy.home.remoteConnected, copy.home.remoteLoadError, isAuthReady, isFirebaseConfigured, todayKey, user]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!user || !isFirebaseConfigured) {
      setAcceptedCommunityRules(false);
      setShareWithCommunity(false);
    }
  }, [isFirebaseConfigured, user]);

  const toggleCommunityRulesAcceptance = () => {
    setAcceptedCommunityRules((currentValue) => {
      const nextValue = !currentValue;

      if (!nextValue) {
        setShareWithCommunity(false);
      }

      return nextValue;
    });
  };

  const isAnswerReady = answer.trim().length >= 8;
  const isReflectionReady = entry ? now >= entry.reflectionReadyAt : false;
  const remainingTime = entry ? formatRemainingTime(entry.reflectionReadyAt - now) : null;
  const unlockedCount = getUnlockedCount(entries, now);
  const latestEntry = getLatestEntry(entries);
  const latestMaskPath = latestEntry
    ? localizeMaskPath(getMaskPathById(latestEntry.pathId), language)
    : null;

  const saveAnswer = async () => {
    if (!isAnswerReady) {
      return;
    }

    const nextEntry = createDailyEntry(
      answer,
      question,
      todayKey,
      Boolean(user && isFirebaseConfigured && shareWithCommunity),
      language
    );

    setEntry(nextEntry);
    const nextEntries = await saveDailyEntry(nextEntry);
    setEntries(nextEntries);

    if (user && isFirebaseConfigured) {
      try {
        await saveRemoteDailyEntry(user, nextEntry);
        setSyncMessage(
          nextEntry.shareWithCommunity
            ? copy.home.savedShared
            : copy.home.savedPrivate
        );
      } catch {
        setSyncMessage(copy.home.remoteSaveError);
      }
    } else {
      setSyncMessage(copy.home.savedLocal);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: BrandColors.primaryDark, dark: '#160D22' }}
      headerImage={
        <View style={styles.headerContent}>
          <View style={styles.headerLogoFrame}>
            <Image
              resizeMode="contain"
              source={require('@/assets/images/via-la-maschera-logo-header-light.png')}
              style={styles.headerLogo}
            />
          </View>
          <Text style={styles.kicker}>{copy.home.headerKicker}</Text>
          <Text style={styles.headerTitle}>
            {copy.home.promise}
          </Text>
          <Text style={styles.headerText}>
            {copy.home.headerText}
          </Text>
          <View style={styles.headerSignals}>
            <Text style={styles.headerPill}>
              {copy.home.signalOne}
            </Text>
            <Text style={styles.headerPill}>
              {copy.home.signalTime}
            </Text>
          </View>
        </View>
      }>
      <ThemedView style={styles.ritualCard}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleGroup}>
            <ThemedText type="defaultSemiBold" style={styles.eyebrow}>
              {copy.home.cardKicker}
            </ThemedText>
            <ThemedText style={styles.cardHint}>
              {copy.common.mask} {maskPath.title}
            </ThemedText>
          </View>
          <ThemedText style={styles.badge}>{entry ? copy.home.sealed : copy.home.open}</ThemedText>
        </View>

        <View style={styles.pathStrip}>
          <View style={[styles.pathMark, { backgroundColor: maskPath.accent }]} />
          <ThemedText type="defaultSemiBold" style={[styles.pathSignal, { color: maskPath.accent }]}>
            {maskPath.signal}
          </ThemedText>
        </View>

        <ThemedText type="title" style={styles.question}>
          {question}
        </ThemedText>

        <ThemedText style={styles.smallText}>
          {isLoadingEntry
            ? copy.home.loading
            : copy.home.shortHint}
        </ThemedText>

        <TextInput
          editable={!entry}
          multiline
          onChangeText={setAnswer}
          placeholder={copy.home.answerPlaceholder}
          placeholderTextColor="#8E8198"
          style={[styles.input, entry ? styles.inputLocked : undefined]}
          textAlignVertical="top"
          value={answer}
        />

        {!entry ? (
          <ThemedView style={styles.sharePanel}>
            <View style={styles.shareHeader}>
              <View style={styles.shareIcon}>
                <IconSymbol name="shield.fill" color={BrandColors.teal} size={20} />
              </View>
              <View style={styles.shareCopy}>
                <ThemedText type="defaultSemiBold">{copy.home.shareTitle}</ThemedText>
                <ThemedText style={styles.smallText}>
                  {copy.home.shareText}
                </ThemedText>
              </View>
              <Switch
                disabled={!user || !isFirebaseConfigured || !acceptedCommunityRules}
                onValueChange={(nextValue) => setShareWithCommunity(nextValue && acceptedCommunityRules)}
                thumbColor={shareWithCommunity ? BrandColors.primary : '#F4EFF8'}
                trackColor={{ false: '#D9C6E8', true: BrandColors.primarySoft }}
                value={shareWithCommunity}
              />
            </View>
            {user && isFirebaseConfigured ? (
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
            ) : null}
            {!user || !isFirebaseConfigured ? (
              <ThemedText style={styles.smallText}>
                {copy.home.shareGoogle}
              </ThemedText>
            ) : null}
          </ThemedView>
        ) : null}

        {!entry ? (
          <Pressable
            accessibilityRole="button"
            disabled={!isAnswerReady || isLoadingEntry}
            onPress={saveAnswer}
            style={[
              styles.primaryButton,
              !isAnswerReady || isLoadingEntry ? styles.primaryButtonDisabled : undefined,
            ]}>
            <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.primaryButtonText}>
              {copy.home.save}
            </ThemedText>
            <IconSymbol name="arrow.right.circle.fill" color="#FFFFFF" size={18} />
          </Pressable>
        ) : (
          <ThemedView style={styles.lockedPanel}>
            <View style={styles.lockedTitleRow}>
              <IconSymbol name="lock.fill" color={BrandColors.primary} size={18} />
              <ThemedText type="defaultSemiBold">{copy.home.sealedTitle}</ThemedText>
            </View>
            <ThemedText>
              {copy.home.reflectionWaiting(remainingTime)}
            </ThemedText>
          </ThemedView>
        )}

        {syncMessage ? <ThemedText style={styles.smallText}>{syncMessage}</ThemedText> : null}
      </ThemedView>

      {!isLoadingEntry && entries.length > 0 ? (
        <ThemedView style={styles.memoryPanel}>
          <View style={styles.memoryHeader}>
            <ThemedText type="subtitle">{copy.home.memoryTitle}</ThemedText>
            <ThemedText style={styles.memoryBadge}>{copy.home.memoryBadge}</ThemedText>
          </View>

          <View style={styles.memoryStats}>
            <View style={styles.memoryStat}>
              <ThemedText type="title" style={styles.memoryNumber}>
                {entries.length}
              </ThemedText>
              <ThemedText style={styles.memoryLabel}>{copy.home.traces}</ThemedText>
            </View>
            <View style={styles.memoryStat}>
              <ThemedText type="title" style={styles.memoryNumber}>
                {unlockedCount}
              </ThemedText>
              <ThemedText style={styles.memoryLabel}>{copy.home.mirrors}</ThemedText>
            </View>
          </View>

          {latestEntry && latestMaskPath ? (
            <View style={styles.latestMask}>
              <ThemedText style={styles.memoryLabel}>{copy.home.memoryLatest}</ThemedText>
              <View style={styles.pathStrip}>
                <View style={[styles.pathMark, { backgroundColor: latestMaskPath.accent }]} />
                <ThemedText
                  type="defaultSemiBold"
                  style={[styles.pathSignal, { color: latestMaskPath.accent }]}>
                  {latestMaskPath.title}
                </ThemedText>
              </View>
              <ThemedText style={styles.smallText}>
                {copy.home.memoryReturn}
              </ThemedText>
            </View>
          ) : null}
        </ThemedView>
      ) : null}

      {entry && isReflectionReady ? (
        <ThemedView style={styles.reflectionCard}>
          <ThemedText type="subtitle">{copy.home.yesterdayMirror}</ThemedText>
          <ThemedText>{entry.reflection}</ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">{copy.home.ritualTitle}</ThemedText>
          <View style={styles.stepGrid}>
            <View style={styles.stepRow}>
              <View style={styles.stepIcon}>
                <IconSymbol name="sparkles" color={BrandColors.primary} size={18} />
              </View>
              <ThemedText style={styles.stepText}>{copy.home.ritualStep1}</ThemedText>
            </View>
            <View style={styles.stepRow}>
              <View style={styles.stepIcon}>
                <IconSymbol name="clock.fill" color={BrandColors.warm} size={18} />
              </View>
              <ThemedText style={styles.stepText}>{copy.home.ritualStep2}</ThemedText>
            </View>
            <View style={styles.stepRow}>
              <View style={styles.stepIcon}>
                <IconSymbol name="eye.fill" color={BrandColors.teal} size={18} />
              </View>
              <ThemedText style={styles.stepText}>{copy.home.ritualStep3}</ThemedText>
            </View>
          </View>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    alignSelf: 'center',
    flex: 1,
    maxWidth: 560,
    paddingHorizontal: 24,
    paddingTop: 34,
    width: '100%',
  },
  headerLogoFrame: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderColor: 'rgba(255, 255, 255, 0.24)',
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    height: 68,
    justifyContent: 'center',
    marginBottom: 14,
    width: 68,
  },
  headerLogo: {
    height: 54,
    width: 54,
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
    marginBottom: 10,
  },
  headerText: {
    color: '#E8D8F6',
    fontFamily: FontFamilies.regular,
    fontSize: 17,
    lineHeight: 25,
  },
  headerSignals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: BrandSpacing.sm,
    marginTop: 16,
  },
  headerPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderColor: 'rgba(255, 255, 255, 0.26)',
    borderRadius: BrandRadii.pill,
    borderWidth: 1,
    color: '#FFFFFF',
    fontFamily: FontFamilies.semibold,
    fontSize: 13,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  ritualCard: {
    ...BrandShadows.lifted,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.lg,
    padding: BrandSpacing.xl,
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: BrandSpacing.md,
    justifyContent: 'space-between',
  },
  cardTitleGroup: {
    flex: 1,
    gap: 2,
  },
  eyebrow: {
    color: BrandColors.violet,
    textTransform: 'uppercase',
  },
  cardHint: {
    color: BrandColors.muted,
    fontSize: 14,
  },
  badge: {
    backgroundColor: BrandColors.primarySoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.primary,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  question: {
    color: BrandColors.ink,
    lineHeight: 39,
  },
  pathStrip: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.md,
  },
  pathMark: {
    borderRadius: BrandRadii.pill,
    height: 12,
    width: 40,
  },
  pathSignal: {
    flex: 1,
  },
  smallText: {
    color: BrandColors.muted,
  },
  input: {
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.control,
    borderWidth: 1,
    color: BrandColors.ink,
    fontFamily: FontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 150,
    padding: 14,
  },
  inputLocked: {
    backgroundColor: BrandColors.primarySoft,
  },
  sharePanel: {
    backgroundColor: BrandColors.tealSoft,
    borderColor: '#B7E3D4',
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.sm,
    padding: BrandSpacing.md,
  },
  shareHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: BrandSpacing.md,
  },
  shareIcon: {
    alignItems: 'center',
    backgroundColor: BrandColors.surface,
    borderRadius: BrandRadii.pill,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  shareCopy: {
    flex: 1,
    gap: 4,
  },
  rulesRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: BrandSpacing.sm,
    paddingLeft: 2,
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
  primaryButton: {
    alignItems: 'center',
    backgroundColor: BrandColors.primary,
    borderRadius: BrandRadii.control,
    flexDirection: 'row',
    gap: BrandSpacing.sm,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 16,
  },
  primaryButtonDisabled: {
    backgroundColor: '#A997B9',
  },
  primaryButtonText: {
    fontWeight: '700',
  },
  lockedPanel: {
    backgroundColor: BrandColors.primarySoft,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.sm,
    padding: 14,
  },
  lockedTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.sm,
  },
  memoryPanel: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.lg,
    padding: 16,
  },
  memoryHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  memoryBadge: {
    backgroundColor: BrandColors.tealSoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.teal,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  memoryStats: {
    flexDirection: 'row',
    gap: BrandSpacing.md,
  },
  memoryStat: {
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    flex: 1,
    gap: 2,
    padding: 12,
  },
  memoryNumber: {
    color: BrandColors.primary,
  },
  memoryLabel: {
    color: BrandColors.muted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  latestMask: {
    gap: 8,
  },
  reflectionCard: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.teal,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: 12,
    padding: 18,
  },
  section: {
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.md,
    padding: BrandSpacing.lg,
  },
  stepGrid: {
    gap: BrandSpacing.sm,
  },
  stepRow: {
    alignItems: 'center',
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: BrandSpacing.md,
    padding: BrandSpacing.md,
  },
  stepIcon: {
    alignItems: 'center',
    backgroundColor: BrandColors.surface,
    borderRadius: BrandRadii.pill,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  stepText: {
    flex: 1,
  },
});
