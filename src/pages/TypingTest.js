import { useState, useEffect, useContext } from "react";
import ZoneSaisie from "../components/typingtest/ZoneSaisie";
import Page from "./Page";
import InfosTyping from "../components/typingtest/InfosTyping";
import ChoixTemps from "../components/typingtest/ChoixTemps";
import ModalResultTyping from "../components/typingtest/ModalResultTyping";
import langpack from "../lang/langpack.json";
import LanguageContext from "../components/store/language-context";

export default function TypingTest() {
  const [nbBons, setNbBons] = useState(0);
  const [nbFaux, setNbFaux] = useState(0);
  const [tempsSelect, setTempsSelect] = useState("60");
  const [chrono, setChrono] = useState(tempsSelect);
  const [estFini, setEstFini] = useState(false);
  const [estDemarre, setEstDemarre] = useState(false);
  const [nbMots, setNbMots] = useState(0);

  const lang = useContext(LanguageContext).lang;

  useEffect(() => {
    let interval;
    if(estDemarre) {
      interval = setInterval(() => {
        setChrono(prevChrono => prevChrono - 1);
      }, 1000);
    }

    if(estFini) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [estFini, estDemarre]);

  useEffect(() => {
    if(chrono===0) {
      setEstFini(true);
    }
  }, [chrono])

  function estBon() {
    setNbBons(nbBons+1);
  }

  function estFaux() {
    setNbFaux(nbFaux+1);
  }

  function onChangeTempsSelect(temps) {
    setTempsSelect(temps);
    setChrono(temps)
  }

  function demarrer() {
    setEstDemarre(true);
  }

  function ajouterMot() {
    setNbMots(nbMots+1);
  }

  function retirerMot() {
    setNbMots(nbMots-1);
  }

  function closeModal() {
    window.location.reload();
  }

  return (
    <Page titre={langpack["typ_tit"][lang]}>
        {estFini && <ModalResultTyping tempsSelect={tempsSelect} nbMots={nbMots} onClose={closeModal} nbBons={nbBons} nbFaux={nbFaux}/>}
        <div className="flex flex-col items-center gap-2">
          <ChoixTemps tempsSelect={tempsSelect} changeTempsHandler={onChangeTempsSelect} disabled={estDemarre}/>
          <InfosTyping nbBons={nbBons} nbFaux={nbFaux} chrono={chrono} nbMots={nbMots}/>
          <div className="flex justify-center">
            <ZoneSaisie estBon={estBon} estFaux={estFaux} demarrer={demarrer} jeuEstFini={estFini} disabled={estFini} ajouterMot={ajouterMot} retirerMot={retirerMot}/>
          </div>
        </div>
    </Page>
  );
}