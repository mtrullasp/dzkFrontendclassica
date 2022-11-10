import React from "react";
import AlbumsList, { IAlbumsListProps } from "./AlbumsList";
import AlbumsStore from "./AlbumsStore";
import { Observer } from "mobx-react";
import { useParams } from "react-router-dom";
import ComposerOneTemplate from "./pages/composer/ComposerOneTemplate";
import { useComposerstore } from "./index";

export interface AlbumsListWorkParams {
  idMN: string;
  idMC: string;
}
const AlbumsListWork = () => {
  const { idMN, idMC } = useParams();
  const albumsData = new AlbumsStore();
  const store = useComposerstore();
  store.setWorkActById(idMC);
  albumsData.getAlbumsByWork(idMC);

  /*
  return <div>HOLA</div>;
*/
  return (
    <Observer>
      {() => {
        return (
          <ComposerOneTemplate
            content={
              <div>
                <AlbumsList
                  albums={albumsData.albums}
                  workName={store.workAct.nameWork}
                />
              </div>
            }
          />
        );
      }}
    </Observer>
  );
};

export default AlbumsListWork;
