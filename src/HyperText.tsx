import * as React from "react";
import { CSSProperties } from "react";
import "./artists.scss";
import { getCodeFromHRef } from "./stores/ComposersStore";
import { useNavigate } from "react-router-dom";

interface IProps {
  text: JSX.Element;
  onLink: (href: string, e: React.MouseEvent<HTMLElement>) => void;
  style?: CSSProperties;
}
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
        let href = e.target["href"];
        if (!!href) {
          // props.onLink(href, e);
        } else {
          href = e.target.parentElement["href"];
          navigate("/ComposerOneTemplate/" + getCodeFromHRef(href));
          // props.onLink(href, e);
        }
      }}
    >
      {props.text}
    </div>
  );
};

export default HyperText;
