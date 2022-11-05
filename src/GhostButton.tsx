import React from "react";
import { Button, Fab, Grid, Typography } from "@mui/material";
import "./ghostbutton.css";
import { burdeos, sienna } from "./HeroMinim";

export interface IGhostButtonProps {
  text?: string;
  subText?: string;
  onClick: () => void;
  selected?: boolean;
  size?: number;
  border?: Boolean;
  children?: JSX.Element;
  style?: React.CSSProperties;
  onclick?: () => void;
}

const GhostButton = (props: IGhostButtonProps) => {
  return (
    <Button
      className={"ghost-button"}
      style={{
        fontSize: (props.size || 14) + "!important",
        width: "100%",
        height: 70,
        color: burdeos,
        borderColor: props.border ? "lightgray" : "transparent",
        backgroundColor: props.selected ? "#e0e0e0" : "whitesmoke",
        ...props.style,
      }}
      variant={"outlined"}
      onClick={props.onClick}
    >
      <Grid container style={{ width: "100%", fontSize: props.size || 16 }}>
        {!!props.text && (
          <Grid item lg={12} style={{ marginTop: -5, color: burdeos }}>
            <p>
              <b>{props.text}</b>
            </p>
          </Grid>
        )}
        {!!props.subText && (
          <Grid
            item
            lg={12}
            style={{ display: "inline-table", fontSize: 12, color: sienna }}
          >
            <p style={{ position: "relative", top: 0, fontSize: 12 }}>
              {props.subText}
            </p>
          </Grid>
        )}
        {!!props.children && (
          <Grid item lg={12} style={{ display: "inline-table", fontSize: 12 }}>
            <p style={{ position: "relative", top: 0, fontSize: 12 }}>
              {props.children}
            </p>
          </Grid>
        )}
      </Grid>
    </Button>
  );
};

export default GhostButton;
