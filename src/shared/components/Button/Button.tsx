import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
  createPolymorphicComponent,
} from '@mantine/core';
import type { ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonProps = MantineButtonProps & {
  children: ReactNode;
};

const _Button = ({ children, color, ...props }: ButtonProps) => {
  return (
    <MantineButton className={styles.button} {...props} color={color ?? '#171718'}>
      {children}
    </MantineButton>
  );
};

export const Button = createPolymorphicComponent<'button', ButtonProps>(_Button);
