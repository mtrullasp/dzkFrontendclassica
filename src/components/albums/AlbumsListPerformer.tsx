import React from "react";
import AlbumsList, { IAlbumsListProps } from "./AlbumsList";
import AlbumsStore from "./AlbumsStore";
import { Observer } from "mobx-react";
import { useParams } from "react-router-dom";
import ComposerOneTemplate from "../../pages/composer/ComposerOneTemplate";
import { useComposerstore, usePerformersStore } from "../../index";

interface IAlbumsListPerformerParms {
  id: number;
}

const AlbumsListPerformer = () => {
  debugger;
  const { id } = useParams<keyof IAlbumsListPerformerParms>();
  //const al  bumsData = new AlbumsStore();
  const store = usePerformersStore();
  store.getAlbumsByPerformer(Number(id));

  return (
    <Observer>
      {() => {
        return (
          <div>
            <AlbumsList
              albums={store.albumsPerformer}
              workName={store.activePerformer.name + ". Discofragia"}
            />
          </div>
        );
      }}
    </Observer>
  );
};

export default AlbumsListPerformer;
