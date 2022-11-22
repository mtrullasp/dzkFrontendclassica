import { computed, makeAutoObservable, observable } from "mobx";
import axios, { AxiosResponse } from "axios";
import { HOST_WEB_API } from "./RandomStore";
import { sort } from "fast-sort";
import enumerable from "linq";

export interface IWork {
  atAgeOf: number;
  performancesCount: number;
  performancesCountReal: number;
  nameWork: string;
  idComposerMN: string;
  workGenre: string;
  workType: string;
  idWork: number;
}

export class WorksStore {
  constructor(idMN: string) {}
}
