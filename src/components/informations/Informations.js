import Chrono from "./Chrono";
import Compteur from "./Compteur";
import Pourcents from "./Erreurs";

export default function Informations() {
  return (
    <div className="flex gap-10">
      <Chrono/>
      <Compteur/>
      <Pourcents/>
    </div>
  );
}