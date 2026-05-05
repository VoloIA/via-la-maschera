import { LegalPage } from '@/components/legal-page';
import { communityRulesCopy } from '@/constants/community-rules';
import { useSettings } from '@/contexts/settings-context';

export default function TermsScreen() {
  const { language } = useSettings();
  const content = communityRulesCopy[language];

  return (
    <LegalPage
      backLabel={content.backToProfile}
      intro={content.intro}
      kicker={content.kicker}
      sections={content.sections}
      title={content.title}
      updated={content.updated}
    />
  );
}
