import formatDate from "../../utils/formatDate";

export default function PlayerCard(props) {
  return (
    <a href={`/profil/${props.user.username}`} className="border rounded-xl p-2 shadow-sm bg-white transition-bg duration-150 hover:bg-gray-50 flex flex-col gap-1">
      <p>{props.user.username}</p>
      <div className="rounded-xl overflow-hidden border">
        <table className="text-center">
          <thead>
            <tr>
              <th className="p-2 border-r border-b">Parties lancées</th>
              <th className="p-2 border-b">Date d'inscription</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-r">{props.user.played_games}</td>
              <td className="p-2">{formatDate(props.user.signup_date)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </a>
  );
}