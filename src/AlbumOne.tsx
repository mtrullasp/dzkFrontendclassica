import React from "react";
import { useComposerstore } from "./index";
import ComposerOneTemplate from "./ComposerOneTemplate";
import MusicPlayer from "./MusicPlayer";
import MusicPlayerAlbum from "./MusicPlayer";

const AlbumOne = () => {
  const store = useComposerstore();
  return <ComposerOneTemplate content={<MusicPlayerAlbum store={store} />} />;
};

export default AlbumOne;
