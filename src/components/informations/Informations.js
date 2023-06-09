import Chrono from "./Chrono";
import Compteur from "./Compteur";
import Pourcents from "./Erreurs";
import Indices from "./Indices";

export default function Informations(props) {
  return (
    <div className="flex gap-10">
      <Chrono/>
      <Compteur longueur={props.longueur}/>
      <Pourcents/>
      <Indices/>
    </div>
  );
}