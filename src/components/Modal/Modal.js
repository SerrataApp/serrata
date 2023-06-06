import React from "react";
import ReactDom from "react-dom";

export default function Modal(props) {
  const portalElement = document.getElementById("overlays");

  return (
    <React.Fragment>
      {ReactDom.createPortal(<div className="fixed w-full h-screen bg-black opacity-75 z-20 flex items-center justify-center" onClick={props.onClose}></div>, portalElement)}
      {ReactDom.createPortal(<div className="bg-white z-30">{props.children}</div>, portalElement)}
    </React.Fragment>
  );
};