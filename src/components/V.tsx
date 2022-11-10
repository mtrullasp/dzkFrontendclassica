import React from "react";

export interface IVProps {
  isVisible?: boolean;
  children: JSX.Element;
}

const V = (props: IVProps) => {
  return !!props.isVisible && props.children;
};

export default V;

// Autor: Moisès Trullàs
// Exemples:
// <V><div>HOLA</div></V>   resultat <div>HOLA</div>
// <V><div isVisible={false}>HOLA</div></V>   resultat null (no es veu res)
// <V><div isVisible={true}>HOLA</div></V>   resultat <div>HOLA</div>
// <V><div isVisible>HOLA</div></V>   resultat <div>HOLA</div>
