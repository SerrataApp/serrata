import LienAccueil from "../components/Elements/LienAccueil";
import Page from "./Page";

export default function Accueil() {
  return (
    <Page>
    <div className="w-screen flex justify-center items-center flex-col gap-1">
      <h1 className="font-bold">Serrata</h1>
      <h2>Choisir mode</h2>
      <LienAccueil href="/europe" texte="Europe"/>
      <LienAccueil href="/afrique" texte="Afrique"/>
      <LienAccueil href="/monde" texte="Monde"/>
      <h2>Autres</h2>
      <LienAccueil href="/scores" texte="Score"/>
      <LienAccueil href="/profil" texte="Profil"/>
    </div>
    </Page>
  );
}