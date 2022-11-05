import React, { useState } from "react";
import { IComposer } from "./interfaces";
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
import parse from "html-react-parser";
import HyperText from "./HyperText";
import BigText from "./BigText";
import MenuButton, { MenuItemProps } from "./MenuButton";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useComposerstore } from "./index";
import { Observer } from "mobx-react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import AlbumsListWork from "./AlbumsListWork";
import EspaiVertical from "./EspaiVertical";
import { Header } from "grommet";
import GhostButton from "./GhostButton";
import { LayoutContainer } from "./layout/LayoutSantGrial";
import { MainHeader } from "./App";

export const WIDTH: number = 200;
const MARGIN_LEFT_CONTENT: number = 15;

export interface ComposerOneProps {
  title?: string;
  content: JSX.Element;
}

const MenuButtonLittle = (props: MenuItemProps) => {
  return GhostButton({ size: 30, ...props });
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
      style={{ paddingRight: WIDTH + 2, paddingLeft: WIDTH + 2 }}
    >
      <Stack
        direction={"row"}
        style={{ position: "fixed", top: 20, left: 0 }}
        spacing={1}
      >
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon fontSize={"large"} style={{ color: "black" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeIcon fontSize={"large"} style={{ color: "black" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            store.setComposerPrevious();
          }}
        >
          <ArrowBackIosNewIcon fontSize={"large"} style={{ color: "black" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            store.setComposerNext();
          }}
        >
          <ArrowForwardIosIcon fontSize={"large"} style={{ color: "black" }} />
        </IconButton>
      </Stack>
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
      <Box style={{ fontSize: 60, textAlign: "left", paddingTop: 15 }}>
        {store.composerAct.Nom}
      </Box>
      <Box
        style={{ fontSize: 30, textAlign: "left", paddingTop: 40 }}
        margin={0}
      >
        {props.title}
      </Box>
      <Box style={{ paddingTop: 30 }}>{props.content}</Box>
      );
      <Grid
        container
        style={{ position: "fixed", top: 120, left: 0, width: WIDTH }}
      >
        <Grid item lg={12}>
          <Stack>
            <MenuButton
              border={false}
              style={{ width: WIDTH, marginTop: 20, color: "black" }}
              text={"Biografia"}
              onClick={() => {
                navigate("/ComposerOne/" + idMN);
              }}
            />
            <MenuButton
              border={false}
              style={{ width: WIDTH }}
              text={"Obres"}
              onClick={() => {
                navigate("Works");
              }}
            />
            <MenuButton
              border={false}
              style={{ width: WIDTH }}
              text={"Connexions"}
              onClick={() => {
                navigate("Works");
              }}
            />
            <MenuButton
              border={false}
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
      headerContent={<MainHeader />}
      clientContent={<ComposerOneTemplateIntern {...props} />}
      leftNavBarContent={<div />}
      rightLinkBarContent={<div />}
      footerContent={<div />}
    />
  );
};

export default ComposerOneTemplate;
