import { computed, makeAutoObservable, reaction } from "mobx";
import axios, { AxiosResponse } from "axios";
import { IComposer } from "../interfaces";
import { HOST_WEB_API, ITrackAlbum } from "./RandomStore";
import { IAlbum } from "../components/albums/AlbumsStore";
// import { usePerformersStore } from "../index";

export interface IPlayerRol {
  id: number;
  name: string;
  urlImage: string;
  category: string;
  imgBase64: string;
  family: string;
}
export interface IPlayer {
  id: number;
  idMN: string;
  idRol: number;
  name: string;
  nacionality: string;
  imatgeUrl: string;
  imatgeBase64Large: string;
  quantsAlbums: number;
  bio: string;
}

export default class PerformersStore {
  constructor() {
    makeAutoObservable(this);
    const urlRol = HOST_WEB_API + "/PlayerRol";
    debugger;
    axios.get<IPlayerRol[]>(urlRol).then((response) => {
      debugger;
      this.rols = response.data;
      this.activeRol = this.rols[0];
    });

    reaction(
      () => this.activeRol,
      (c: IPlayerRol) => {
        //const urlRol = HOST_WEB_API + "/TPlayer?idRol=" + c.id;
        debugger;
        const urlRol = HOST_WEB_API + "/TPlayer?idRol=" + c.id;
        this.performers = [];
        axios.get<IPlayer[]>(urlRol).then((response) => {
          debugger;
          this.performers = response.data;
        });
      }
    );
  }

  /*
  @computed get activePerformers(): IPlayer[] {
    return this.performers.filter((f) => f.id === this.activeRol.id);
  }
*/

  performerAct: IPlayer;

  activeAlbumTracks: ITrackAlbum[] = [];

  performers: IPlayer[] = [];
  rols: IPlayerRol[] = [];
  activeRol: IPlayerRol;

  activePerformer: IPlayer;

  setActiveRolById = (idRol: number) => {
    this.activeRol = this.rols.find((r) => r.id === idRol);
  };
  setActiveRolNext = () => {
    debugger;
    this.activeRol =
      this.rols[this.rols.findIndex((rol) => rol.id === this.activeRol.id) + 1];
  };

  getAlbumTracks = (idAlbum: number): Promise<void | ITrackAlbum[]> => {
    const url = HOST_WEB_API + "/Tracks?idAlbum=" + idAlbum;
    return axios.get<ITrackAlbum[]>(url).then((r) => {
      this.activeAlbumTracks = r.data;
    });
  };

  public setActivePerformerByIdMN = (idMN: string) => {
    const performer = this.performers.find((f) => f.idMN === idMN);
    this.performerAct = performer;
  };

  setActivePerformerById = (id: number) => {
    this.activePerformer = this.performers.find((r) => r.id === id);
  };

  albumsPerformer: IAlbum[];

  getAlbumsByPerformer = (id: number) => {
    const url = HOST_WEB_API + "/AlbumsByPerformer?idPlayer=" + id;
    axios.get<IAlbum[]>(url).then((response) => {
      this.albumsPerformer = response.data;
    });
  };
}
