import LienAccueil from "../components/Elements/LienAccueil";
import Page from "./Page";
import europe from "../img/modes/europe.png";
import afrique from "../img/modes/afrique.png";
import asie from "../img/modes/asie.png";
import monde from "../img/modes/monde.png";
import amerique from "../img/modes/amerique.png";
import oceanie from "../img/modes/oceanie.png";

export default function Accueil() {
  return (
    <Page titre="Jouer">
      <div className=" flex flex-col gap-2 md:grid md:grid-cols-3 md:mx-12 md:gap-4">
        <LienAccueil href="/europe" texte="Europe" img={europe}/>
        <LienAccueil href="/afrique" texte="Afrique" img={afrique}/>
        <LienAccueil href="/asie" texte="Asie" img={asie}/>
        <LienAccueil href="/amerique" texte="Amérique" img={amerique}/>
        <LienAccueil href="/oceanie" texte="Océanie" img={oceanie}/>
        <LienAccueil href="/monde" texte="Monde" img={monde}/>
      </div>
    </Page>
  );
}