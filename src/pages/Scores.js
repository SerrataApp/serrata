import { useState } from "react";
import TabScores from "../components/scores/TabScores";
import Page from "./Page";
import ChoixMode from "../components/Elements/ChoixMode";

export default function Scores() {
  const [modeSelect, setModeSelect] = useState("1");
  const [isLoading, setIsLoading] = useState(false)

  function changeModeHandler(mode) {
    setModeSelect(mode);
  }

  return (
    <Page titre="Scores">
      <div className="flex flex-col items-center w-full">
        <ChoixMode changeModeHandler={changeModeHandler} modeSelect={modeSelect} disabled={isLoading}/>
        <div className="w-8/12">
          <TabScores categorie={modeSelect} changeMode={changeModeHandler} loading={[isLoading, setIsLoading]}/>
        </div>
      </div>
    </Page>
  );
}