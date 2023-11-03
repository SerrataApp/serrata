import ResumePartie from "./ResumePartie";
import { useEffect, useState } from "react";

export default function HistoriqueParties(props) {
  const [tri, setTri] = useState("tmp_cr");
  const [listeParties, setListeParties] = useState([...props.listeParties]);
  const [partiesTriees, setPartiesTriees] = useState([]);

  function onChangeHandler(event) {
    setTri(event.target.value);
  }

  useEffect(() => {
    switch(tri) {
      case "tmp_cr": setListeParties(listeParties.sort((a,b) => (a.temps>b.temps?1:-1))); break;
      case "err_cr": setListeParties(listeParties.sort((a,b) => (a.erreurs>b.erreurs?1:-1))); break;
      case "tmp_decr": setListeParties(listeParties.sort((a,b) => (a.temps<b.temps?1:-1))); break;
      case "err_decr": setListeParties(listeParties.sort((a,b) => (a.erreurs<b.erreurs?1:-1))); break;
      default: break;
    }
  }, [tri, listeParties])

  useEffect(() => {
    setPartiesTriees(listeParties.map((partie, index) => {
      if(partie.temps) {
        return <ResumePartie key={index} index={index} temps={partie.temps} erreurs={partie.erreurs} date={partie.date}/>
      }
      return null;
    }));
  }, [tri, listeParties]);

  return (
    <div className="w-8/12 flex flex-col items-center overflow-auto">
      <div className="mb-2">
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
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-1 border">Temps</th>
            <th className="p-1 border">Erreurs</th>
            <th className="p-1 border">Indices</th>
            <th className="p-1 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {partiesTriees}
        </tbody>
      </table>
    </div>
  );
}