import React, { useState } from "react";
import { ITrackAlbum } from "../../stores/RandomStore";
import { List, ListItem } from "@mui/material";
import ComposersStore from "../../stores/ComposersStore";
import AlbumTracks from "./AlbumTracks";
import { Observer } from "mobx-react";
import { IAlbum } from "./AlbumsStore";

export interface IAlbumTracksLloadProps {
  idAlbum: number;
}
const AlbumTracksLload = (props: IAlbumTracksLloadProps) => {
  return <Observer>{() => <AlbumTracks idAlbum={props.idAlbum} />}</Observer>;
};

export default AlbumTracksLload;
