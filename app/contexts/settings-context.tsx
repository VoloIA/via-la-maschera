import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { type AppThemeMode } from '@/constants/brand';
import {
  appCopy,
  defaultLanguage,
  type AppCopy,
  type AppLanguageCode,
} from '@/constants/localization';
import { getLocalItem, setLocalItem } from '@/lib/local-storage';

const SETTINGS_STORAGE_KEY = 'via-la-maschera:settings:v1';

type StoredSettings = {
  language?: AppLanguageCode;
  themeMode?: AppThemeMode;
};

type SettingsContextValue = {
  copy: AppCopy;
  isSettingsReady: boolean;
  language: AppLanguageCode;
  setLanguage: (nextLanguage: AppLanguageCode) => Promise<void>;
  setThemeMode: (nextMode: AppThemeMode) => Promise<void>;
  themeMode: AppThemeMode;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

function isThemeMode(value: unknown): value is AppThemeMode {
  return value === 'dark' || value === 'light';
}

function isLanguage(value: unknown): value is AppLanguageCode {
  return value === 'en' || value === 'es' || value === 'it' || value === 'ru' || value === 'uk';
}

export function SettingsProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeModeState] = useState<AppThemeMode>('light');
  const [language, setLanguageState] = useState<AppLanguageCode>(defaultLanguage);
  const [isSettingsReady, setIsSettingsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      const savedSettings = await getLocalItem(SETTINGS_STORAGE_KEY);

      if (!isMounted) {
        return;
      }

      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings) as StoredSettings;

          if (isThemeMode(parsedSettings.themeMode)) {
            setThemeModeState(parsedSettings.themeMode);
          }

          if (isLanguage(parsedSettings.language)) {
            setLanguageState(parsedSettings.language);
          }
        } catch {
          // Le impostazioni tornano ai valori leggibili predefiniti.
        }
      }

      setIsSettingsReady(true);
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const persistSettings = useCallback(async (nextSettings: StoredSettings) => {
    await setLocalItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        language,
        themeMode,
        ...nextSettings,
      })
    );
  }, [language, themeMode]);

  const setThemeMode = useCallback(
    async (nextMode: AppThemeMode) => {
      setThemeModeState(nextMode);
      await persistSettings({ themeMode: nextMode });
    },
    [persistSettings]
  );

  const setLanguage = useCallback(
    async (nextLanguage: AppLanguageCode) => {
      setLanguageState(nextLanguage);
      await persistSettings({ language: nextLanguage });
    },
    [persistSettings]
  );

  const value = useMemo<SettingsContextValue>(
    () => ({
      copy: appCopy[language],
      isSettingsReady,
      language,
      setLanguage,
      setThemeMode,
      themeMode,
    }),
    [isSettingsReady, language, setLanguage, setThemeMode, themeMode]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useOptionalSettings() {
  return useContext(SettingsContext);
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings deve essere usato dentro SettingsProvider.');
  }

  return context;
}
