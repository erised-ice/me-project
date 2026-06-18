import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
  createPolymorphicComponent,
} from '@mantine/core';
import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonProps = MantineButtonProps & {
  children: ReactNode;
  className?: string;
};

const _Button = ({ children, color, className, ...props }: ButtonProps) => {
  return (
    <MantineButton
      px={45}
      {...props}
      color={color ?? '#171718'}
      classNames={{ root: cx(styles.button, className) }}
    >
      {children}
    </MantineButton>
  );
};

export const Button = createPolymorphicComponent<'button', ButtonProps>(_Button);
