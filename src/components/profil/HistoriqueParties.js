import ResumePartie from "./ResumePartie";
import { useEffect, useState } from "react";
import ChoixMode from "../Elements/ChoixMode";
import ResumeStatsMode from "./ResumeStatsMode";

export default function HistoriqueParties(props) {
  const [tri, setTri] = useState("tmp_cr");
  const [listeParties, setListeParties] = useState([...props.listeParties]);
  const [partiesTriees, setPartiesTriees] = useState([]);
  const [modeSelect, setModeSelect] = useState("Europe");

  function onChangeHandler(event) {
    setTri(event.target.value);
  }

  function changeModeHandler(mode) {
    setModeSelect(mode);
  }

  function verifMode(donne, cherche) {
    if(cherche==="Europe") {
      return donne===1;
    } else if(cherche==="Afrique") {
      return donne===2;
    } else if(cherche==="Asie") {
      return donne===3;
    } else {
      return donne===0;
    }
  }

  useEffect(() => {
    switch(tri) {
      case "tmp_cr": setListeParties(listeParties.sort((a,b) => (a.time>b.time?1:-1))); break;
      case "err_cr": setListeParties(listeParties.sort((a,b) => (a.errors>b.errors?1:-1))); break;
      case "tmp_decr": setListeParties(listeParties.sort((a,b) => (a.time<b.time?1:-1))); break;
      case "err_decr": setListeParties(listeParties.sort((a,b) => (a.errors<b.errors?1:-1))); break;
      default: break;
    }
  }, [tri, listeParties])

  useEffect(() => {
    console.log(listeParties);
    let compteur = 0;
    setPartiesTriees(listeParties.map((partie) => {
      if(verifMode(partie.game_mode, modeSelect)) {
        return <ResumePartie key={compteur+1} index={compteur++} temps={partie.time} erreurs={partie.errors} indices={partie.hint} date={partie.game_date}/>
      }
      return null;
    }).filter(element => element !== null));
  }, [tri, listeParties, modeSelect]);

  return (
    <div className="w-8/12 flex flex-col items-center overflow-auto">
      <ChoixMode changeModeHandler={changeModeHandler} modeSelect={modeSelect}/>
      {partiesTriees.length>0?
      <>
        <ResumeStatsMode listeParties={props.listeParties} modeSelect={modeSelect} verifMode={verifMode}/>
        <div className="my-2">
          <label htmlFor="tri" className="text-l">Trier par : </label>
          <select className="border p-2 rounded" id="tri" value={tri} onChange={onChangeHandler}>
            <option value="tmp_cr">Temps croissant</option>
            <option value="err_cr">Erreurs croissant</option>
            <option value="rec">Plus récent</option>
            <option value="tmp_decr">Temps décroissant</option>
            <option value="err_decr">Erreurs décroissant</option>
            <option value="anc">Plus anciens</option>
          </select>
        </div>
        <div className="overflow-auto w-full border rounded-xl" style={{maxHeight: "400px"}}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-1 border w-1/4">Temps</th>
                <th className="p-1 border w-1/4">Erreurs</th>
                <th className="p-1 border w-1/4">Indices</th>
                <th className="p-1 border w-1/4">Date</th>
              </tr>
            </thead>
            <tbody>
              {partiesTriees}
            </tbody>
          </table>
        </div>
      </>:
      <p>Aucune partie dans cette catégorie pour l'instant</p>}
    </div>
  );
}