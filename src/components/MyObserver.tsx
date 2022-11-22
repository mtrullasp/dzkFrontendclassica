import React from "react";
import { Observer } from "mobx-react-lite";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { IAlbum } from "./albums/AlbumsStore";
import { LayoutContainer } from "../layout/LayoutSantGrial";
import { MainHeader } from "../App";
import { toJS } from "mobx";

export interface IMyObserverProps {
  children: JSX.Element;
}
const MyObserver = (props: IMyObserverProps) => {
  return <Observer>{() => props.children}</Observer>;
};

export default MyObserver;
