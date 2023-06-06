import Chrono from "./Chrono";
import Compteur from "./Compteur";
import Pourcents from "./Pourcents";

export default function Informations() {
  return (
    <div className="flex gap-10">
      <Chrono/>
      <Compteur/>
      <Pourcents/>
    </div>
  );
}