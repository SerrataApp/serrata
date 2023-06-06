import React from "react";
import ReactDom from "react-dom";

export default function Modal(props) {
  const portalElement = document.getElementById("overlays");

  return (
    <React.Fragment>
      {ReactDom.createPortal(<div className="fixed w-full h-screen bg-black opacity-75 z-10" onClick={props.onClose}></div>, portalElement)}
      {ReactDom.createPortal(<div className="fixed bg-white p-4 rounded w-5/12 z-20 inset-0 mx-auto my-auto h-fit">{props.children}</div>, portalElement)}
    </React.Fragment>
  );
};