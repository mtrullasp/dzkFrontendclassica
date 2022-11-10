import * as React from "react";
import { CSSProperties } from "react";
import "./artists.scss";
import { useNavigate } from "react-router-dom";

interface IProps {
  text: JSX.Element;
  onLink: (href: string, e: React.MouseEvent<HTMLElement>) => void;
  style?: CSSProperties;
}

const getCodeFromHRef = (href: string): string => {
  return href.substring(href.length - 12);
};

const HyperText = (props: IProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={"hyperText"}
      style={{
        opacity: 1,
        backgroundColor: "transparent",
        ...props.style,
      }}
      onClick={(e: any) => {
        props.onLink(e.target.href, e);
      }}
    >
      {props.text}
    </div>
  );
};

export default HyperText;
