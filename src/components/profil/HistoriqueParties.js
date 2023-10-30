export default function HistoriqueParties(props) {
  const listeParties = props.listeParties.map(partie => (
    <tr>
      <td className="p-1 border">{partie.temps}</td>
      <td className="p-1 border">{partie.erreurs}</td>
      <td className="p-1 border">{partie.date}</td>
    </tr>
  ));

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