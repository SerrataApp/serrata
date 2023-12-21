import Stat from "./Stat";
import langpack from "../../lang/langpack.json";

export default function ResumeStatsGeneral(props) {
  const lang = localStorage.getItem("lang");

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <Stat key="parties_lancees" nom={langpack["prof_partlan"][lang]} valeur={props.partiesLancees}/>
      <Stat key="parties_finies" nom={langpack["prof_partterm"][lang]} valeur={props.stats.parties_finies}/>
      <Stat key="date_inscription" nom={langpack["prof_date"][lang]} valeur={props.dateInscription}/>
    </div>
  );
}