import { Title as MantineTitle, type TitleProps as MantineTitleProps } from '@mantine/core';
import type { ReactNode } from 'react';

type TitleProps = MantineTitleProps & {
  children: ReactNode;
};

export const Title = ({ children, order }: TitleProps) => {
  type TitleOrder = NonNullable<TitleProps['order']>;

  const titleColorByOrder: Partial<Record<TitleOrder, string>> = {
    1: 'cyan.8',
    2: 'cyan.7',
  };

  const titleColor = order ? (titleColorByOrder[order] ?? 'cyan.8') : 'cyan.8';

  return (
    <MantineTitle order={order} c={titleColor}>
      {children}
    </MantineTitle>
  );
};
