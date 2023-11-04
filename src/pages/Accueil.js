import LienAccueil from "../components/Elements/LienAccueil";
import Page from "./Page";
import europe from "../img/modes/europe.png";
import afrique from "../img/modes/afrique.png";
import asie from "../img/modes/asie.png";
import monde from "../img/modes/monde.png";

export default function Accueil() {
  return (
    <Page titre="Jouer">
      <div className="grid grid-cols-3 mx-12 gap-4">
        <LienAccueil href="/europe" texte="Europe" img={europe}/>
        <LienAccueil href="/afrique" texte="Afrique" img={afrique}/>
        <LienAccueil href="/asie" texte="Asie" img={asie}/>
        <LienAccueil href="/monde" texte="Monde" img={monde}/>
      </div>
    </Page>
  );
}