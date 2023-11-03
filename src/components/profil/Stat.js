export default function Stat(props) {
  return (
    <div className="border rounded-xl p-5 shadow-sm">
      <span className="text-2xl font-semibold">{props.valeur}</span>
      <h2 className="">{props.nom}</h2>
    </div>
  );
}