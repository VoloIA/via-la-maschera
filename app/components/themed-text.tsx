import { StyleSheet, Text, type TextProps } from 'react-native';

import { AppLanguage, AppLanguageLocales, FontFamilies } from '@/constants/typography';
import { useOptionalSettings } from '@/contexts/settings-context';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  accessibilityLanguage = AppLanguage.locale,
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const settings = useOptionalSettings();
  const language = settings ? AppLanguageLocales[settings.language] : accessibilityLanguage;

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      accessibilityLanguage={language}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: FontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: FontFamilies.semibold,
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontFamily: FontFamilies.bold,
    fontSize: 32,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: FontFamilies.semibold,
    fontSize: 20,
    lineHeight: 27,
  },
  link: {
    fontFamily: FontFamilies.semibold,
    color: '#0a7ea4',
    fontSize: 16,
    lineHeight: 30,
  },
});
