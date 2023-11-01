import Stat from "./Stat";

export default function ResumeStats(props) {
  const minutes = Math.floor(props.stats.temps_moyen/60);
  const secondes = Math.round(props.stats.temps_moyen%60);
  const temps_moyen = `${minutes < 10 ? "0" + minutes : minutes}:${secondes < 10 ? "0" + secondes : secondes}`;

  return (
    <div>
      <Stat key="parties_lancees" nom="Parties lancées" valeur={props.stats.parties_lancees}/>
      <Stat key="parties_finies" nom="Parties terminées" valeur={props.stats.parties_finies}/>
      <Stat key="temps_moyen" nom="Temps moyen" valeur={temps_moyen}/>
    </div>
  );
}