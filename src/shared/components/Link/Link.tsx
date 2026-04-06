import type { LinkProps as ReactLinkProps } from 'react-router-dom';

import { Link as ReactLink } from 'react-router-dom';
import cx from 'classnames';
import styles from './Link.module.scss';

type LinkProps = {
  isText?: boolean;
} & ReactLinkProps;

export const Link = ({ children, isText, ...props }: LinkProps) => {
  return (
    <ReactLink className={cx(styles.link, isText && styles.text)} {...props}>
      {children}
    </ReactLink>
  );
};
