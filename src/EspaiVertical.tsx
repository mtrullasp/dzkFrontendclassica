import React, { useState } from "react";

export interface IEspaiVerticalProps {
  size: number;
}
const EspaiVertical = (props: IEspaiVerticalProps) => {
  return <span style={{ margin: 2 * props.size }}></span>;
};

export default EspaiVertical;
