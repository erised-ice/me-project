import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
  createPolymorphicComponent,
} from '@mantine/core';
import type { ReactNode } from 'react';

export type ButtonProps = MantineButtonProps & {
  children: ReactNode;
};

const _Button = ({ children, color, ...props }: ButtonProps) => {
  return (
    <MantineButton {...props} color={color ?? 'cyan'} size="lg" radius="md">
      {children}
    </MantineButton>
  );
};

export const Button = createPolymorphicComponent<'button', ButtonProps>(_Button);
