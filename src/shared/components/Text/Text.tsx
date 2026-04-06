import type { ReactNode } from 'react';
import { Text as MantineText, type TextProps as MantineTextProps } from '@mantine/core';

type TextMode = 'default' | 'accent' | 'note';

type TextProps = MantineTextProps & {
  children: ReactNode;
  textMode: TextMode;
};

const textStylesByMode = {
  default: {
    size: 'lg',
    lh: 1.6,
  },
  accent: {
    size: 'lg',
    lh: 1.6,
    c: 'cyan.9',
  },
  note: {
    size: 'sm',
    c: 'dimmed',
  },
};

export const Text = ({ children, textMode }: TextProps) => {
  const textStyles = textStylesByMode[textMode];

  return <MantineText {...textStyles}>{children}</MantineText>;
};
