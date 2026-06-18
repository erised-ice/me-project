import { Text as MantineText, type TextProps as MantineTextProps } from '@mantine/core';
import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './Text.module.scss';

type TextMode = 'default' | 'accent' | 'note';

type TextProps = MantineTextProps & {
  children: ReactNode;
  textMode?: TextMode;
};

export const Text = ({ children, textMode = 'default', className, ...props }: TextProps) => {
  return (
    <MantineText className={cx(styles.text, styles[textMode], className)} {...props}>
      {children}
    </MantineText>
  );
};
