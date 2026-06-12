import { Title as MantineTitle, type TitleProps as MantineTitleProps } from '@mantine/core';
import type { ReactNode } from 'react';

type TitleProps = MantineTitleProps & {
  children: ReactNode;
};

type TitleOrder = NonNullable<TitleProps['order']>;

const titleColorByOrder: Partial<Record<TitleOrder, string>> = {
  1: 'cyan.8',
  2: 'cyan.7',
};

export const Title = ({ children, order, c, ...props }: TitleProps) => {
  const titleColor = order ? (titleColorByOrder[order] ?? 'cyan.8') : 'cyan.8';

  return (
    <MantineTitle {...props} order={order} c={c ?? titleColor}>
      {children}
    </MantineTitle>
  );
};
