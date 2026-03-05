import { Link as ReactLink } from "react-router-dom";
import type {ReactNode} from "react";
import cx from "classnames";
import styles from "./Link.module.scss";

type LinkProps = {
  children: ReactNode;
  to: string;
  isText?: boolean;
}

export const Link = ({ children, to, isText }: LinkProps) => {
  return (
    <ReactLink to={to} className={cx(styles.link, isText && styles.text)} to={to} >
      {children}
    </ReactLink>
  )
}
