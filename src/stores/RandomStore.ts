import axios, { Axios, AxiosRequestConfig, CancelTokenSource } from "axios";
import {
  IResponseAlbumTracksRoot,
  IResponseRandom,
  IResponseRandomSpotify,
  IResponseTrack,
} from "../ResponseAlbumTracks";
import { makeAutoObservable, observable, reaction } from "mobx";
import { useComposerstore } from "../index";
import { IComposer } from "../interfaces";
import ComposersStore from "./ComposersStore";
const ROUTE_RANDOM_TRACK = "/track/random";

export const HOST_WEB_API = "http://pc-nou/dzk2022WebApi/api";

declare let window: any;

interface Window {
  DZ: any;
  dzPlayer: any;
}

let DZ = window.DZ;
//let dzPlayer = window.dzplayer;

interface ICoreTrackFavPost {
  idTrack: number;
  idUser: number;
  esFavorit: boolean;
}

export interface IResponseAlbumTracks {
  Tracks: ITracksView[];
  AlbumTracks: IAlbumTrack[];
  AlbumCredits: IAlbumCredit[];
}

export interface IAlbumCredit {
  idCredit: number;
  nameCredit: string;
  isMusical?: boolean;
  isPrimary: boolean;
  nameMN: string;
  idMN: string;
  nameMW: string;
}

export interface IAlbumTrack {
  idMW: string;
  nameMW: string;
  yearAlbum: string;
  prestige: number;
  search_string: string;
  duration: number;
  artists: string;
  idMQord: number;
  itemName: string;
  composer: string;
  performers: string;
  durationTrack: number;
  idMC: string;
  idMCord: number;
  idMQ: string;
  nameMQ: string;
  labelName: string;
  labelCat: string;
  deezerLink: string;
  numDisc: number;
  idComposerMN: string;
  idDeezerTrack?: number;
  lastUpdated: Date;
  cover_big: string;
  cover_xl: string;
}

export interface IKlassikRank {
  workName: string;
  workItemOrder: number;
  workItemName: string;
  workComposerName: string;
  tracks: Array<IKlassikRankTrack>;
}

export interface IKlassikRankWebApi {
  workName: string;
  workItemOrder: number;
  workItemName: string;
  workComposerName: string;
  tracks: Array<IKlassikRankTrackWebApi>;
}

export interface IKlassikRankTrack {
  idAlbum: number;
  albumName: string;
  coverBig: string;
  duration: string;
  idTrack: number;
  mainArtists: Array<string>;
}

export interface IKlassikRankTrackWebApi {
  idAlbum: number;
  albumName: string;
  coverBig: string;
  duration: number;
  idTrack: number;
  mainArtists: Array<string>;
}

export interface IAlbum {
  idAlbum: number;
  idMW: string;
  idDeezer: number;
  nameMW: string;
  urlCover: string;
  urlCoverDZ: string;
  scoreImageCompare: number;
  nameMN: string;
  prestige: number;
  label: string;
  nb_works: number;
  releaseDate: Date;
  composers: string;
  // mainArtist: string;
}

export interface IPlayListTrack {
  idPlayList: string;
  idAlbum: number;
  idTrack: number;
  idTrackOrd: number;
  idMW: string;
  idDeezer: number;
  nameMW: string;
  urlCover: string;
  nameMN: string;
  prestige: number;
  label: string;
  nb_wworks: number;
  releaseDate: Date;
  composers: string;
  // mainArtist: string;
}

export interface IAlbumComposer {
  idMW: string;
  idComposerMN: string;
  composerName: string;
  ranking?: number;
}

export interface IAlbumInfo {
  IdMW: string;
  nameMW: string;
  yearAlbum: string;
  prestige?: number;
  search_string: string;
  duration?: number;
  artists: string;
  idMQord: number;
  itemName: string;
  composer: string;
  performers: string;
  durationTrack?: number;
  idMQ: string;
  nameMQ: string;
  labelName: string;
  labelCat: string;
  performanceMQ: Array<IPerformanceMQ>;
}

/*
export interface IAlbumTrack {
  IdTrack: number;
  IdMC: string;
  IdMCOrd: number;
  NameTrack: string;
  NameComposer: string;
  NameMQ: string;
  Credits: Array<ICredit>;
}
*/

export interface IPerformanceMQ {
  idMQ: string;
  nameMQ: string;
  idMW: string;
  labelName: string;
  labelCat: string;
  idMC: string;
  urlSource: string;
  performanceMQitems: Array<IPerformanceMQItem>;
  performanceMQcredits: Array<IPerformanceMQCredit>;
}

export interface IPerformanceMQItem {
  idMQ: string;
  idMQord: number;
  itemName: string;
  composer: string;
  performers: string;
  duration?: number;
  idMC: string;
  idMCord: number;
  idDeezerTrack: number;
}

export interface IPerformanceMQCredit {
  idMQ: string;
  idMQord: number;
  credit: ICredit;
}

export interface ICredit {
  idCredit: number;
  nameCredit: string;
  isMusical: boolean;
  urlImage: string;
  idPperformerTip: number;
}

export interface ICreditLink {
  idMN: string;
  nameMN: string;
  creditTip: string;
  creditValue: string;
}

export class TDeezerTrack {
  idDeezerTrack: number;
  idDeezer: number;
  readable: boolean;
  workName: string;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  artist: IDeezerArtist;
  type: string;
  isrc: string;
  credits: string;
  composerName: string;
  idWork: number;
  numPart: number;
  labelName: string;
}

export interface IDeezerArtist {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

export interface ITrackArtist {
  id: string;
  name: string;
}

export interface ITrackAlbum {
  idTrack: number;
  nameTrack: string;
  trackObra: string;
  trackComposer: string;
}

export interface ITrackTrack {
  id: string;
  duration: string;
  title: string;
  artist: ITrackArtist;
  album: ITrackAlbum;
}

export interface ITrackRoot {
  index: number;
  track: ITrackTrack;
}

export interface ITracksView {
  composerName: string;
  composerRanking: number;
  nameWork: string;
  workGenre: string;
  workType: string;
  featured: string;
  idTrack_DZ: number;
  idAlbum_DZ: number;
  name: string;
  duration: number;
  idMC: string;
  idMC_ord: number;
  idrack_DZ_ord: number;
  description: string;
  descriptionAuthor: string;
  trackFavorit?: number;
  idComposerMN: string;
}

export interface IWorksView {
  composerName: string;
  composerId: string;
  nameWork: string;
  workGenre: string;
  workType: string;
  featured: string;
  idMC: string;
  idMC_ord: number;
  description: string;
  descriptionAuthor: string;
  tracks: Array<ITrackView>;
}

export interface ITrackView {
  idTrack_DZ: number;
  idAlbum_DZ: number;
  name: string;
  duration: number;
  idrack_DZ_ord: number;
}

class RandomStore {
  constructor(composerStore: ComposersStore) {
    makeAutoObservable(this);
    const that = this;
    DZ.Event.subscribe("player_play", () => {
      that.playerIsPlaying = true;
    });

    DZ.Event.subscribe("player_paused", () => {
      that.playerIsPlaying = false;
    });
    /*
    let down: boolean = false;
    window.addEventListener(
      "keyup",
      (event: any) => {
        down = false;
      },
      false
    );
*/
    /*
        window.addEventListener(
          "keydown",
          (event) => {
            const fer = function (callback: Function) {
              if (!down) {
                down = true;
                event.stopPropagation();
                event.preventDefault();
                callback();
              }
            };
            if (routerStore?.activeRouterPath.endsWith("tracks")) {
              debugger;
              if (event.key === "ArrowRight") {
                fer(() => that.goNext());
              }
              if (event.key === "ArrowLeft") {
                fer(() => that.goPrevious());
              }
              if (event.key === "ArrowDown") {
                fer(() => that.playerNext());
              }
              if (event.key === "ArrowUp") {
                fer(() => that.playerPrev());
              }
            } else if (routerStore?.activeRouterPath.endsWith("/random")) {
              if (event.key === "ArrowRight" || event.key === 37) {
                fer(() => that.getRandomTrack());
              }
            }
          },
          false
        );
    */

    DZ.Event.subscribe("current_track", (track: ITrackRoot, evt_name: any) => {
      this.trackIdIsPlaying = Number(track.track.id);
    });

    /*
    DZ.Event.subscribe("track_end", (track: ITrackRoot, evt_name) => {
      if (routerStore?.activeRouterPath.endsWith("/random")) {
        this.getRandomTrack();
      }
    });
*/

    DZ.Event.subscribe(
      "player_position",
      (position: Array<number>, evt_name: any) => {
        this.activeTrackPosition = position[0];
        this.activeTrackDuration = position[1];
      }
    );

    reaction(
      () => composerStore.composerAct,
      (c) => {
        this.composerAct = c;
      }
    );
  }

  composerAct: IComposer;

  reportError = () => {
    const URL_LOG_ERRORS = HOST_WEB_API + "/Log_errors";
    axios.post(URL_LOG_ERRORS, {
      idType: "tr",
      value: this.responseRandomTrack.IdTrack,
    });
  };

  composerStore: ComposersStore;

  setActiveNivell = (nivell: number) => {
    this.activeNivell = nivell;
  };
  activeNivell: number = 1;

  activeTrackPosition: number = 0;

  activeTrackDuration: number = 0;

  getRandomTrack(rankComposer: number, lastIdTrack) {
    if (!this.isRandomBlind) {
      this.fnGetRandomTrack(rankComposer, lastIdTrack);
    } else {
      this.isRandomBlind = false;
      setTimeout(() => {
        this.isRandomBlind = true;
        this.fnGetRandomTrack(rankComposer, lastIdTrack);
      }, 5000);
    }
  }

  getRandomTrackByWork() {
    const URL_RANDOM_TRACK =
      HOST_WEB_API +
      "/RandomTrackByWork?idWork=" +
      this.lastIdWork +
      "&lastIdTrack=" +
      this.lastIdTrack;
    debugger;
    if (this.source) {
      this.source.cancel();
    }
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    const that = this;
    axios.get<IResponseRandom>(URL_RANDOM_TRACK).then((resp) => {
      that.responseRandomTrack = resp.data;
      //that.activeAlbum = that.responseAlbumsTracks.Album;
      //this.playTrack(this.responseRandomTrack?.IdTrack);
    });
  }

  composRandomFets: Array<string> = [];

  worksRandomFets: Array<string> = [];

  lastIdTrack: number;
  lastIdWork: number;
  lastIdWorkOrd: number;

  private fnGetRandomTrack(rankComposer: number, lastIdTrack: number) {
    debugger;
    const URL_RANDOM_TRACK =
      HOST_WEB_API +
      "/RandomTrack?idNivell=" +
      this.activeNivell +
      "&rankCompositor=" +
      (rankComposer || -1) +
      "&lastIdTrack=" +
      (lastIdTrack || -1);

    if (this.source) {
      this.source.cancel();
    }
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    const that = this;
    axios.get<IResponseRandom>(URL_RANDOM_TRACK).then((resp) => {
      that.responseRandomTrack = resp.data;
      that.lastIdTrack = resp.data.IdTrack;
      that.lastIdWork = resp.data.IdWork;
      that.lastIdWorkOrd = resp.data.IdWorkOrd;
      //that.activeAlbum = that.responseAlbumsTracks.Album;
      //this.playTrack(this.responseRandomTrack?.IdTrack);
    });
  }
  responseAlbumsTracks: IResponseAlbumTracksRoot | undefined;

  responseRandomTrack: IResponseRandom;

  isRandomBlind: boolean = false;

  trackIdIsPlaying: number;

  source: CancelTokenSource | undefined;

  playerIsPlaying: Boolean = false;

  playTrack(track: number | undefined) {
    DZ.player.pause();
    DZ.player.playTracks([track], 0);
    // alert(track);
    // this.tracks = tracks;
  }
}

export default RandomStore;
