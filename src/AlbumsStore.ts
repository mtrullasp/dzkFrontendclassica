import { makeAutoObservable } from "mobx";
import { HOST_WEB_API } from "./stores/RandomStore";
import axios, { Axios, AxiosResponse } from "axios";

export interface IAlbum {
  idAlbum: number;
  nameMW: string;
  urlCover: string;
  prestige: number;
  albumType: string;
}

class AlbumsStore {
  constructor() {
    makeAutoObservable(this);
  }

  albums: IAlbum[] = [];

  getAlbumsByWork = (idWork: string) => {
    const url = HOST_WEB_API + "/AlbumsByWork?idWork=" + idWork;
    axios.get<IAlbum[]>(url).then((response: AxiosResponse<IAlbum[]>) => {
      debugger;
      this.albums = response.data;
    });
  };
}

export default AlbumsStore;
