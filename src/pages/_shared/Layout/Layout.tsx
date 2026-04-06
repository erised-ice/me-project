import { Header } from './components/Header/Header.tsx';
import type { ReactNode } from 'react';
import { AppShell, Container } from '@mantine/core';

type LayoutProps = {
  children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <AppShell header={{ height: '80px' }} padding="md">
      <Header />
      <AppShell.Main>
        <Container size="lg" px="md">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
