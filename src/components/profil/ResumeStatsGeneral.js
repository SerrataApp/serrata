import Stat from "./Stat";

export default function ResumeStatsGeneral(props) {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      <Stat key="parties_lancees" nom="Parties lancées" valeur={props.partiesLancees}/>
      <Stat key="parties_finies" nom="Parties terminées" valeur={props.stats.parties_finies}/>
      <Stat key="date_inscription" nom="Date d'inscription" valeur={props.dateInscription}/>
    </div>
  );
}