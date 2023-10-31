export default function ResumePartie(props) {
  return (
    <tr>
      <td className="p-1 border">{props.temps}</td>
      <td className="p-1 border">{props.erreurs}</td>
      <td className="p-1 border">{props.date}</td>
    </tr>
  );
}