export default function HistoriqueParties() {
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
        <tr>
          <th className="p-1 border">Temps</th>
          <th className="p-1 border">Erreurs</th>
          <th className="p-1 border">Date</th>
        </tr>
        <tr>
          <td className="p-1 border">zefzefzef</td>
          <td className="p-1 border">zefzefzef</td>
          <td className="p-1 border">zefzefzef</td>
        </tr>
        <tr>
          <td className="p-1 border">zefzefzef</td>
          <td className="p-1 border">zefzefzef</td>
          <td className="p-1 border">zefzefzef</td>
        </tr>
        <tr>
          <td className="p-1 border">zefzefzef</td>
          <td className="p-1 border">zefzefzef</td>
          <td className="p-1 border">zefzefzef</td>
        </tr>
        <tr>
          <td className="p-1 border">zefzefzef</td>
          <td className="p-1 border">zefzefzef</td>
          <td className="p-1 border">zefzefzef</td>
        </tr>
      </table>
    </div>
  );
}