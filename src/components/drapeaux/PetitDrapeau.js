import { useEffect, useState, useContext } from "react";
import DrapeauxUtilisesContext from "../store/drapeaux-utilises-context";

export default function PetitDrapeau(props) {
  const [estTrouve, setEstTrouve] = useState(false);

  const ctx = useContext(DrapeauxUtilisesContext);

  useEffect(() => {
    const estDansContext = ctx.drapeauxUtilises.some(pays => {
      return pays === props.drapeau.nom;
    })
    if(estDansContext) {
      setEstTrouve(true);
    }
    console.log(estDansContext);
  }, [ctx.drapeauxUtilises, props.drapeau.nom])

  let style = "border h-3/4 ";
  if(!estTrouve) {
    style += "opacity-50";
  }

  return (
    <div className="h-24 w-40 border-black flex flex-col items-center">
      <img src={props.drapeau.img} alt={props.drapeau.nom} className={style}/>
      {estTrouve && <span className="">{props.drapeau.nom}</span>}
    </div>
  );
}