import { AppShell, Burger, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher/LanguageSwitcher.tsx';
import { Container, Link } from '@/shared/components';
import { ROUTE } from '@/shared/constants/routes.ts';
import styles from './Header.module.scss';

export const Header = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  const menuButtons = (
    <>
      <Link className={styles.button} to={ROUTE.HOME} onClick={close}>
        {t('navigation.home')}
      </Link>
      <Link className={styles.button} to={ROUTE.RECIPES} onClick={close}>
        {t('navigation.recipes')}
      </Link>
    </>
  );

  return (
    <AppShell.Header className={styles.header} bg="#F5F5F5">
      <Container className={styles.inner}>
        <Group h="100%" visibleFrom="sm" gap="50px" w="100%">
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
