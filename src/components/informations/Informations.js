import Chrono from "./Chrono";
import Compteur from "./Compteur";

export default function Informations() {
  return (
    <div className="flex gap-10">
      <Chrono/>
      <Compteur/>
    </div>
  );
}