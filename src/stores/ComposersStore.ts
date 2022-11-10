import { IComposer } from "../interfaces";
import axios, { AxiosResponse } from "axios";
import { HOST_WEB_API, ITrackAlbum } from "./RandomStore";
import { computed, makeAutoObservable, reaction } from "mobx";
import { IWork } from "./worksStore";
import { shuffle } from "../shuffle";
import { IAlbum } from "../AlbumsStore";

class ComposersStore {
  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.composerAct,
      (c: IComposer) => {
        this.getWorks(c.idMN);
      }
    );
  }

  getRandomComposer = (quants: number): IComposer => {
    return this.allComposers.slice(0, quants)[
      Math.floor(Math.random() * quants)
    ];
  };

  hidrateComposers = (): Promise<void> => {
    const url: string = HOST_WEB_API + "/composers";
    return axios.get(url).then((response: AxiosResponse<IComposer[]>) => {
      this.allComposers = response.data;
    });
  };

  setComposerPrevious = () => {
    if (!this.composerAct) {
      this.composerAct = this.allComposers[0];
    }
    const i: number = this.allComposers.indexOf(this.composerAct);
    this.composerAct = this.allComposers[i - 1];
  };

  setComposerNext = () => {
    debugger;
    if (!this.composerAct) {
      this.composerAct = this.allComposers[0];
    }
    const i: number = this.allComposers.indexOf(this.composerAct);
    this.composerAct = this.allComposers[i + 1];
  };

  composerAct: IComposer = null;

  public setActiveComposerByIdMN = (idMN: string) => {
    const composer = this.allComposers.find((f) => f.idMN === idMN);
    this.composerAct = composer;
  };

  allComposers: IComposer[];

  public fOrderByRanking = (): IComposer[] => {
    return this.allComposers.slice(0).sort((s1, s2) => s1.ranking - s2.ranking);
  };

  public fOrderByRankingDesc = (): IComposer[] => {
    return this.allComposers.slice(0).sort((s1, s2) => s2.ranking - s1.ranking);
  };

  public fOrderByName = (): IComposer[] => {
    return this.allComposers.sort((s1, s2) => s1.Nom.localeCompare(s2.Nom));
  };

  public fOrderByNameDesc = (): IComposer[] => {
    return this.allComposers.sort((s1, s2) => s2.Nom.localeCompare(s1.Nom));
  };

  public fOrderByDateDesc = (): IComposer[] => {
    return this.allComposers.sort(
      (s1, s2) => Number(s2.AnyoNeix) - Number(s1.AnyoNeix)
    );
  };

  fShuffle = (): IComposer[] => {
    return shuffle(this.allComposers);
  };

  public fOrderByDate = (): IComposer[] => {
    return this.allComposers.sort(
      (s1, s2) => Number(s1.AnyoNeix) - Number(s2.AnyoNeix)
    );
  };

  public fOrderByComposers: () => IComposer[] = this.fOrderByRanking;

  // fOrderBy: () = "ranking";

  /*
      get allComposersView(): IComposer[] {
        return new List(this.allComposers)
          .OrderBy((k) => k[this.fOrderBy])
          .ToArray();
      }
    */

  activeIdTrack: number = -1;

  setActiveTrack = (idTrack: number) => {
    this.activeIdTrack = idTrack;
  };

  keySelected: string = "rank_asc";

  setKeySelected = (key: string) => {
    this.keySelected = key;
  };

  workAct: IWork = null;

  setWorkActById = (idMC: string) => {
    this.workAct = this.works.find((el) => el.idWork === idMC);
  };

  activeAlbum: IAlbum;
  setActiveAlbum = (album: IAlbum) => {
    this.activeAlbum = album;
  };

  worksRaw: IWork[] = [];

  @computed get works(): IWork[] {
    debugger;
    return this.worksRaw.slice().sort((a: IWork, b: IWork) => {
      if (this.workSortDir === "asc") {
        return a[this.workSort] - b[this.workSort];
      } else {
        return b[this.workSort] - a[this.workSort];
      }
    });
  }

  workSort: string = "atAgeOf";
  workSortDir: string = "asc";

  ToggleWorksSort = (camp: string) => {
    if (camp === this.workSort) {
      if (this.workSortDir === "asc") {
        this.workSortDir = "desc";
      } else {
        this.workSortDir = "asc";
      }
    } else {
      this.workSort = camp;
      this.workSortDir = "asc";
    }
  };

  activeAlbumTracks: ITrackAlbum[] = [];

  getAlbumTracks = (idAlbum: number) => {
    const url = HOST_WEB_API + "/Tracks?idAlbum=" + idAlbum;
    axios.get<ITrackAlbum[]>(url).then((r) => {
      this.activeAlbumTracks = r.data;
    });
  };

  getWorks = (idMN: string) => {
    const url = HOST_WEB_API + "/WorksByComposer?idComposerMN=" + idMN;
    axios
      .get<IWork[]>(url)
      .then((response: AxiosResponse) => {
        this.worksRaw = response.data;
      })
      .catch((e) => {
        alert("ERROR");
      });
  };
}

export default ComposersStore;

export const getNomCognoms = (str: String | undefined): String => {
  if (str === undefined) {
    return ";";
  }
  return str.split(",").reverse().join(" ");
};

export const getCodeFromHRef = (href: string): string => {
  return href.substring(href.length - 12);
};
