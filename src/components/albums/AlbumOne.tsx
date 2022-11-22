import React, { useState } from "react";
import { useComposerstore } from "../../index";
import ComposerOneTemplate from "../../pages/composer/ComposerOneTemplate";
import MusicPlayer from "../../MusicPlayer";
import MusicPlayerAlbum from "../../MusicPlayer";
import { LayoutContainer } from "../../layout/LayoutSantGrial";
import { MainHeader } from "../../App";
import { IAlbum } from "./AlbumsStore";
import AlbumTracksStore from "../../stores/AlbumTracksStore";
import { useParams } from "react-router-dom";
import MyPlayer from "./MyPlayer";

const AlbumOne = () => {
  const { idAlbum } = useParams();
  // const store = useComposerstore();
  // const album = store.activeAlbum;
  return (
    <LayoutContainer
      clientContent={<MusicPlayerAlbum idAlbum={Number(idAlbum)} />}
      leftNavBarContent={null}
      rightLinkBarContent={null}
      footerContent={<MyPlayer />}
      headerContent={
        <MainHeader showHome={true} showBack={true} showNextPrevious={true} />
      }
    />
  );
};

export default AlbumOne;
