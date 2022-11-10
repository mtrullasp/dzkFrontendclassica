import { useNavigate } from "react-router-dom";
import { useComposerstore } from "./index";
import { Stack } from "@mui/material";
import MenuButton from "./MenuButton";
import React from "react";
import { Observer } from "mobx-react-lite";
import { toJS, transaction } from "mobx";

const LeftMenuComposers = () => {
  const navigate = useNavigate();
  const store = useComposerstore();
  return (
    <Observer>
      {() => (
        <Stack
          direction={"column"}
          style={{ width: 150, position: "fixed", top: 50 }}
        >
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
          <MenuButton
            key={"neix"}
            selected={store.keySelected.startsWith("neix_")}
            size={12}
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
          <MenuButton
            key={"ale"}
            selected={false}
            size={12}
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
          <MenuButton
            key={"ale"}
            selected={false}
            size={12}
            text={"Ordena aleatòriament"}
            onClick={() => {
              transaction(() => {
                store.setKeySelected("ale" + Date().toString());
                store.fOrderByComposers = toJS(store.fShuffle);
              });
            }}
          />
          <MenuButton
            size={12}
            text={"Agrupa per nacionalitat"}
            onClick={() => {}}
          />
        </Stack>
      )}
    </Observer>
  );
};

export default LeftMenuComposers;
