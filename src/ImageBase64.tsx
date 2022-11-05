import React from "react";

export interface IImageBase64Props {
  base64Content: string;
  width: number;
  format?: string;
}

const ImageBase64 = (props: IImageBase64Props) => {
  return (
    <img
      src={"data:image/" + props.format + ";base64," + props.base64Content}
      loading={"lazy"}
      width={props.width}
      className={"image-composer-list"}
    />
  );
};

export default ImageBase64;
