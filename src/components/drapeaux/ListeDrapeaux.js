import { drapeaux } from "../../utils/ImportDrapeaux";
import PetitDrapeau from "./PetitDrapeau";

export default function ListeDrapeaux() {
    return (
    <div>
      {drapeaux.map(drapeau => {
        return (
          <PetitDrapeau key={drapeau.nom} drapeau={drapeau}/>
        );
      })}
    </div>
  );
}