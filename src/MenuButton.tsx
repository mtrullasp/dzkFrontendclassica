import React, { CSSProperties } from "react";
import { Fab } from "@mui/material";
import GhostButton from "./GhostButton";

export interface MenuItemProps {
  style?: CSSProperties;
  text?: string;
  subText?: string;
  onClick: () => void;
  border?: Boolean;
  selected?: boolean;
  size?: number;
  children?: JSX.Element;
}

const MenuItem = (props: MenuItemProps) => {
  return GhostButton(props);
};

export default MenuItem;
