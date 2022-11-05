import React, { useState } from "react";
import { ITrackAlbum } from "./stores/RandomStore";
import { List, ListItem } from "@mui/material";
import ComposersStore from "./stores/ComposersStore";
import AlbumTracks from "./AlbumTracks";
import { Observer } from "mobx-react";

export interface IAlbumTracksLloadProps {
  store: ComposersStore;
  idAlbum: number;
}
const AlbumTracksLload = (props: IAlbumTracksLloadProps) => {
  props.store.getAlbumTracks(props.idAlbum);
  return (
    <Observer>
      {() => (
        <AlbumTracks
          tracks={props.store.activeAlbumTracks}
          store={props.store}
        />
      )}
    </Observer>
  );
};

export default AlbumTracksLload;
