import { computed, makeAutoObservable, reaction } from "mobx";
import axios from "axios";
import { WEB_API_HOST } from "../util/constants";
import { IComposer } from "../interfaces";
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
  idRol: number;
  name: string;
  nacionality: string;
  imatgeUrl: string;
}

export default class PerformersStore {
  constructor() {
    makeAutoObservable(this);
    const urlRol = WEB_API_HOST + "api/PlayerRol";
    debugger;
    axios.get<IPlayerRol[]>(urlRol).then((response) => {
      debugger;
      this.rols = response.data;
      this.activeRol = this.rols[0];
    });

    reaction(
      () => this.activeRol,
      (c: IPlayerRol) => {
        //const urlRol = WEB_API_HOST + "api/TPlayer?idRol=" + c.id;
        debugger;
        const urlRol = WEB_API_HOST + "api/TPlayer?idRol=" + c.id;
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

  performers: IPlayer[] = [];
  rols: IPlayerRol[] = [];
  activeRol: IPlayerRol;

  setActiveRolById = (idRol: number) => {
    this.activeRol = this.rols.find((r) => r.id === idRol);
  };
  setActiveRolNext = () => {
    debugger;
    this.activeRol =
      this.rols[this.rols.findIndex((rol) => rol.id === this.activeRol.id) + 1];
  };

  setActiveRolPrev = () => {
    this.activeRol =
      this.rols[this.rols.findIndex((rol) => rol.id === this.activeRol.id) - 1];
  };
}
