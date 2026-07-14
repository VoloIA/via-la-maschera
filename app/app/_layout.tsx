import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  Lora_400Regular,
  Lora_500Medium,
  Lora_600SemiBold,
  Lora_700Bold,
} from '@expo-google-fonts/lora';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { BrandColors } from '@/constants/brand';
import { communityRulesCopy } from '@/constants/community-rules';
import { AuthProvider } from '@/contexts/auth-context';
import { SettingsProvider, useSettings } from '@/contexts/settings-context';
import { AppLanguage, FontFamilies } from '@/constants/typography';
import { legalCopy } from '@/constants/legal';
import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <SettingsProvider>
      <RootLayoutShell />
    </SettingsProvider>
  );
}

function RootLayoutShell() {
  const colorScheme = useColorScheme();
  const { copy, language } = useSettings();
  const legal = legalCopy[language];
  const communityRules = communityRulesCopy[language];
  const [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_500Medium,
    Lora_600SemiBold,
    Lora_700Bold,
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'it' ? AppLanguage.locale : language;
    }
  }, [language]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="privacy"
            options={{
              headerStyle: {
                backgroundColor: colorScheme === 'dark' ? BrandColors.backgroundDark : BrandColors.surface,
              },
              headerTitleStyle: { fontFamily: FontFamilies.semibold },
              headerTintColor: colorScheme === 'dark' ? '#F4E8FF' : BrandColors.primary,
              title: legal.privacy.title,
            }}
          />
          <Stack.Screen
            name="delete-account"
            options={{
              headerStyle: {
                backgroundColor: colorScheme === 'dark' ? BrandColors.backgroundDark : BrandColors.surface,
              },
              headerTitleStyle: { fontFamily: FontFamilies.semibold },
              headerTintColor: colorScheme === 'dark' ? '#F4E8FF' : BrandColors.primary,
              title: legal.dataDeletion.title,
            }}
          />
          <Stack.Screen
            name="terms"
            options={{
              headerStyle: {
                backgroundColor: colorScheme === 'dark' ? BrandColors.backgroundDark : BrandColors.surface,
              },
              headerTitleStyle: { fontFamily: FontFamilies.semibold },
              headerTintColor: colorScheme === 'dark' ? '#F4E8FF' : BrandColors.primary,
              title: communityRules.title,
            }}
          />
          <Stack.Screen
            name="modal"
            options={{
              headerStyle: {
                backgroundColor: colorScheme === 'dark' ? BrandColors.backgroundDark : BrandColors.surface,
              },
              headerTitleStyle: { fontFamily: FontFamilies.semibold },
              headerTintColor: colorScheme === 'dark' ? '#F4E8FF' : BrandColors.primary,
              presentation: 'modal',
              title: copy.archive.reflection,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
