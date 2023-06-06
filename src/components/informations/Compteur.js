import { useContext } from "react";
import DrapeauxUtilisesContext from "../store/drapeaux-utilises-context";
import { drapeaux } from "../../utils/ImportDrapeaux";

export default function Compteur() {
  const ctx = useContext(DrapeauxUtilisesContext);

  return (
    <span>
      {ctx.drapeauxUtilises.length}/{drapeaux.length}
    </span>
  );
}