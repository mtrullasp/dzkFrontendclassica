import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ErrorBoundary } from "react-error-boundary";
import {
  Box,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Composers from "./pages/composer/Composers";
import { IComposer } from "./interfaces";
import Hero from "./Hero";
import RandomTrack from "./RandomTrack";
import ComposerOne from "./pages/composer/ComposerOne";
import ComposerOneWorks from "./pages/composer/ComposerOneWorks";
import AlbumsList from "./components/albums/AlbumsList";
import AlbumsListWork from "./components/albums/AlbumsListWork";
import { useComposerstore } from "./index";
import AlbumOne from "./components/albums/AlbumOne";
import Login from "./Login";
import { Spotify } from "grommet-icons";
import $ from "jquery";
import MenuComposerOrPerformers from "./MenuComposerOrPerformers";
import ImageBase64 from "./ImageBase64";
import {
  logoCatMusic,
  logoGenCat,
  logoPoweredDeezer,
} from "./stores/ImagesStore";
import SearchIcon from "@mui/icons-material/Search";
import { Navegador } from "./pages/composer/ComposerOneTemplate";
import Performers from "./pages/performer/Performers";
import Rols from "./pages/performer/Rols";
import AlbumsListPerformer from "./components/albums/AlbumsListPerformer";
import PerformerOne from "./pages/performer/PerformerOne";

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export interface INavigatorProps {
  showHome: boolean;
  showBack: boolean;
  showNextPrevious: boolean;
  goNext?: () => void;
  goPrev?: () => void;
}

export const MainHeader = (props: INavigatorProps) => {
  return (
    <Grid
      container
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "whitesmoke",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <Grid item lg={2}>
        <Navegador {...props} />
      </Grid>
      <Grid item lg={6}></Grid>
      {/*
      <Grid item lg={4}>
        <div
          style={{
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            type={"search"}
            size={"small"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Grid>
*/}
      <Grid item lg={4}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={5}
          justifyContent={"flex-end"}
          marginRight={2}
        >
          <Box
            style={{
              pointerEvents: "none",
            }}
          >
            <Typography></Typography>
            <ImageBase64 base64Content={logoGenCat} width={80} maxWidth={80} />
          </Box>
          <Box>
            <Typography></Typography>
            <ImageBase64
              base64Content={logoCatMusic}
              width={70}
              maxWidth={70}
            />
          </Box>
          <Box>
            <Typography variant={"subtitle2"} fontWeight={200}>
              powered by{" "}
            </Typography>
            <ImageBase64
              base64Content={logoPoweredDeezer}
              width={55}
              maxWidth={55}
            />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

const App = () => {
  const store = useComposerstore();
  const navigate = useNavigate();

  return (
    /*
    <ErrorBoundary
      fallbackRender={(e) => {
        debugger;
        return (
          <>
            <div>{e.error.message}</div>
            <div>{e.error.stack}</div>
          </>
        );
      }}
    >
*/
    <div className="App" onClick={(e) => {}}>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Rols" element={<Rols />} />
        <Route path="/Performers/:idRol" element={<Performers />} />
        <Route
          path="/Composers"
          element={
            <Composers
              onSelectComposer={(c) => {
                store.composerAct = c;
                navigate("/ComposerOne/" + c?.idMN);
              }}
            />
          }
        />
        <Route path="/ComposerOne/:idMN" element={<ComposerOne />}></Route>
        <Route
          path="/ComposerOne/:idMN/Works/:idMC/Albums"
          element={<AlbumsListWork />}
        />
        <Route
          path="/ComposerOne/:idMN/Works"
          element={<ComposerOneWorks />}
        ></Route>
        <Route path="/Performer/:id/Albums" element={<AlbumsListPerformer />} />
        <Route path="/Album/:idAlbum" element={<AlbumOne />} />
        <Route path="/RandomTrack" element={<RandomTrack />} />
        <Route path="/RandomTrack/:rankComposer" element={<RandomTrack />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/MenuComposerOrPerformers"
          element={<MenuComposerOrPerformers />}
        />
      </Routes>
    </div>
  );
};

setTimeout(() => {
  $(document).ready(function () {
    $("div").focusin((e) => {
      e.preventDefault();
    });
  });
}, 2000);

export default App;
