import React from "react";

export interface ImageComposerOneProps {
  base64: string | undefined;
  imgStyle: React.CSSProperties;
  onClick?: () => void;
}

const ImageComposerOne = (props: ImageComposerOneProps) => {
  return (
    <img
      tabIndex={-1}
      unselectable="on"
      className={"noselect"}
      onClick={props.onClick}
      src={"data:image/jpg;base64, " + props?.base64}
      style={{
        userSelect: "none",
        zIndex: -10,
        pointerEvents: "none",
        ...props.imgStyle,
      }}
    />
  );
};

export default ImageComposerOne;
