import React from "react";
import { IComposer } from "../../interfaces";
import ImageComposerOne from "./ImageComposerOne";
import { Grid } from "@mui/material";
import parse from "html-react-parser";
import HyperText from "../../HyperText";
import BigText from "../../BigText";
import ComposerOneTemplate from "./ComposerOneTemplate";
import { useComposerstore } from "../../index";
import { Observer } from "mobx-react-lite";
import { getCodeFromHRef } from "../../stores/ComposersStore";

export interface ComposerOneProps {}

const ComposerOne = (props: ComposerOneProps) => {
  const store = useComposerstore();
  const imgStyle: React.CSSProperties = {
    opacity: 0.3,
    position: "fixed",
    top: 60,
    left: -120,
    bottom: 0,
    height: "fit-content",
  };

  const marginLeft = 400;

  return (
    <Observer>
      {() => (
        <ComposerOneTemplate
          title={"Biografia"}
          content={
            <HyperText
              onLink={(href: string, e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                e.preventDefault();
                if (!!href) {
                  const codi = getCodeFromHRef(href);
                  store.setActiveComposerByIdMN(codi);
                  //href = e.target.href;
                  //navigate("/ComposerOne/" + getCodeFromHRef(href));
                  // props.onLink(href, e);
                }
              }}
              text={
                <div
                  style={{
                    marginRight: 10,
                    marginLeft: 20,
                    marginTop: 0,
                    fontSize: 18,
                    textAlign: "left",
                  }}
                >
                  {parse(store.composerAct?.bio + "")}
                </div>
              }
            />
          }
        />
      )}
    </Observer>
  );
};

export default ComposerOne;
