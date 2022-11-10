import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ComposersStore from "./stores/ComposersStore";
import PerformersStore from "./stores/PerformersStore";
//import { Provider } from "mobx-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const composersData = new ComposersStore();
const performersData = new PerformersStore();
const composersContext = React.createContext<ComposersStore | null>(
  composersData
);
const performerContext = React.createContext<PerformersStore | null>(
  performersData
);

export const useComposerstore = () => {
  const store = React.useContext(composersContext);
  return store;
};

export const usePerformersStore = () => {
  const store = React.useContext(performerContext);
  return store;
};

composersData.hidrateComposers().then(() => {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
