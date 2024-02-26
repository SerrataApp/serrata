import { useState } from "react";
import ZoneSaisie from "../components/typingtest/ZoneSaisie";
import Page from "./Page";
import InfosTyping from "../components/typingtest/InfosTyping";

export default function TypingTest() {
  const [nbBons, setNbBons] = useState(0);
  const [nbFaux, setNbFaux] = useState(0);

  function estBon() {
    setNbBons(nbBons+1);
  }

  function estFaux() {
    setNbFaux(nbFaux+1);
  }

  return (
    <Page titre="Typing test">
      <InfosTyping nbBons={nbBons} nbFaux={nbFaux}/>
      <div className="flex justify-center">
        <ZoneSaisie estBon={estBon} estFaux={estFaux}/>
      </div>
      <p>{nbBons} bons</p>
      <p>{nbFaux} faux</p>
    </Page>
  );
}