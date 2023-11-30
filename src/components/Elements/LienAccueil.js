import { useState } from "react";

export default function LienAccueil(props) {
  const [isHover, setIsHover] = useState(false);

  function onMouseEnterHandler() {
    setIsHover(true);
  }

  function onMouseLeaveHandler() {
    setIsHover(false);
  }

  return(
    <a href={props.href} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className="overflow-hidden rounded h-44 flex justify-center items-center border relative">
      <p className="text-3xl absolute z-10 text-white" style={{ textShadow: "0px 0px 5px rgba(0, 0, 0, 0.8)" }}>{props.texte}</p>
      <img src={props.img} alt={props.texte} className={`w-full blur-sm transition-all duration-200 scale-110 sc ${isHover && "scale-125"}`}/>
    </a>
  );
}