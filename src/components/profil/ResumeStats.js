import Stat from "./Stat";

export default function ResumeStats(props) {
  return (
    <div>
      <Stat nom="Parties lancées" valeur={props.stats.parties_lancees}/>
      <Stat nom="Parties terminées" valeur={props.stats.parties_finies}/>
      <Stat nom="Temps moyen" valeur={props.stats.temps_moyen}/>
    </div>
  );
}