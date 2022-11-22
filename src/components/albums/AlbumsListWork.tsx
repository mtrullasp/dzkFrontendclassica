import React from "react";
import AlbumsList, { IAlbumsListProps } from "./AlbumsList";
import AlbumsStore from "./AlbumsStore";
import { Observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { useAlbumsStore, useComposerstore } from "../../index";
import ComposerOneTemplate from "../../pages/composer/ComposerOneTemplate";

export interface AlbumsListWorkParams {
  idMN: string;
  idMC: string;
}
const AlbumsListWork = () => {
  const { idMN, idMC } = useParams();
  debugger;
  const cStore = useComposerstore();
  const aStore = useAlbumsStore();
  cStore.setWorkActById(Number(idMC));
  aStore.getAlbumsByWork(Number(idMC));

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
                  albums={aStore.albums}
                  workName={cStore?.workAct?.nameWork}
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
