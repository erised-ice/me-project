import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './Container.module.scss';

export type ContainerProps = {
  children?: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={cx(className, styles.wrapper)}>{children}</div>;
};
