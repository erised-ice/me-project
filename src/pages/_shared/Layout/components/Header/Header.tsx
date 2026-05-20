import { AppShell, Burger, Container, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher/LanguageSwitcher.tsx';
import { Button, Link } from '@/shared/components';
import { ROUTE } from '@/shared/constants/routes.ts';

export const Header = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  const menuButtons = (
    <>
      <Button component={Link} to={ROUTE.HOME}>
        {t('navigation.home')}
      </Button>
      <Button component={Link} to={ROUTE.RECIPES}>
        {t('navigation.recipes')}
      </Button>
    </>
  );

  return (
    <AppShell.Header>
      {/*
      Здесь будет навигация, логотип и тому подобное. Он будет одинаковый на всех страницах
      */}
      <Container size="lg" px="md" h="100%">
        <Group h="100%" visibleFrom="sm">
          {menuButtons}
          <LanguageSwitcher />
        </Group>
        <Group h="100%" hiddenFrom="sm">
          <Burger opened={opened} onClick={open} color="cyan" />
        </Group>
      </Container>
      <Drawer opened={opened} onClose={close} hiddenFrom="sm">
        <Stack>
          <LanguageSwitcher />
          {menuButtons}
        </Stack>
      </Drawer>
      {/*TODO: Сделать так, чтобы подсвечивались нужные ссылки когда находимся на нужной странице */}
    </AppShell.Header>
  );
};
