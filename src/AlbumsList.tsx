import React from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import ImageBase64 from "./ImageBase64";
import AlbumsStore, { IAlbum } from "./AlbumsStore";
import { Observer } from "mobx-react";
import { Route, useNavigate } from "react-router-dom";
import AlbumOne from "./AlbumOne";
import ComposersStore from "./stores/ComposersStore";
import { useComposerstore } from "./index";

export interface IAlbumsListProps {
  workName: string;
  albums: IAlbum[];
}

const AlbumsList = (props: IAlbumsListProps) => {
  console.log("const AlbumsList = (props: IAlbumsListProps) => {");
  const navigate = useNavigate();
  const store = useComposerstore();
  return (
    <Observer>
      {() => {
        return (
          <div>
            <Typography variant={"h4"} align="left">
              {props.workName} . {props.albums.length}
            </Typography>
            <ImageList
              style={{ overflowY: "hidden", height: "100%" }}
              variant={"quilted"}
              sx={{ width: "auto" }}
              cols={5}
            >
              {props.albums.map((a: IAlbum) => {
                return (
                  <ImageListItem
                    key={a.nameMW}
                    onClick={() => {
                      store.setActiveAlbum(a);
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
          </div>
        );
      }}
    </Observer>
  );
};

export default AlbumsList;
