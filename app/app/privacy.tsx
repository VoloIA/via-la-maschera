import { LegalPage } from '@/components/legal-page';
import { legalCopy } from '@/constants/legal';
import { useSettings } from '@/contexts/settings-context';

export default function PrivacyScreen() {
  const { language } = useSettings();
  const content = legalCopy[language];

  return (
    <LegalPage
      backLabel={content.backToProfile}
      intro={content.privacy.intro}
      kicker={content.privacy.kicker}
      sections={content.privacy.sections}
      title={content.privacy.title}
      updated={content.privacy.updated}
    />
  );
}
