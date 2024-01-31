import { useContext, useState } from "react";
import TabScores from "../components/scores/TabScores";
import Page from "./Page";
import ChoixMode from "../components/Elements/ChoixMode";
import langpack from "../lang/langpack.json";
import LanguageContext from "../components/store/language-context";

export default function Scores() {
  const [modeSelect, setModeSelect] = useState("2");
  const [isLoading, setIsLoading] = useState(false);

  const lang = useContext(LanguageContext).lang;

  function changeModeHandler(mode) {
    setModeSelect(mode);
  }

  return (
    <Page titre={langpack["menu_scores"][lang]}>
      <div className="flex flex-col items-center w-full">
        <ChoixMode changeModeHandler={changeModeHandler} modeSelect={modeSelect} disabled={isLoading}/>
        <div className="w-8/12">
          <TabScores categorie={modeSelect} changeMode={changeModeHandler} loading={[isLoading, setIsLoading]}/>
        </div>
      </div>
    </Page>
  );
}