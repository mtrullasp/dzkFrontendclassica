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
import ImageBase64 from "../../ImageBase64";
import { Observer } from "mobx-react-lite";
import { LayoutContainer } from "../../layout/LayoutSantGrial";
import { MainHeader } from "../../App";
import { Header } from "grommet";

const PerformersIntern = () => {
  const store = usePerformersStore();
  const [idHover, setIdHover] = useState(-1);
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
                <ImageListItem key={p.imatgeUrl}>
                  <img src={p.imatgeUrl} loading={"lazy"} />
                  <ImageListItemBar title={p.name} subtitle={p.nacionality} />
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
        <MainHeader
          showHome={true}
          showBack={true}
          showNextPrevious={true}
          goNext={store.setActiveRolNext}
          goPrev={store.setActiveRolPrev}
        />
      }
      clientContent={<PerformersIntern />}
      footerContent={<div />}
      rightLinkBarContent={<div />}
      leftNavBarContent={<div />}
    />
  );
};

export default Performers;
