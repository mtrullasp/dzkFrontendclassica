import React, { useEffect, useState } from "react";
import ComposersList, { IComponentListProps } from "./ComposersList";
import { Grid } from "@mui/material";
import MenuButton from "./MenuButton";
import { useComposerstore } from "./index";
import { Observer } from "mobx-react";
import { LayoutContainer } from "./layout/LayoutSantGrial";
import { MainHeader } from "./App";

const ComposersIntern = (props: IComponentListProps) => {
  // let [keySelected, setKeySelected] = useState("rank_asc");
  const store = props.store;

  return (
    <Observer>
      {() => (
        <Grid container width={"100%"} style={{ position: "sticky" }}>
          <Grid item lg={2}>
            <MenuButton
              key="rank"
              selected={store.keySelected.startsWith("rank")}
              size={14}
              text={"Ordena per ranking"}
              onClick={() => {
                debugger;
                if (store.keySelected === "rank_asc") {
                  store.setKeySelected("rank_desc");
                } else {
                  store.setKeySelected("rank_asc");
                }

                if (store.keySelected === "rank_asc") {
                  store.fOrderByComposers = store.fOrderByRanking;
                } else {
                  store.fOrderByComposers = store.fOrderByRankingDesc;
                }
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <MenuButton
              key={"neix"}
              selected={store.keySelected.startsWith("neix_")}
              size={14}
              text={"Ordena per data de naixement"}
              onClick={() => {
                if (store.keySelected === "neix_asc") {
                  store.setKeySelected("neix_desc");
                } else {
                  store.setKeySelected("neix_asc");
                }

                if (store.keySelected.endsWith("asc")) {
                  store.fOrderByComposers = store.fOrderByDate;
                } else {
                  store.fOrderByComposers = store.fOrderByDateDesc;
                }
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <MenuButton
              key={"ale"}
              selected={false}
              size={14}
              text={"Ordena alfabèticament"}
              onClick={() => {
                if (store.keySelected === "alfabetic_asc") {
                  store.setKeySelected("alfabetic_desc");
                } else {
                  store.setKeySelected("alfabetic_asc");
                }
                //store.fOrderByComposers = store.fOrderByName;

                if (store.keySelected.endsWith("_asc")) {
                  store.fOrderByComposers = store.fOrderByName;
                } else {
                  store.fOrderByComposers = store.fOrderByNameDesc;
                }
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <MenuButton
              key={"ale"}
              selected={false}
              size={14}
              text={"Ordena aleatòriament"}
              onClick={() => {
                store.setKeySelected("ale" + Date().toString());
                store.fOrderByComposers = store.fShuffle;
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <MenuButton
              size={14}
              text={"Agrupa per nacionalitat"}
              onClick={() => {}}
            />
          </Grid>
          <Grid item lg={12}>
            <ComposersList {...props} />;
          </Grid>
        </Grid>
      )}
    </Observer>
  );
  //return ComposersList(props);
};

const Composers = (props: IComponentListProps) => {
  const store = useComposerstore();
  return (
    <LayoutContainer
      headerContent={<MainHeader />}
      clientContent={
        <ComposersIntern
          store={store}
          onSelectComposer={props.onSelectComposer}
        />
      }
      leftNavBarContent={<div />}
      rightLinkBarContent={<div />}
      footerContent={<div />}
    />
  );
};

export default Composers;
