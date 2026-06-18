import { useTranslation } from 'react-i18next';
import { SegmentedControl } from '@/shared/components/SegmentedControl/SegmentedControl.tsx';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <SegmentedControl
      value={i18n.resolvedLanguage}
      onChange={(language) => i18n.changeLanguage(language)}
      data={[
        { label: 'РУС', value: 'ru' },
        { label: 'EN', value: 'en' },
      ]}
      ml="auto"
    />
  );
};
