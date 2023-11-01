export default function Stat(props) {
  return (
    <div>
      <h2 className="font-semibold">{props.nom}</h2>
      <span>{props.valeur}</span>
    </div>
  );
}