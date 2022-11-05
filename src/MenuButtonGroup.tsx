import React from "react";
import { Stack } from "@mui/material";
import MenuButton from "./MenuButton";

export interface IPropsMenuButtonGroup {
  vertical: Boolean;
  size: number;
  items: IMenuItem[];
  border?: Boolean;
}

export interface IMenuItem {
  onClick: () => void;
  mainText: string;
  subText?: string;
}

const MenuButtonGroup = (props: IPropsMenuButtonGroup) => {
  return (
    <Stack direction={props.vertical ? "column" : "row"} spacing={0}>
      {props.items.map((e) => {
        return (
          <MenuButton
            border={props.border}
            size={props.size}
            onClick={e.onClick}
            text={e.mainText}
            subText={e.subText}
          />
        );
      })}
    </Stack>
  );
};

export default MenuButtonGroup;
