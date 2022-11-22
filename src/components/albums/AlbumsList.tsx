import React from "react";
import {
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import ImageBase64 from "../../ImageBase64";
import AlbumsStore, { IAlbum } from "./AlbumsStore";
import { Observer } from "mobx-react";
import { Route, useNavigate } from "react-router-dom";
import AlbumOne from "./AlbumOne";
import ComposersStore from "../../stores/ComposersStore";
import { useComposerstore } from "../../index";
import { ITrackAlbum } from "../../stores/RandomStore";

export interface IAlbumsListProps {
  workName: string;
  albums: IAlbum[];
}

const AlbumsList = (props: IAlbumsListProps) => {
  const navigate = useNavigate();
  // const store = useComposerstore();
  return (
    <Observer>
      {() => {
        return (
          <div>
            <Typography variant={"h4"} align="left">
              {props?.workName} . {props.albums?.length}
            </Typography>
            <ImageList
              style={{ overflowY: "hidden", height: "auto" }}
              variant={"standard"}
              cols={5}
            >
              {props?.albums?.map((a: IAlbum) => {
                return (
                  <ImageListItem
                    key={a.nameMW}
                    onClick={() => {
                      navigate("/Album/" + a.idAlbum);
                    }}
                  >
                    <img src={a.urlCover} />
                    <ImageListItemBar
                      subtitle={a.albumType}
                      color={"black"}
                      style={{ opacity: "0.7", color: "black" }}
                      title={a.albumType}
                    />
                    ))
                  </ImageListItem>
                );
              })}
            </ImageList>
            <Grid style={{}}></Grid>
            <Grid style={{ width: "100%", height: "auto" }} />
          </div>
        );
      }}
    </Observer>
  );
};

export default AlbumsList;
