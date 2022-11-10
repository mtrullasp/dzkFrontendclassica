import React from "react";
import { useNavigate } from "react-router-dom";
// import ComposersStore, { getNomCognoms } from "./stores/ComposersStore";
import ImageComposerOne from "./ImageComposerOne";
// import SearchIcon from "@mui/icons-material/Search";
import { LayoutContainer } from "./layout/LayoutSantGrial";
import { Typography, Grid } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IComposer } from "./interfaces";
import ImageBase64 from "./ImageBase64";
import {
  logoCatMusic,
  logoGenCat,
  logoPoweredDeezer,
  parters,
  partnersSo,
} from "./stores/ImagesStore";
//import { debounce, throttle } from "lodash";
import "./artists.scss";
//import BigText from "./BigText";
// import { Input, Input as InputSearch } from "@sajari/react-search-ui";
// import MenuButton from "./MenuButton";
import { useComposerstore } from "./index";
import { Observer } from "mobx-react-lite";
//import Login from "./Login";
import MenuButtonGroup, { IMenuItem } from "./MenuButtonGroup";
//import { text } from "stream/consumers";
//import { Search } from "@mui/icons-material";
//import MenuComposerOrPerformers from "./MenuComposerOrPerformers";
import { MainHeader } from "./App";
import ComposersStore from "./stores/ComposersStore";
//import MyObserver from "./components/MyObserver";
// import Login from "./Login";

export const burdeos = "#800040";
export const sienna = "#c58a3e";

const imgStyle: React.CSSProperties = {
  opacity: 0.32,
  height: "45vw",
  position: "relative",
  top: 50,
  cursor: "pointer",
};

const getRandom = (store: ComposersStore): IComposer => {
  return store.getRandomComposer(200);
};

const Hero = () => {
  const store = useComposerstore();
  return (
    <Observer>
      {() => (
        <LayoutContainer
          headerContent={
            <MainHeader
              showHome={false}
              showBack={false}
              showNextPrevious={false}
            />
          }
          clientContent={<HeroContent />}
          leftNavBarContent={<HeroMenuLeft />}
          rightLinkBarContent={<HeroRigth />}
          footerContent={<HeroFooter />}
        />
      )}
    </Observer>
  );
};

const HeroFooter = () => {
  const store = useComposerstore();
  store.composerAct = getRandom(store);
  /*alert(store.composerAct.Nom);*/
  return (
    <Grid
      container
      spacing={0}
      onClick={() => {
        store.composerAct = getRandom(store);
      }}
    >
      <Grid
        container
        style={{
          position: "absolute",
          bottom: 0,
          left: 50,
          width: "50%",
        }}
        spacing={0}
      >
        {parters.map((p) => {
          return (
            <Grid item lg={1}>
              <ImageBase64
                base64Content={p}
                width={35}
                maxWidth={35}
              ></ImageBase64>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          width: "50%",
        }}
        spacing={0}
      >
        <Grid item lg={6}></Grid>
        {partnersSo.map((p, i) => {
          let width = 80;
          if (i === 1) {
            width = 30;
          }
          return (
            <Grid item lg={2} alignItems={"center"}>
              <ImageBase64
                base64Content={p}
                width={35}
                maxWidth={35}
              ></ImageBase64>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

const HeroMenuLeft = () => {
  const store = useComposerstore();
  const navigate = useNavigate();
  const menuItems: IMenuItem[] = [
    {
      mainText: "Enciclopèdia de Música Clàssica\n",
      subText: "compositors, intèrprets, instruments...",
      onClick: () => {
        navigate("/MenuComposerOrPerformers");
      },
    },
    {
      mainText: "Escoltar Música Aleatòria",
      subText: "Emissores de Radio. Ràdio Virtual",
      onClick: () => {
        navigate("/RandomTrack");
      },
    },
    {
      mainText: "Gaming de Música Clàssica",
      subText: "Blindtest i altres",
      onClick: () => {
        navigate("/RandomTrack");
      },
    },
    {
      mainText: "Creació de continguts",
      subText: "Playlists, classes, conferències...",
      onClick: () => {
        navigate("/RandomTrack");
      },
    },
  ];
  return (
    <Grid item lg={4}>
      <Grid item lg={12}>
        <Typography
          style={{ position: "fixed", top: 0 }}
          marginLeft={5}
          fontSize={150}
          align={"left"}
          variant="h1"
          fontWeight={400}
          top={0}
          onClick={() => {
            navigate("/Composers");
          }}
        >
          <span style={{ color: burdeos }}>Clàssica</span>
          <small
            style={{ fontSize: 22, position: "relative", top: 20, right: 40 }}
          >
            v. 3.0
          </small>
        </Typography>
      </Grid>
      <Grid
        container
        style={{ position: "fixed", top: 250, left: 50, width: 400 }}
      >
        <MenuButtonGroup size={16} vertical items={menuItems} border={true} />
      </Grid>
    </Grid>
  );
};

const HeroRigth = () => {
  const store = useComposerstore();
  return null;
};
const HeroContent = () => {
  const store = useComposerstore();
  store.composerAct = getRandom(store);
  debugger;
  return (
    <Observer>
      {() => (
        <Grid
          item
          lg={4}
          style={{ zIndex: 1000 }}
          onClick={() => {
            store.composerAct = getRandom(store);
          }}
        >
          <Grid
            container
            style={{ top: -80, position: "relative", marginLeft: 150 }}
          >
            <Grid item lg={12}>
              <ImageComposerOne
                base64={store.composerAct?.PictureHeaderBioBase64}
                imgStyle={imgStyle}
              />
              <Typography
                style={{
                  position: "relative",
                  left: 350,
                  color: burdeos,
                  top: -300,
                }}
                variant={"h5"}
              >
                <b>
                  <big>{store.composerAct?.Nom}</big>
                </b>
                <br />
                <small>
                  {store.composerAct?.AnyoNeix} - {store.composerAct?.AnyoDefu}
                </small>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Observer>
  );
};

export default Hero;
