import React from "react";

export interface IIfuProps {
  condition: unknown;
  ifThen: JSX.Element;
  ifElse: JSX.Element;
}
const Ifu = (props: IIfuProps) => {
  if (!props.condition) {
    return props.ifThen;
  } else {
    return props.ifElse;
  }
};

export default Ifu;
