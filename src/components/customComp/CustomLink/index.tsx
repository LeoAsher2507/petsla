import React from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import { RootState, useAppSelector } from "src/stores/rootReducer";

const CustomLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  const style = useAppSelector((state: RootState) => state.theme.style);

  return (
    <Link
      style={{ color: match ? "rgb(230, 150, 70)" : style.color }}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
