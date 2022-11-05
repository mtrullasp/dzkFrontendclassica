import { Observer } from "mobx-react";

export interface IMakeObserverProps {
  children: JSX.Element;
}

const MakeObserver = (props: IMakeObserverProps) => {
  return <Observer>{() => props.children}</Observer>;
};

export default MakeObserver;
