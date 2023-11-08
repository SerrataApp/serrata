export default function ResumePartie(props) {
  const minutes = Math.floor(props.temps/60);
  const secondes = props.temps%60;
  let style = "";
  if(props.index%2===0) {
    style = "bg-gray-100";
  }
  return (
    <tr className={style}>
      <td className="p-1 border">{minutes < 10 ? "0" + minutes : minutes}:{secondes < 10 ? "0" + secondes : secondes}</td>
      <td className="p-1 border">{props.erreurs}</td>
      <td className="p-1 border">{props.indices}</td>
      <td className="p-1 border">{props.date}</td>
    </tr>
  );
}