import ResumePartie from "./ResumePartie";

export default function HistoriqueParties(props) {
  const listeParties = props.listeParties.map((partie, index) => {
    if(partie.temps) {
      return <ResumePartie key={index} temps={partie.temps} erreurs={partie.erreurs} date={partie.date}/>
    }
  });

  return (
    <div>
      <div>
        <label htmlFor="tri">Trier par : </label>
        <select id="tri">
          <option>Erreurs croissant</option>
          <option>Temps croissant</option>
          <option>Plus récent</option>
          <option>Erreurs décroissant</option>
          <option>Temps décroissant</option>
          <option>Plus anciens</option>
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