import { AppShell, Container } from '@mantine/core';
import type { ReactNode } from 'react';
import { Header } from './components/Header/Header.tsx';

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
