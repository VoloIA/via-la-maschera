import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BrandColors, BrandRadii, BrandShadows, BrandSpacing } from '@/constants/brand';
import { communityRulesCopy } from '@/constants/community-rules';
import { legalCopy } from '@/constants/legal';
import { supportedLanguages } from '@/constants/localization';
import { FontFamilies } from '@/constants/typography';
import { useAuth } from '@/contexts/auth-context';
import { useSettings } from '@/contexts/settings-context';

function getUserInitials(displayName?: string | null, email?: string | null) {
  const source = displayName?.trim() || email?.split('@')[0] || 'Tu';
  const pieces = source
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);

  return pieces
    .slice(0, 2)
    .map((piece) => piece[0])
    .join('')
    .toLocaleUpperCase('it-IT');
}

export default function ProfileScreen() {
  const {
    authError,
    isFirebaseConfigured,
    isGoogleAuthConfigured,
    isSigningIn,
    signInWithGoogle,
    signOut,
    user,
  } = useAuth();
  const { copy, language, setLanguage, setThemeMode, themeMode } = useSettings();
  const legal = legalCopy[language];
  const communityRules = communityRulesCopy[language];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#251433', dark: '#150D1E' }}
      headerImage={
        <View style={styles.headerContent}>
          <View style={styles.headerLogoFrame}>
            <Image
              resizeMode="contain"
              source={require('@/assets/images/via-la-maschera-logo-header-light.png')}
              style={styles.headerLogo}
            />
          </View>
          <Text style={styles.kicker}>{copy.profile.headerKicker}</Text>
          <Text style={styles.headerTitle}>{copy.profile.headerTitle}</Text>
          <Text style={styles.headerText}>{copy.profile.headerText}</Text>
        </View>
      }>
      <ThemedView style={styles.accountPanel}>
        <View style={styles.accountHeader}>
          <View style={styles.accountTitleGroup}>
            <View style={styles.panelIcon}>
              <IconSymbol name="person.fill" color={BrandColors.primary} size={20} />
            </View>
            <ThemedText type="subtitle">{copy.profile.account}</ThemedText>
            <ThemedText style={styles.mutedText}>
              {user ? copy.profile.accountLinked : copy.profile.accountNotLinked}
            </ThemedText>
          </View>

          {user ? (
            <View style={styles.initialsMark}>
              <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.initialsText}>
                {getUserInitials(user.displayName, user.email)}
              </ThemedText>
            </View>
          ) : null}
        </View>

        {!isFirebaseConfigured ? (
          <ThemedView style={styles.statusBox}>
            <ThemedText type="defaultSemiBold">{copy.profile.cloudMissing}</ThemedText>
            <ThemedText style={styles.mutedText}>
              {copy.profile.cloudMissingText}
            </ThemedText>
          </ThemedView>
        ) : user ? (
          <>
            <ThemedText>{user.displayName ?? user.email}</ThemedText>
            <Pressable accessibilityRole="button" onPress={signOut} style={styles.secondaryButton}>
              <IconSymbol name="shield.fill" color={BrandColors.primary} size={17} />
              <ThemedText type="defaultSemiBold" style={styles.secondaryButtonText}>
                {copy.profile.logout}
              </ThemedText>
            </Pressable>
          </>
        ) : (
          <>
            <ThemedText style={styles.mutedText}>
              {copy.profile.signInText}
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              disabled={!isGoogleAuthConfigured || isSigningIn}
              onPress={signInWithGoogle}
              style={[
                styles.primaryButton,
                !isGoogleAuthConfigured || isSigningIn ? styles.primaryButtonDisabled : undefined,
              ]}>
              <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.primaryButtonText}>
                {isSigningIn ? copy.profile.loginOpening : copy.profile.login}
              </ThemedText>
              <IconSymbol name="arrow.right.circle.fill" color="#FFFFFF" size={18} />
            </Pressable>
          </>
        )}

        {authError ? <ThemedText style={styles.warningText}>{authError}</ThemedText> : null}
      </ThemedView>

      <ThemedView style={styles.preferencesPanel}>
        <View style={styles.panelTitleRow}>
          <IconSymbol name="sparkles" color={BrandColors.primary} size={20} />
          <ThemedText type="subtitle">{copy.common.theme}</ThemedText>
        </View>
        <ThemedText style={styles.mutedText}>{copy.profile.themeHelp}</ThemedText>
        <View style={styles.segmentedRow}>
          {(['light', 'dark'] as const).map((mode) => {
            const isSelected = themeMode === mode;

            return (
              <Pressable
                accessibilityRole="button"
                key={mode}
                onPress={() => setThemeMode(mode)}
                style={[styles.segmentButton, isSelected ? styles.segmentButtonActive : undefined]}>
                <ThemedText
                  type="defaultSemiBold"
                  style={isSelected ? styles.segmentButtonTextActive : styles.segmentButtonText}>
                  {mode === 'light' ? copy.common.light : copy.common.dark}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </ThemedView>

      <ThemedView style={styles.preferencesPanel}>
        <View style={styles.panelTitleRow}>
          <IconSymbol name="person.2.fill" color={BrandColors.teal} size={20} />
          <ThemedText type="subtitle">{copy.profile.language}</ThemedText>
        </View>
        <View style={styles.languageGrid}>
          {supportedLanguages.map((supportedLanguage) => {
            const isSelected = language === supportedLanguage.code;

            return (
              <Pressable
                accessibilityRole="button"
                key={supportedLanguage.code}
                onPress={() => setLanguage(supportedLanguage.code)}
                style={[styles.languageButton, isSelected ? styles.languageButtonActive : undefined]}>
                <ThemedText
                  type="defaultSemiBold"
                  style={isSelected ? styles.segmentButtonTextActive : styles.segmentButtonText}>
                  {supportedLanguage.nativeName}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </ThemedView>

      <ThemedView style={styles.privacyPanel}>
        <View style={styles.panelTitleRow}>
          <IconSymbol name="shield.fill" color={BrandColors.teal} size={20} />
          <ThemedText type="subtitle">{copy.profile.privacy}</ThemedText>
        </View>

        <View style={styles.privacyItem}>
          <View style={styles.privacyIcon}>
            <IconSymbol name="lock.fill" color={BrandColors.teal} size={17} />
          </View>
          <View style={styles.privacyCopy}>
            <ThemedText type="defaultSemiBold">{copy.profile.privacyArchive}</ThemedText>
            <ThemedText style={styles.mutedText}>
              {copy.profile.privacyArchiveText}
            </ThemedText>
          </View>
        </View>

        <View style={styles.privacyItem}>
          <View style={styles.privacyIcon}>
            <IconSymbol name="person.2.fill" color={BrandColors.teal} size={17} />
          </View>
          <View style={styles.privacyCopy}>
            <ThemedText type="defaultSemiBold">{copy.profile.privacyInitials}</ThemedText>
            <ThemedText style={styles.mutedText}>
              {copy.profile.privacyInitialsText}
            </ThemedText>
          </View>
        </View>

        <View style={styles.privacyItem}>
          <View style={styles.privacyIcon}>
            <IconSymbol name="checkmark.seal.fill" color={BrandColors.teal} size={17} />
          </View>
          <View style={styles.privacyCopy}>
            <ThemedText type="defaultSemiBold">{copy.profile.privacyConsent}</ThemedText>
            <ThemedText style={styles.mutedText}>
              {copy.profile.privacyConsentText}
            </ThemedText>
          </View>
        </View>

        <View style={styles.legalLinks}>
          <Link href="/privacy" asChild>
            <Pressable accessibilityRole="link" style={styles.legalLink}>
              <ThemedText type="defaultSemiBold" style={styles.legalLinkTitle}>
                {legal.privacy.profileTitle}
              </ThemedText>
              <ThemedText style={styles.legalLinkText}>
                {legal.privacy.profileText}
              </ThemedText>
            </Pressable>
          </Link>
          <Link href="/delete-account" asChild>
            <Pressable accessibilityRole="link" style={styles.legalLink}>
              <ThemedText type="defaultSemiBold" style={styles.legalLinkTitle}>
                {legal.dataDeletion.profileTitle}
              </ThemedText>
              <ThemedText style={styles.legalLinkText}>
                {legal.dataDeletion.profileText}
              </ThemedText>
            </Pressable>
          </Link>
          <Link href="/terms" asChild>
            <Pressable accessibilityRole="link" style={styles.legalLink}>
              <ThemedText type="defaultSemiBold" style={styles.legalLinkTitle}>
                {communityRules.profileTitle}
              </ThemedText>
              <ThemedText style={styles.legalLinkText}>
                {communityRules.profileText}
              </ThemedText>
            </Pressable>
          </Link>
        </View>
      </ThemedView>

      <ThemedView style={styles.statusPanel}>
        <View style={styles.panelTitleRow}>
          <IconSymbol name="checkmark.seal.fill" color={BrandColors.primary} size={20} />
          <ThemedText type="subtitle">{copy.profile.status}</ThemedText>
        </View>
        <View style={styles.statusRow}>
          <ThemedText>{copy.profile.firebase}</ThemedText>
          <ThemedText style={isFirebaseConfigured ? styles.readyBadge : styles.waitingBadge}>
            {isFirebaseConfigured ? copy.common.ready : copy.common.waiting}
          </ThemedText>
        </View>
        <View style={styles.statusRow}>
          <ThemedText>{copy.profile.googleLogin}</ThemedText>
          <ThemedText style={isGoogleAuthConfigured ? styles.readyBadge : styles.waitingBadge}>
            {isGoogleAuthConfigured ? copy.common.ready : copy.common.waiting}
          </ThemedText>
        </View>
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
  accountPanel: {
    ...BrandShadows.lifted,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.lg,
    padding: BrandSpacing.xl,
  },
  accountHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.md,
    justifyContent: 'space-between',
  },
  accountTitleGroup: {
    flex: 1,
    gap: 3,
  },
  panelIcon: {
    alignItems: 'center',
    backgroundColor: BrandColors.primarySoft,
    borderRadius: BrandRadii.pill,
    height: 38,
    justifyContent: 'center',
    marginBottom: 4,
    width: 38,
  },
  initialsMark: {
    alignItems: 'center',
    backgroundColor: BrandColors.primary,
    borderRadius: BrandRadii.pill,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  initialsText: {
    fontFamily: FontFamilies.semibold,
    fontSize: 16,
  },
  mutedText: {
    color: BrandColors.muted,
  },
  statusBox: {
    backgroundColor: BrandColors.warmSoft,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: 6,
    padding: 12,
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
  secondaryButton: {
    alignItems: 'center',
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.control,
    borderWidth: 1,
    flexDirection: 'row',
    gap: BrandSpacing.sm,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: BrandColors.primary,
  },
  warningText: {
    color: BrandColors.rose,
  },
  preferencesPanel: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.md,
    padding: BrandSpacing.lg,
  },
  segmentedRow: {
    flexDirection: 'row',
    gap: BrandSpacing.sm,
  },
  segmentButton: {
    alignItems: 'center',
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.control,
    borderWidth: 1,
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  segmentButtonActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  segmentButtonText: {
    color: BrandColors.primary,
    textAlign: 'center',
  },
  segmentButtonTextActive: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: BrandSpacing.sm,
  },
  languageButton: {
    alignItems: 'center',
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.control,
    borderWidth: 1,
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  languageButtonActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  privacyPanel: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: BrandSpacing.lg,
    padding: BrandSpacing.lg,
  },
  panelTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: BrandSpacing.sm,
  },
  privacyItem: {
    alignItems: 'flex-start',
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: BrandSpacing.md,
    padding: BrandSpacing.md,
  },
  privacyIcon: {
    alignItems: 'center',
    backgroundColor: BrandColors.tealSoft,
    borderRadius: BrandRadii.pill,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  privacyCopy: {
    flex: 1,
    gap: 4,
  },
  legalLinks: {
    gap: BrandSpacing.sm,
  },
  legalLink: {
    backgroundColor: BrandColors.primarySoft,
    borderColor: BrandColors.borderStrong,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: 3,
    padding: BrandSpacing.md,
  },
  legalLinkTitle: {
    color: BrandColors.primary,
  },
  legalLinkText: {
    color: BrandColors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  statusPanel: {
    ...BrandShadows.card,
    backgroundColor: BrandColors.surface,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  statusRow: {
    alignItems: 'center',
    backgroundColor: BrandColors.surfaceAlt,
    borderColor: BrandColors.border,
    borderRadius: BrandRadii.card,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: BrandSpacing.md,
  },
  readyBadge: {
    backgroundColor: BrandColors.tealSoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.teal,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  waitingBadge: {
    backgroundColor: BrandColors.primarySoft,
    borderRadius: BrandRadii.pill,
    color: BrandColors.primary,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
