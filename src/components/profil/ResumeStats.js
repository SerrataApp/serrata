import Stat from "./Stat";

export default function ResumeStats(props) {
  return (
    <div>
      <Stat key="parties_lancees" nom="Parties lancées" valeur={props.stats.parties_lancees}/>
      <Stat key="parties_finies" nom="Parties terminées" valeur={props.stats.parties_finies}/>
      <Stat key="temps_moyen" nom="Temps moyen" valeur={props.stats.temps_moyen}/>
    </div>
  );
}