import { AppShell } from '@mantine/core';
import type { ReactNode } from 'react';
import { Container } from '@/shared/components';
import { Header } from './components/Header/Header.tsx';

type LayoutProps = {
  children?: ReactNode;
  withContainer?: boolean;
};

export const Layout = ({ children, withContainer = true }: LayoutProps) => {
  return (
    <AppShell header={{ height: '100px' }} bg="#f3f4f6">
      <Header />
      <AppShell.Main mt="40px" pb="220px">
        {withContainer ? <Container>{children}</Container> : <>{children}</>}
      </AppShell.Main>
    </AppShell>
  );
};
