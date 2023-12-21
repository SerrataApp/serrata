import LienAccueil from "../components/Elements/LienAccueil";
import Page from "./Page";
import europe from "../img/modes/europe.png";
import afrique from "../img/modes/afrique.png";
import asie from "../img/modes/asie.png";
import monde from "../img/modes/monde.png";
import amerique from "../img/modes/amerique.png";
import oceanie from "../img/modes/oceanie.png";
import langpack from "../lang/langpack.json";
import { useContext } from "react";
import LanguageContext from "../components/store/language-context";

export default function Accueil() {
  const lang = useContext(LanguageContext).lang;

  return (
    <Page titre={langpack["menu_jouer"][lang]}>
      <div className=" flex flex-col gap-2 md:grid md:grid-cols-3 md:mx-12 md:gap-4">
        <LienAccueil href="/europe" texte={langpack["rub_eu"][lang]} img={europe}/>
        <LienAccueil href="/afrique" texte={langpack["rub_af"][lang]} img={afrique}/>
        <LienAccueil href="/asie" texte={langpack["rub_as"][lang]} img={asie}/>
        <LienAccueil href="/amerique" texte={langpack["rub_am"][lang]} img={amerique}/>
        <LienAccueil href="/oceanie" texte={langpack["rub_oc"][lang]} img={oceanie}/>
        <LienAccueil href="/monde" texte={langpack["rub_mo"][lang]} img={monde}/>
      </div>
    </Page>
  );
}