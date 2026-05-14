import { AppShell, Container, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher/LanguageSwitcher.tsx';
import { Button, Link } from '@/shared/components';
import { ROUTE } from '@/shared/constants/routes.ts';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <AppShell.Header>
      {/*
      Здесь будет навигация, логотип и тому подобное. Он будет одинаковый на всех страницах
      */}
      <Container size="lg" px="md" h="100%">
        <Group h="100%">
          <Button>
            <Link to={ROUTE.HOME}>{t('navigation.home')}</Link>
          </Button>
          <Button>
            <Link to={ROUTE.RECIPES}>Рецепты</Link>
          </Button>
          <LanguageSwitcher />
        </Group>
      </Container>
      {/*TODO: Сделать так, чтобы подсвечивались нужные ссылки когда находимся на нужной странице */}
    </AppShell.Header>
  );
};
