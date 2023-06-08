import { useContext } from "react";
import DrapeauxUtilisesContext from "../store/drapeaux-utilises-context";

export default function Compteur(props) {
  const ctx = useContext(DrapeauxUtilisesContext);

  return (
    <span>
      {ctx.drapeauxUtilises.length}/{props.longueur}
    </span>
  );
}