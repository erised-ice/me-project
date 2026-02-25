import { Link as ReactLink } from "react-router-dom";
import type {ReactNode} from "react";

type LinkProps = {
  children: ReactNode;
  to: string;
}

export const Link = ({ children, to }: LinkProps) => {
  return (
    <ReactLink to={to} >
      {children}
    </ReactLink>
  )
}
