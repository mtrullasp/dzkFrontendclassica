import React, { Fragment, useEffect, useState } from "react";
import RandomStore from "./stores/RandomStore";
import { Observer } from "mobx-react";
import { Button, Grid, Typography } from "@mui/material";
// import MusicPlayer from "./MusicPlayer";

import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebPlayer, { SpotifyDevice } from "react-spotify-web-playback";
import MenuButton from "./MenuButton";
import EspaiVertical from "./EspaiVertical";
import { useParams } from "react-router-dom";
import { useComposerstore } from "./index";
import HyperText from "./HyperText";
import parse from "html-react-parser";

const RandomTrack = () => {
  const [token, setToken] = useState("");
  const cStore = useComposerstore();
  const randomStore = new RandomStore(cStore);

  const { rankComposer: number } = useParams();

  /*
    useEffect(() => {
    });
  */

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "MediaTrackNext") {
      randomStore.getRandomTrack(Number(rankComposer), -1);
    }
    if (event.key === "ArrowRight") {
      randomStore.getRandomTrack(Number(rankComposer), -1);
    }
    if (event.key === "ArrowUp") {
      debugger;
      randomStore.getRandomTrack(Number(rankComposer), randomStore.lastIdTrack);
    }
    // setKeyPressed(event.key);
  };

  function createMarkup() {
    return { __html: randomStore.responseRandomTrack?.FragmentName };
  }

  window.addEventListener("keydown", handleKeyDown);

  //return () => window.removeEventListener("keydown", handleKeyDown);
  //}, []);

  const { rankComposer } = useParams();
  randomStore.getRandomTrack(Number(rankComposer), -1);

  return (
    <Observer>
      {() => {
        return (
          <>
            {randomStore.playTrack(randomStore?.responseRandomTrack?.IdTrack)}
            <Grid container spacing={2}>
              <Grid item lg={3}>
                <MenuButton
                  text={"Nivell Bàsic"}
                  subText={"Obres conegudes de compositors coneguts"}
                  onClick={() => {
                    randomStore.setActiveNivell(0);
                    //setSelectedIndex(0);
                  }}
                  selected={randomStore.activeNivell === 0}
                />
              </Grid>
              <Grid item lg={3}>
                <MenuButton
                  text={"Nivell Intermig"}
                  subText={"Obres ja no tan conegudes"}
                  onClick={() => {
                    randomStore.setActiveNivell(1);
                  }}
                  selected={randomStore.activeNivell === 1}
                />
              </Grid>
              <Grid item lg={2}>
                <MenuButton
                  text={"Nivell Avançat"}
                  subText={"Cal haver escoltat molta música"}
                  onClick={() => {
                    randomStore.setActiveNivell(2);
                  }}
                  selected={randomStore.activeNivell === 2}
                />
              </Grid>
              <Grid item lg={2}>
                <MenuButton
                  text={"Nivell Expert"}
                  subText={"Hi ha algú que conegui tot això?"}
                  onClick={() => {
                    randomStore.setActiveNivell(3);
                  }}
                  selected={randomStore.activeNivell === 3}
                />
              </Grid>
              <Grid item lg={2}>
                <MenuButton
                  text={"Bach"}
                  subText={"Bach"}
                  onClick={() => {
                    randomStore.setActiveNivell(4);
                  }}
                  selected={randomStore.activeNivell === 4}
                />
              </Grid>
            </Grid>
            <EspaiVertical size={2} />
            <Grid container spacing={4}>
              <Grid item lg={5} spacing={2}>
                <img
                  src={randomStore.responseRandomTrack?.AlbumImageUrl}
                  width="100%"
                />
              </Grid>
              <Grid item lg={7}>
                <Grid container style={{ textAlign: "left" }}>
                  {/*
                  <Grid lg={12}>
                    <Typography variant={"h2"} style={{ fontWeight: "bolder" }}>
                      {randomStore.responseRandomTrack?.IdTrack}
                    </Typography>
                  </Grid>
*/}
                  <Grid lg={12}>
                    <Typography variant={"h2"} style={{ fontWeight: "bolder" }}>
                      {randomStore.responseRandomTrack?.ComposerNom}
                    </Typography>
                  </Grid>
                  <Grid lg={12}>
                    <Typography variant={"h3"}>
                      {randomStore.responseRandomTrack?.NumVersions}
                    </Typography>
                  </Grid>
                  <Grid lg={12}>
                    <Typography variant={"h3"}>
                      {randomStore.responseRandomTrack?.ObraName}
                    </Typography>
                  </Grid>
                  <Grid lg={12}>
                    <Typography
                      variant={"h4"}
                      dangerouslySetInnerHTML={createMarkup()}
                    ></Typography>
                  </Grid>
                  <Grid
                    lg={12}
                    style={{
                      position: "fixed",
                      bottom: 150,
                      width: "100%",
                      fontSize: 16,
                    }}
                  >
                    <p>
                      <HyperText
                        onLink={(
                          href: string,
                          e: React.MouseEvent<HTMLElement>
                        ) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        text={
                          <div
                            style={{
                              marginRight: 50,
                              marginTop: -5,
                              fontSize: 18,
                              textAlign: "left",
                            }}
                          >
                            {parse(
                              randomStore.responseRandomTrack?.Artists + ""
                            )}
                          </div>
                        }
                      />
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/*
            <Grid container>
              <Grid item lg={12}>
                <SpotifyWebPlayer
                  // ...
                  styles={{
                    activeColor: "#fff",
                    bgColor: "#333",
                    color: "#fff",
                    loaderColor: "#fff",
                    sliderColor: "#1cb954",
                    trackArtistColor: "#ccc",
                    trackNameColor: "#fff",
                  }}
                  token={token}
                  uris={[randomStore.responseRandomTrack?.UriTrack]}
                  initialVolume={0.9}
                  autoPlay
                  persistDeviceSelection
                  magnifySliderOnHover
                />
              </Grid>
            </Grid>
*/}
          </>
        );
      }}
    </Observer>
  );
};

export default RandomTrack;
