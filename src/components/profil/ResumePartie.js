export default function ResumePartie(props) {
  const minutes = Math.floor(props.temps/60);
  const secondes = props.temps%60;
  return (
    <tr>
      <td className="p-1 border">{minutes < 10 ? "0" + minutes : minutes}:{secondes < 10 ? "0" + secondes : secondes}</td>
      <td className="p-1 border">{props.erreurs}</td>
      <td className="p-1 border">{props.date}</td>
    </tr>
  );
}