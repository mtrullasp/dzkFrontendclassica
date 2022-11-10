import React, { useEffect, useState } from "react";
import ComposersList, { IComponentListProps } from "./ComposersList";
import { Grid, Stack } from "@mui/material";
import MenuButton from "../../MenuButton";
import { useComposerstore } from "../../index";
import { Observer } from "mobx-react";
import { LayoutContainer } from "../../layout/LayoutSantGrial";
import { MainHeader } from "../../App";
import MenuButtonGroup, { IMenuItem } from "../../MenuButtonGroup";
import { useNavigate } from "react-router-dom";
import LeftMenuComposers from "../../LeftMenuComposers";

const ComposersIntern = (props: IComponentListProps) => {
  // let [keySelected, setKeySelected] = useState("rank_asc");
  const store = useComposerstore();
  return ComposersList(props);
};

const Composers = (props: IComponentListProps) => {
  const store = useComposerstore();
  return (
    <LayoutContainer
      headerContent={
        <MainHeader showHome={true} showBack={true} showNextPrevious={false} />
      }
      clientContent={
        <ComposersIntern onSelectComposer={props.onSelectComposer} />
      }
      leftNavBarContent={<LeftMenuComposers />}
      rightLinkBarContent={<div />}
      footerContent={<div />}
    />
  );
};

export default Composers;
