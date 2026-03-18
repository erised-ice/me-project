import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
  createPolymorphicComponent,
} from '@mantine/core';
import type { ReactNode } from 'react';

type ButtonProps = MantineButtonProps & {
  children: ReactNode;
};

const _Button = ({ children, ...props }: ButtonProps) => {
  return (
    <MantineButton {...props} color="cyan" size="lg" radius="md">
      {children}
    </MantineButton>
  );
};

export const Button = createPolymorphicComponent<'button', ButtonProps>(_Button);
