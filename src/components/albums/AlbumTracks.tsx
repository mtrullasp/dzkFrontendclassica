import React, { useState } from "react";
import { ITrackAlbum } from "../../stores/RandomStore";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ComposersStore from "../../stores/ComposersStore";
import { Observer } from "mobx-react";
import { Play } from "material-ui-player/dist/icons";
import Image from "mui-image";
import IconPlaying from "../../IconPlaying";
// import AudioCard from "./player/components/AudioCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey, green, purple } from "@mui/material/colors";
import { MARGIN_LEFT } from "../../util/constants";
import { WIDTH } from "../../pages/composer/ComposerOneTemplate";
import { IAlbum } from "./AlbumsStore";
import AlbumTracksStore from "../../stores/AlbumTracksStore";
import { useAlbumsStore } from "../../index";
// import * from "deezer-sdk";

export interface IAlbumTracksProps {
  idAlbum: number;
}

const AlbumTracks = (props: IAlbumTracksProps) => {
  let lastComposer: string = "";
  let lastObra: string = "";
  const store = new AlbumTracksStore();
  store.getAlbum(props.idAlbum);

  const getCurrentTrack = (): number => {
    return store.getActiveIdTrack();
  };

  return (
    <Observer>
      {() => (
        <>
          <Grid container>
            {
              <Grid item lg={4}>
                <Image
                  src={store.activeAlbum?.AlbumUrlImage}
                  style={{
                    width: "100%",
                    height: "auto",
                    top: 0,
                    position: "sticky",
                    alignSelf: "flex-start",
                  }}
                />
              </Grid>
            }
            <Grid item lg={8}>
              <List>
                {store?.activeAlbum?.tracks.map((t: ITrackAlbum) => {
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
                          debugger;
                          if (
                            DZ.player.isPlaying() &&
                            getCurrentTrack() === t.idTrack
                          ) {
                            DZ.player.pause();
                            DZ.player.seek(0);
                            store.setActiveIdTrack(-1);
                          } else {
                            store.setActiveIdTrack(t.idTrack);
                            DZ.player.playTracks([
                              store.getActiveIdTrack().toString(),
                            ]);
                            DZ.player.play();
                          }
                        }}
                      >
                        {store.getActiveIdTrack() !== t.idTrack && (
                          <div
                            style={{ display: "inline" }}
                            /*
                            onClick={() => {
                              store.setActiveIdTrack(t.idTrack);
                            }}
*/
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
                        {store?.activeAlbumTrack?.idTrack === t.idTrack && (
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
                <PlayBar />
              </div>
            </ThemeProvider>
          </Grid>
        </>
      )}
    </Observer>
  );
};

export interface IPlayBarProps {
  store?: ComposersStore;
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
