import { makeAutoObservable } from "mobx";
import { HOST_WEB_API, IAlbum, ITrackAlbum } from "./RandomStore";
import axios from "axios";
import albumTracks from "../components/albums/AlbumTracks";

interface IResponseTrack {
  idTrack: number;
  urlTrack: string;
  nameTrack: string;
  durationTrack: number;
  trackOrd: number;
  trackObra: string;
  trackComposer: string;
}
interface IResponseAlbum {
  AlbumNom: String;
  AlbumUrlImage: String;
  tracks: IResponseTrack[];
}

export default class AlbumTracksStore {
  constructor() {
    makeAutoObservable(this);
  }

  activeAlbum: IResponseAlbum = null;

  activeAlbumTrack: IResponseTrack = null;

  activeIdTrack: number;
  getActiveIdTrack = () => {
    return this.activeIdTrack;
  };

  setActiveIdTrack = (idTrack: number) => {
    this.activeIdTrack = idTrack;
    this.activeAlbumTrack = this.activeAlbum.tracks.find(
      (track) => track.idTrack === idTrack
    );
  };

  getAlbum = (idAlbum: number) => {
    const url = HOST_WEB_API + "/Tracks?idAlbum=" + idAlbum;
    axios.get<IResponseAlbum>(url).then((r) => {
      this.activeAlbum = r.data;
    });
  };
}
