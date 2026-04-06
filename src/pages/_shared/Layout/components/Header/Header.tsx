import { AppShell, Container, Group } from '@mantine/core';
import { Button, Link } from '@/shared/components';
import { ROUTE } from '@/shared/constants/routes.ts';

export const Header = () => {
  return (
    <AppShell.Header>
      {/*
      Здесь будет навигация, логотип и тому подобное. Он будет одинаковый на всех страницах
      */}
      <Container size="lg" px="md" h="100%">
        <Group h="100%">
          <Button>
            <Link to={ROUTE.HOME}>Главная</Link>
          </Button>
          <Button>
            <Link to={ROUTE.RECIPES}>Рецепты</Link>
          </Button>
        </Group>
      </Container>
      {/*TODO: Сделать так, чтобы подсвечивались нужные ссылки когда находимся на нужной странице */}
    </AppShell.Header>
  );
};
