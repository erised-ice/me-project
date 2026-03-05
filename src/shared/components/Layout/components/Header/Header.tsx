import {Link} from "../../../Link/Link.tsx";
import {ROUTE} from "../../../../constants/routes.ts";
import {AppShell, Button, Container, Group} from "@mantine/core";

/*TODO: добавить алиасы чтобы писать сокращенные пути (а может и не надо)*/
export const Header = () => {
  return(
    <AppShell.Header>
      {/*
      Здесь будет навигация, логотип и тому подобное. Он будет одинаковый на всех страницах
      */}
      <Container size="lg" px="md" h="100%">
        <Group h="100%">
          <Button variant="filled" color="cyan" size="lg" radius="md">
            <Link to={ROUTE.HOME}>Главная</Link>
          </Button>
          <Button variant="filled" color="cyan" size="lg" radius="md">
            <Link to={ROUTE.RECIPES}>Рецепты</Link>
          </Button>
        </Group>
      </Container>
      {/*TODO: Сделать так, чтобы подсвечивались нужные ссылки когда находимся на нужной странице */}
    </AppShell.Header>
  )
}
