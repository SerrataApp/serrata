import { useState } from "react";

export default function PetitDrapeau(props) {
  const [estTrouve, setEstTrouve] = useState(false);

  let style = "h-3/4 ";
  if(!estTrouve) {
    style += "opacity-50";
  }

  return (
    <div className="h-24 w-40 border border-black flex flex-col items-center">
      <img src={props.drapeau.img} alt={props.drapeau.nom} className={style}/>
      {!estTrouve && <span className="">{props.drapeau.nom}</span>}
    </div>
  );
}