import ResumePartie from "./ResumePartie";
import { useContext, useEffect, useState } from "react";
import ChoixMode from "../Elements/ChoixMode";
import ResumeStatsMode from "./ResumeStatsMode";
import ConnexionContext from "../store/connexion-context";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";

export default function HistoriqueParties(props) {
  const [tri, setTri] = useState("tmp_cr");
  const [listeParties, setListeParties] = useState([...props.listeParties]);
  const [partiesTriees, setPartiesTriees] = useState([]);
  const [modeSelect, setModeSelect] = useState("1");

  const ctxConnexion = useContext(ConnexionContext);

  const lang = useContext(LanguageContext).lang;

  function onChangeHandler(event) {
    setTri(event.target.value);
  }

  function changeModeHandler(mode) {
    setModeSelect(mode);
  }

  useEffect(() => {
    switch(tri) {
      case "tmp_cr": setListeParties(listeParties.sort((a,b) => (a.time>b.time?1:-1))); break;
      case "err_cr": setListeParties(listeParties.sort((a,b) => (a.errors>b.errors?1:-1))); break;
      case "rec": setListeParties(listeParties.sort((a,b) => (a.id<b.id?1:-1))); break;
      case "tmp_decr": setListeParties(listeParties.sort((a,b) => (a.time<b.time?1:-1))); break;
      case "err_decr": setListeParties(listeParties.sort((a,b) => (a.errors<b.errors?1:-1))); break;
      case "anc": setListeParties(listeParties.sort((a,b) => (a.id>b.id?1:-1))); break;
      default: break;
    }
  }, [tri, listeParties])

  useEffect(() => {
    let compteur = 0;
    setPartiesTriees(listeParties.map((partie) => {
      if(partie.game_mode==modeSelect) {
        return <ResumePartie key={compteur+1} index={compteur++} partie={partie} username={props.username} setIsLoading={props.setIsLoading}/>
      }
      return null;
    }).filter(element => element !== null));
  }, [tri, listeParties, modeSelect]);

  return (
    <div className="w-8/12 flex flex-col items-center overflow-auto">
      <ChoixMode changeModeHandler={changeModeHandler} modeSelect={modeSelect}/>
      {partiesTriees.length>0?
      <>
        <ResumeStatsMode listeParties={props.listeParties} modeSelect={modeSelect}/>
        <div className="my-2">
          <label htmlFor="tri" className="text-l">{langpack["prof_tri"][lang]} : </label>
          <select className="border p-2 rounded" id="tri" value={tri} onChange={onChangeHandler}>
            <option value="tmp_cr">{langpack["prof_tri_tpscroi"][lang]}</option>
            <option value="err_cr">{langpack["prof_tri_errcroi"][lang]}</option>
            <option value="rec">{langpack["prof_tri_precent"][lang]}</option>
            <option value="tmp_decr">{langpack["prof_tri_tpsdecroi"][lang]}</option>
            <option value="err_decr">{langpack["prof_tri_errdecroi"][lang]}</option>
            <option value="anc">{langpack["prof_tri_pancien"][lang]}</option>
          </select>
        </div>
        <div className="overflow-auto w-full border rounded-xl mb-3" style={{maxHeight: "400px"}}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-1 border w-1/5">{langpack["sco_temps"][lang]}</th>
                <th className="p-1 border w-1/5">{langpack["sco_err"][lang]}</th>
                <th className="p-1 border w-1/5">{langpack["sco_ind"][lang]}</th>
                <th className="p-1 border w-1/5">{langpack["sco_date"][lang]}</th>
                <th className="p-1 border w-1/5">{langpack["sco_vis"][lang]}</th>
                {ctxConnexion&&ctxConnexion.admin&&<th className="py-1 px-3 border w-fit"></th>}
              </tr>
            </thead>
            <tbody>
              {partiesTriees}
            </tbody>
          </table>
        </div>
      </>:
      <p>{langpack["prof_aucu"][lang]}</p>}
    </div>
  );
}