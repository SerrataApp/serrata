import { useState } from "react";
import TabScores from "../components/scores/TabScores";
import Page from "./Page";
import BoutonMode from "../components/scores/BoutonMode";

export default function Scores() {
  const [modeSelect, setModeSelect] = useState("Europe");

  function changeModeHandler(mode) {
    setModeSelect(mode);
  }

  return (
    <Page titre="Scores">
      <div className="flex flex-col items-center w-full">
        <div className="flex w-fit mb-3">
          <BoutonMode mode="Europe" onSelect={changeModeHandler} selection={modeSelect}/>
          <BoutonMode mode="Afrique" onSelect={changeModeHandler} selection={modeSelect}/>
          <BoutonMode mode="Monde" onSelect={changeModeHandler} selection={modeSelect}/>
        </div>
        <div className="w-8/12">
          {modeSelect==="Monde" && <TabScores categorie="monde" key="scores_monde"/>}
          {modeSelect==="Europe" && <TabScores categorie="europe" key="scores_europe"/>}
          {modeSelect==="Afrique" && <TabScores categorie="afrique" key="scores_afrique"/>}
        </div>
      </div>
    </Page>
  );
}