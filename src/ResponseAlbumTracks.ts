import {
  IAlbum,
  IAlbumCredit,
  ITracksView,
  IWorksView,
} from "./stores/RandomStore";
import "https://sdk.scdn.co/spotify-player.js";

export interface ArtistMN {
  work: any[];
  idMN: string;
  nameMN: string;
  urlSource: string;
  ranking: number;
  urlImage: string;
  biographpy?: any;
  beginDate: Date;
  genre: string;
  lastUpdated: Date;
}

export interface Work {
  albumWorks: any[];
  artistMN: ArtistMN;
  idWork: string;
  nameWork: string;
  idComposerMN: string;
  composedDate: string;
  urlSource: string;
  workGenre: string;
  workType: string;
  description: string;
  descriptionAuthor: string;
  featured: string;
  performancesCount: number;
  atAgeOf: string;
}

export interface Track {
  idTrack: number;
  readable: string;
  title: string;
  title_short: string;
  title_version: string;
  isrc: string;
  link: string;
  share: string;
  duration: number;
  track_position: number;
  disk_number: number;
  rank: number;
  release_date: string;
  explicit_lyrics: string;
  preview: string;
  bpm: number;
  gain: number;
  type: string;
  idArtist: number;
  idAlbum: number;
  idWork: string;
  prestige: number;
  valoration?: any;
  idWorkOrd: number;
  numTrack: number;
  idDeezerTrack: number;
  idComposerMN: string;
}

export interface AlbumWork {
  album?: IAlbum;
  work: Work;
  track: Array<Track>;
  idAlbum_DZ: number;
  idWork_AM: string;
  nb_tracks: number;
  wholeWork: boolean;
  idWork_AM_ord: number;
}

export interface IResponseAlbumTracksRoot {
  // Tracks: Array<ITracksView>;
  // AlbumWorks: Array<AlbumWork>;
  AlbumWorks: Array<ITracksView>;
  AlbumWorksGrouped: Array<IWorksView>;
  AlbumCredits: Array<IAlbumCredit>;
  Album: any;
  Track: Track;
  ActiveIdTrack: number;
}

export interface IResponseTrack {
  TrackNom: string;
  IdTrack: number;
  IdWork: number;
  AlbumNom: string;
  AlbumUrlmage: string;
  AlbumUrlLink: string;
  ComposerNom: string;
  ObraNom: string;
  Credits: ICredit[];
  CompareDuration: string;
}

export interface IResponseRandom {
  IdTrack: number;
  IdWork: number;
  IdWorkOrd: number;
  NumVersions: number;
  ComposerNom: string;
  ObraName: string;
  FragmentName: string;
  FragmentIdTrack: number;
  AlbumImageUrl: string;
  AlbumImageBase64: string;
  TrackName: string;
  Artists: string;
}

export interface IResponseRandomSpotify {
  NomCompositor: string;
  NomObra: string;
  NomTrack: string;
  UriTrack: string;
  ImageAlbumUrl: string;
  token: string;
}

export interface ICredit {
  CreditName: string;
  CreditPersonaName: string;
}
