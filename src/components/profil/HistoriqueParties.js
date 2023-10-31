import ResumePartie from "./ResumePartie";
import { useState } from "react";

export default function HistoriqueParties(props) {
  const [tri, setTri] = useState("tmp_cr");

  function onChangeHandler(event) {
    setTri(event.target.value);
  }

  const listeParties = props.listeParties.map((partie, index) => {
    if(partie.temps) {
      return <ResumePartie key={index} temps={partie.temps} erreurs={partie.erreurs} date={partie.date}/>
    }
    return null;
  });

  return (
    <div>
      <div>
        <label htmlFor="tri">Trier par : </label>
        <select id="tri" value={tri} onChange={onChangeHandler}>
          <option value="tmp_cr">Temps croissant</option>
          <option value="err_cr">Erreurs croissant</option>
          <option value="rec">Plus récent</option>
          <option value="tmp_decr">Temps décroissant</option>
          <option value="err_decr">Erreurs décroissant</option>
          <option value="anc">Plus anciens</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th className="p-1 border">Temps</th>
            <th className="p-1 border">Erreurs</th>
            <th className="p-1 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {listeParties}
        </tbody>
      </table>
    </div>
  );
}