import React from "react";
import "../tail.css";

const FOOTER_HEIGHT = 50;

export interface IPropsContent {
  content: JSX.Element;
  style?: React.CSSProperties;
}

export interface IPropsContainer {
  headerContent: JSX.Element;
  clientContent: JSX.Element;
  leftNavBarContent: JSX.Element;
  rightLinkBarContent: JSX.Element;
  footerContent: JSX.Element;
}

export const LayoutContainer = (props: IPropsContainer) => {
  return (
    <div className="min-h-screen flex flex-col">
      <LayoutHeader
        content={props.headerContent}
        style={{ position: "sticky", top: 0 }}
      />
      <div className="flex-1 flex flex-col sm:flex-row">
        <main
          className="flex-1 bg-indigo-100 p-2"
          style={{
            height: "100% - calc(" + FOOTER_HEIGHT + ")",
            width: "100% - calc(300px)",
            margin: "auto",
          }}
        >
          {props.clientContent}
        </main>

        <LayoutNavBarLeft content={props.leftNavBarContent} />

        <LayoutNavBarRight content={props.rightLinkBarContent} />
      </div>

      <LayoutFooter content={props.footerContent} />
    </div>
  );
};

export const LayoutHeader = (props: IPropsContent) => {
  return (
    <div className="bg-gray-100 p-2" style={{ ...props.style }}>
      {props.content}
    </div>
  );
};

export const LayoutNavBarLeft = (props: IPropsContent) => {
  return (
    <nav className="order-first sm:w-32 bg-purple-200 p-2">{props.content}</nav>
  );
};

export const LayoutNavBarRight = (props: IPropsContent) => {
  return <aside className="sm:w-32 bg-yellow-100 p-2">{props.content}</aside>;
};

export const LayoutFooter = (props: IPropsContent) => {
  return (
    props.content || (
      <footer
        className="bg-gray-100 p-2"
        style={{ backgroundColor: "burdeos" }}
      >
        {/*<PlayBar />*/}
      </footer>
    )
  );
};

const PlayBar = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "100%",
        height: FOOTER_HEIGHT,
        bottom: 0,
        left: 0,
        position: "static",
      }}
    >
      {null}
    </div>
  );
};
