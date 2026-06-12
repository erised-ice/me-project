import { AppShell, Container } from '@mantine/core';
import type { ReactNode } from 'react';
import { Header } from './components/Header/Header.tsx';

type LayoutProps = {
  children?: ReactNode;
  withContainer?: boolean;
};

export const Layout = ({ children, withContainer = true }: LayoutProps) => {
  return (
    <AppShell header={{ height: '80px' }}>
      <Header />
      <AppShell.Main>
        {withContainer ? (
          <Container size="lg" px="md" py="md">
            {children}
          </Container>
        ) : (
          <>{children}</>
        )}
      </AppShell.Main>
    </AppShell>
  );
};
