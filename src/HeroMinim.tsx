import React from "react";
import { LayoutContainer } from "./layout/LayoutSantGrial";

export const burdeos = "#800040";
export const sienna = "#c58a3e";

const d = (color: string) => {
  return (
    <div style={{ backgroundColor: color, width: "100%", height: "auto" }}>
      {color}
    </div>
  );
};

const HeroMinim = () => {
  return (
    <LayoutContainer
      headerContent={d("blue")}
      clientContent={d("white")}
      leftNavBarContent={d("pink")}
      rightLinkBarContent={d("red")}
      footerContent={d("black")}
    />
  );
};

export default HeroMinim;
