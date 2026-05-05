import { LegalPage } from '@/components/legal-page';
import { legalCopy } from '@/constants/legal';
import { useSettings } from '@/contexts/settings-context';

export default function DeleteAccountScreen() {
  const { language } = useSettings();
  const content = legalCopy[language];

  return (
    <LegalPage
      backLabel={content.backToProfile}
      intro={content.dataDeletion.intro}
      kicker={content.dataDeletion.kicker}
      sections={content.dataDeletion.sections}
      title={content.dataDeletion.title}
      updated={content.dataDeletion.updated}
    />
  );
}
