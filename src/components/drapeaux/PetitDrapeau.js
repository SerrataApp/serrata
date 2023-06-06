import { useState } from "react";

export default function PetitDrapeau(props) {
  const [estTrouve, setEstTrouve] = useState(false);

  return (
    <div>
      <img src={props.drapeau.img} alt={props.drapeau.nom}/>
      {estTrouve && <span>{props.drapeau.nom}</span>}
    </div>
  );
}