import { Title as MantineTitle, type TitleProps as MantineTitleProps } from '@mantine/core';
import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './Title.module.scss';

type TitleProps = MantineTitleProps & {
  children: ReactNode;
  className?: string;
};

export const Title = ({ children, className, order = 1, ...props }: TitleProps) => {
  const titleClassByOrder = {
    1: styles.h1,
    2: styles.h2,
    3: styles.h3,
    4: styles.h4,
    5: styles.h5,
    6: styles.h6,
  };

  return (
    <MantineTitle
      order={order}
      className={cx(styles.title, titleClassByOrder[order], className)}
      {...props}
    >
      {children}
    </MantineTitle>
  );
};
