import React, { useState } from "react";
import { usePerformersStore } from "../../index";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { Observer } from "mobx-react-lite";
import { LayoutContainer } from "../../layout/LayoutSantGrial";
import { MainHeader } from "../../App";
import { useNavigate } from "react-router-dom";

const PerformersIntern = () => {
  const store = usePerformersStore();
  const [idHover, setIdHover] = useState(-1);
  const navigate = useNavigate();
  return (
    <Observer>
      {() => (
        <div style={{ margin: 5 }}>
          <Typography variant={"h4"} align={"left"} fontWeight={"bold"}>
            {store.activeRol?.name}
          </Typography>
          <ImageList variant={"quilted"} cols={5} rowHeight={300}>
            {store?.performers?.map((p) => {
              return (
                <ImageListItem
                  key={p.imatgeUrl}
                  onClick={() => {
                    store.setActivePerformerById(p.id);
                    navigate("/Performer/" + p.id + "/Albums");
                  }}
                >
                  <img src={p.imatgeUrl} loading={"lazy"} />
                  <ImageListItemBar title={p.name} subtitle={p.quantsAlbums} />
                </ImageListItem>
              );
            })}
          </ImageList>
        </div>
      )}
    </Observer>
  );
};

const Performers = () => {
  const store = usePerformersStore();
  return (
    <LayoutContainer
      headerContent={
        <MainHeader showHome={true} showBack={true} showNextPrevious={true} />
      }
      clientContent={<PerformersIntern />}
      footerContent={<div />}
      rightLinkBarContent={<div />}
      leftNavBarContent={<div />}
    />
  );
};

export default Performers;
