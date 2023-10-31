export default function Stat(props) {
  let valeur = props.valeur;

  if(props.nom==="Temps moyen") {
    const minutes = Math.floor(props.valeur/60);
    const secondes = Math.round(props.valeur%60);
    valeur = `${minutes < 10 ? "0" + minutes : minutes}:${secondes < 10 ? "0" + secondes : secondes}`;
  }

  return (
    <div>
      <h2 className="font-semibold">{props.nom}</h2>
      <span>{valeur}</span>
    </div>
  );
}