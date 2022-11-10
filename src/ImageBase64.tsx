import React from "react";

export interface IImageBase64Props {
  maxWidth: number;
  base64Content: string;
  width: number | string;
  format?: string;
}

const ImageBase64 = (props: IImageBase64Props) => {
  return (
    <img
      src={"data:image/" + props.format + ";base64," + props.base64Content}
      loading={"lazy"}
      width={props.width}
      style={{ width: props.maxWidth }}
      className={"image-composer-list"}
    />
  );
};

export default ImageBase64;
