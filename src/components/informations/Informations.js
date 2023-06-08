import Chrono from "./Chrono";
import Compteur from "./Compteur";
import Pourcents from "./Erreurs";

export default function Informations(props) {
  return (
    <div className="flex gap-10">
      <Chrono/>
      <Compteur longueur={props.longueur}/>
      <Pourcents/>
    </div>
  );
}