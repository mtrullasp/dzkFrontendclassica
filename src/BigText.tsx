import React from "react";
import { Typography } from "@mui/material";

export interface BigTextProperties {
  text: string;
  size?: number;
  style?: React.CSSProperties;
  onclick?: (e: any) => void;
  className?: string;
}
const BigText = (props: BigTextProperties) => {
  return (
    <Typography
      className={props.className || ""}
      onClick={props.onclick || undefined}
      variant={"h4"}
      style={{
        fontFamily: "Roboto",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: !!props.size ? 60 : props.size,
        ...props.style,
      }}
    >
      {props.text}
    </Typography>
  );
};

export default BigText;
