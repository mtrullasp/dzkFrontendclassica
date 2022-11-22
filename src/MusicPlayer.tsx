import * as React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { useParams } from "react-router-dom";
import AlbumTracksLload from "./components/albums/AlbumTracksLload";
import ComposersStore from "./stores/ComposersStore";
import { IAlbum } from "./components/albums/AlbumsStore";
import { Observer } from "mobx-react";

export interface IMusicPlayerProps {
  // store: ComposersStore;
  idAlbum: number;
}

/*
const MusicPlayerAlbum = (props: MusicPlayerProps) => {
  const { idAlbum } = useParams();
  return (
    <iframe
      title="deezer-widget"
      src={"https://widget.deezer.com/widget/dark/album/" + idAlbum}
      width={1500}
      height={700}
      frameBorder={0}
      allowTransparency={true}
      allow="encrypted-media; clipboard-write"
    ></iframe>
  );
};
*/

const MusicPlayerAlbum = (props: IMusicPlayerProps) => {
  const { idAlbum } = useParams();
  return (
    <Observer>
      {() => <AlbumTracksLload idAlbum={Number(props.idAlbum)} />}
    </Observer>
  );
};

export default MusicPlayerAlbum;
