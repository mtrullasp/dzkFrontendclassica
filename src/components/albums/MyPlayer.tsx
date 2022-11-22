import React, { useState } from "react";
import Player from "../../Player/Player";
import MyAudio from "../../MyAudio";
import { useParams } from "react-router-dom";
import { useAlbumsStore } from "../../index";
import AlbumTracksStore from "../../stores/AlbumTracksStore";
import { Observer } from "mobx-react";

const initAudio = {
  url: "",
  author: "",
  title: "",
};

const MyPlayer = () => {
  const store = new AlbumTracksStore();
  return (
    <Observer>
      {() => <MyAudio urlAudio={store?.activeAlbumTrack?.urlTrack} />}
    </Observer>
  );
};

export default MyPlayer;
