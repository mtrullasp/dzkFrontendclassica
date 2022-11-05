import React, { useState } from "react";
import { ITrackAlbum } from "./stores/RandomStore";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ComposersStore from "./stores/ComposersStore";
import { Observer } from "mobx-react";
import { Play } from "material-ui-player/dist/icons";
import Image from "mui-image";
import IconPlaying from "./IconPlaying";
import AudioCard from "./player/components/AudioCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey, green, purple } from "@mui/material/colors";
import { MARGIN_LEFT } from "./util/constants";
import { WIDTH } from "./ComposerOneTemplate";
// import * from "deezer-sdk";

export interface IAlbumTracksProps {
  store: ComposersStore;
  tracks: ITrackAlbum[];
}

// const DZ = window.DZ;

const AlbumTracks = (props: IAlbumTracksProps) => {
  let lastComposer: string = "";
  let lastObra: string = "";
  return (
    <Observer>
      {() => (
        <>
          <Grid container>
            <Grid item lg={4}>
              <Image
                src={props.store.activeAlbum.urlCover}
                style={{
                  width: "100%",
                  height: "auto",
                  top: 0,
                  position: "sticky",
                  alignSelf: "flex-start",
                }}
              />
            </Grid>
            <Grid item lg={8}>
              <List>
                {props.tracks.map((t: ITrackAlbum) => {
                  let response = (
                    <>
                      {t.trackComposer !== lastComposer && (
                        <ListItemButton>
                          <Typography fontWeight={"bolder"} variant={"h5"}>
                            {t.trackComposer}
                          </Typography>
                        </ListItemButton>
                      )}
                      {t.trackObra !== lastObra && (
                        <ListItemButton>
                          <Typography variant={"h5"}>{t.trackObra}</Typography>
                        </ListItemButton>
                      )}
                      <ListItemButton
                        onClick={() => {
                          props.store.setActiveTrack(t.idTrack);
                          DZ.player.playTracks([
                            props.store.activeIdTrack.toString(),
                          ]);
                        }}
                      >
                        {props.store.activeIdTrack !== t.idTrack && (
                          <div
                            style={{ display: "inline" }}
                            onClick={() => {
                              props.store.setActiveTrack(t.idTrack);
                            }}
                          >
                            <Play />
                            <Typography
                              style={{ display: "inline" }}
                              variant={"h6"}
                            >
                              {t.nameTrack}
                            </Typography>
                          </div>
                        )}
                        {props.store.activeIdTrack === t.idTrack && (
                          <div style={{ display: "inline" }}>
                            <IconPlaying />
                            <Typography
                              style={{ display: "inline" }}
                              variant={"h6"}
                            >
                              {t.nameTrack}
                            </Typography>
                          </div>
                        )}
                      </ListItemButton>
                    </>
                  );
                  lastComposer = t.trackComposer;
                  lastObra = t.trackObra;
                  return response;
                })}
              </List>
            </Grid>
            <ThemeProvider
              theme={createTheme({
                palette: {
                  primary: {
                    main: blueGrey[500],
                  },
                  secondary: {
                    main: green[500],
                  },
                },
              })}
            >
              <div
                style={{
                  position: "fixed",
                  bottom: 50,
                  height: 50,
                  right: 0,
                  left: 0,
                }}
              >
                <PlayBar store={props.store} />
              </div>
            </ThemeProvider>
          </Grid>
        </>
      )}
    </Observer>
  );
};

export interface IPlayBarProps {
  store: ComposersStore;
}
const PlayBar = (props: IPlayBarProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Observer>
      {() => (
        <Grid container style={{ overflowY: "auto" }}>
          <Grid item lg={1}>
            {isPlaying && (
              <PauseIcon
                fontSize={"large"}
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  DZ.player.pause();
                }}
              />
            )}
            {!isPlaying && (
              <PlayArrowIcon
                fontSize={"large"}
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  DZ.player.playTracks([props.store.activeIdTrack.toString()]);
                }}
              />
            )}
          </Grid>
        </Grid>
      )}
    </Observer>
  );
};

export default AlbumTracks;
