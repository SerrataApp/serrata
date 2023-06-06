import { useState } from "react";

export default function PetitDrapeau(props) {
  const [estTrouve, setEstTrouve] = useState(false);

  let style = "";
  if(!estTrouve) {
    style = "opacity-50";
  }

  return (
    <div>
      <img src={props.drapeau.img} alt={props.drapeau.nom} className=" opacity-50"/>
      {estTrouve && <span>{props.drapeau.nom}</span>}
      
    </div>
  );
}