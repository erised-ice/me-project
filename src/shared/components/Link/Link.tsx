import cx from 'classnames';
import type { LinkProps as ReactLinkProps } from 'react-router-dom';
import { Link as ReactLink } from 'react-router-dom';
import styles from './Link.module.scss';

type LinkProps = {
  isText?: boolean;
  variant?: 'default' | 'light';
} & ReactLinkProps;

export const Link = ({ children, isText, variant = 'default', ...props }: LinkProps) => {
  return (
    <ReactLink className={cx(styles.link, isText && styles.text, styles[variant])} {...props}>
      {children}
    </ReactLink>
  );
};
