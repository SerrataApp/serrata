import { useState } from "react";
import TabScores from "../components/scores/TabScores";
import Page from "./Page";
import ChoixMode from "../components/Elements/ChoixMode";

export default function Scores() {
  const [modeSelect, setModeSelect] = useState("Europe");

  function changeModeHandler(mode) {
    setModeSelect(mode);
  }

  return (
    <Page titre="Scores">
      <div className="flex flex-col items-center w-full">
        <ChoixMode changeModeHandler={changeModeHandler} modeSelect={modeSelect}/>
        <div className="w-8/12">
          {modeSelect==="Monde" && <TabScores categorie="monde" key="scores_monde"/>}
          {modeSelect==="Europe" && <TabScores categorie="europe" key="scores_europe"/>}
          {modeSelect==="Afrique" && <TabScores categorie="afrique" key="scores_afrique"/>}
          {modeSelect==="Asie" && <TabScores categorie="asie" key="scores_asie"/>}
        </div>
      </div>
    </Page>
  );
}