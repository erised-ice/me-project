import {Header} from "./components/Header/Header.tsx";
import type {ReactNode} from "react";
import styles from "./Layout.module.scss";
import {AppShell, Container} from "@mantine/core";

type LayoutProps = {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <AppShell header={{ height: "80px" }} padding="md">
      <Header />
      <AppShell.Main>
        <Container size="lg" px="md">
          {children}
        </Container>
      </AppShell.Main>
    {/*
    Здесь будет компонент Хедер с тегом header
    Далее тег main в котором будет children (Для них нужно будет прописать пропсы).
    Еще можно добавить контейнер, но у меня пока что нет стилей, поэтому видимо это я добавлю потом.
    */}
    </AppShell>
  )
}