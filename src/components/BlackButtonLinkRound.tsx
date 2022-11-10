import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IBlackButtonLinkRoundProps {
  text: string;
  href: string;
}
const BlackButtonLinkRound = (props: IBlackButtonLinkRoundProps) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  let style = {};
  if (isHover) {
    style = {
      cursor: "pointer",
      backgroundColor: "burdeos",
      color: "white",
      borderRadius: 40,
    };
  }
  return (
    <a
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={style}
      href={props.href}
    >
      {props.text}
    </a>
  );
};
