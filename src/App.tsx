import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
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
import Composers from "./Composers";
import { IComposer } from "./interfaces";
import Hero from "./Hero";
import RandomTrack from "./RandomTrack";
import ComposerOne from "./ComposerOne";
import ComposerOneWorks from "./ComposerOneWorks";
import AlbumsList from "./AlbumsList";
import AlbumsListWork from "./AlbumsListWork";
import { useComposerstore } from "./index";
import AlbumOne from "./AlbumOne";
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

export const MainHeader = () => {
  return (
    <Grid
      container
      style={{ margin: 0, padding: 0, backgroundColor: "whitesmoke" }}
    >
      <Grid item lg={8}></Grid>
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
            <ImageBase64 base64Content={logoGenCat} width={80} />
          </Box>
          <Box>
            <Typography></Typography>
            <ImageBase64 base64Content={logoCatMusic} width={70} />
          </Box>
          <Box>
            <Typography variant={"subtitle2"} fontWeight={200}>
              powered by{" "}
            </Typography>
            <ImageBase64 base64Content={logoPoweredDeezer} width={55} />
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
    <div className="App" onClick={(e) => {}}>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/Composers"
          element={
            <Composers
              store={store}
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
