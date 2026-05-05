import { useOptionalSettings } from '@/contexts/settings-context';

export function useColorScheme() {
  return useOptionalSettings()?.themeMode ?? 'light';
}
