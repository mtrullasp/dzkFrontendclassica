import React, { useState } from "react";
import { IComposer } from "../../interfaces";
import ImageComposerOne from "./ImageComposerOne";
import {
  Box,
  Button,
  Container,
  Drawer,
  Fab,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuButton, { MenuItemProps } from "../../MenuButton";
import {
  NavigateFunction,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useComposerstore } from "../../index";
import { Observer } from "mobx-react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import AlbumsListWork from "../../components/albums/AlbumsListWork";
import EspaiVertical from "../../EspaiVertical";
import { Header } from "grommet";
import GhostButton from "../../GhostButton";
import { LayoutContainer } from "../../layout/LayoutSantGrial";
import { INavigatorProps, MainHeader } from "../../App";
import ComposersStore from "../../stores/ComposersStore";
import { Visibility } from "@mui/icons-material";
import V from "../../components/V";

export const WIDTH: number = 160;
const MARGIN_LEFT_CONTENT: number = 15;

export interface ComposerOneProps {
  title?: string;
  content: JSX.Element;
}

const MenuButtonLittle = (props: MenuItemProps) => {
  return GhostButton({ size: 30, ...props });
};

export const Navegador = (props: INavigatorProps) => {
  const navigate = useNavigate();
  const store = useComposerstore();
  return (
    <Stack
      direction={"row"}
      style={{ position: "fixed", top: 0, left: 0 }}
      spacing={1}
    >
      <V isVisible={props.showBack}>
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon fontSize={"medium"} style={{ color: "black" }} />
        </IconButton>
      </V>
      <V isVisible={props.showHome}>
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeIcon fontSize={"medium"} style={{ color: "black" }} />
        </IconButton>
      </V>
      <V isVisible={props.showNextPrevious}>
        <React.Fragment>
          <IconButton
            onClick={() => {
              props.goPrev();
              //store.setComposerPrevious();
            }}
          >
            <ArrowBackIosNewIcon
              fontSize={"medium"}
              style={{ color: "black" }}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              props.goNext();
              //store.setComposerNext();
            }}
          >
            <ArrowForwardIosIcon
              fontSize={"medium"}
              style={{ color: "black" }}
            />
          </IconButton>
        </React.Fragment>
      </V>
    </Stack>
  );
};

const ComposerOneTemplateIntern = (props: ComposerOneProps) => {
  const store = useComposerstore();
  const { idMN } = useParams();

  const imgStyle: React.CSSProperties = {
    opacity: 0.3,
    position: "fixed",
    top: -150,
    right: -150,
    bottom: 0,
    height: "auto",
  };

  // const [composer, setComposer] = useState<IComposer>(props.composer);

  const navigate = useNavigate();

  return (
    <Container
      maxWidth={"xl"}
      style={{
        paddingRight: WIDTH + 2,
        paddingLeft: WIDTH + 2,
      }}
    >
      <Grid container>
        <Grid
          item
          lg={2}
          style={{
            position: "fixed",
            top: 20,
            left: 10,
            width: MARGIN_LEFT_CONTENT,
          }}
        ></Grid>
      </Grid>
      <ImageComposerOne
        base64={store.composerAct?.PictureHeaderBioBase64}
        imgStyle={imgStyle}
      />
      <Box
        style={{
          fontSize: 60,
          marginLeft: 10,
          textAlign: "left",
          paddingTop: 15,
          position: "fixed",
          top: 0,
        }}
      >
        {store.composerAct.Nom}
      </Box>
      <Box
        style={{
          fontSize: 30,
          textAlign: "left",
          paddingTop: 70,
          paddingLeft: 20,
        }}
      >
        {props.title}
      </Box>
      <Box style={{ paddingTop: 30, paddingLeft: 10 }}>{props.content}</Box>
      <Grid
        container
        style={{ position: "fixed", top: 120, left: 0, width: WIDTH }}
      >
        <Grid item lg={12} style={{ marginRight: 5 }}>
          <Stack>
            <MenuButton
              border={true}
              style={{ width: WIDTH, marginTop: 20, color: "black" }}
              text={"Biografia"}
              onClick={() => {
                navigate("/ComposerOne/" + idMN);
              }}
            />
            <MenuButton
              border={true}
              style={{ width: WIDTH }}
              text={"Obres"}
              onClick={() => {
                navigate("Works");
              }}
            />
            <MenuButton
              border={true}
              style={{ width: WIDTH }}
              text={"Connexions"}
              onClick={() => {
                navigate("Works");
              }}
            />
            <MenuButton
              border={true}
              text={"Random"}
              onClick={() => {
                navigate("/RandomTrack/" + store.composerAct?.ranking);
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

const ComposerOneTemplate = (props: ComposerOneProps) => {
  return (
    <LayoutContainer
      headerContent={
        <MainHeader showNextPrevious={true} showBack={true} showHome={true} />
      }
      clientContent={<ComposerOneTemplateIntern {...props} />}
      leftNavBarContent={<div />}
      rightLinkBarContent={<div />}
      footerContent={<div />}
    />
  );
};

export default ComposerOneTemplate;
