import * as React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { useParams } from "react-router-dom";
import AlbumTracksLload from "./AlbumTracksLload";
import ComposersStore from "./stores/ComposersStore";

export interface IMusicPlayerProps {
  store: ComposersStore;
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
  return <AlbumTracksLload store={props.store} idAlbum={Number(idAlbum)} />;
};

export default MusicPlayerAlbum;
