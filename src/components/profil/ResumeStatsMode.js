import Stat from "./Stat";
import langpack from "../../lang/langpack.json";
import { useContext } from "react";
import LanguageContext from "../store/language-context";

export default function ResumeStatsMode(props) {
  const lang = useContext(LanguageContext).lang;

  const stats = {
    parties_finies: 0,
    temps_moyen: 0,
    erreurs_moyen: 0,
    indices_moyen: 0
  }

  let temps_total = 0;
  let erreurs_total = 0;
  let indices_total = 0;

  props.listeParties.forEach(partie => {
    if(partie.gameMode==props.modeSelect) {
      stats.parties_finies++;
      temps_total += partie.time;
      erreurs_total += partie.errors;
      indices_total += partie.hint;
    }
  });

  stats.erreurs_moyen = Math.round((erreurs_total/stats.parties_finies)*10)/10;
  stats.indices_moyen = Math.round((indices_total/stats.parties_finies)*10)/10;
  stats.temps_moyen = temps_total/stats.parties_finies;
  const minutes = Math.floor(stats.temps_moyen/(60*1000));
  const secondes = Math.floor(stats.temps_moyen%(60*1000)/1000);
  const ms = Math.round(stats.temps_moyen%1000);
  const temps_moyen = `${minutes < 10 ? "0" + minutes : minutes}:${secondes < 10 ? "0" + secondes : secondes}:${(ms < 10) ? '00' + ms : (ms < 100) ? '0' + ms : ms}`;

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <Stat key="parties_finies" nom={langpack["prof_partterm"][lang]} valeur={stats.parties_finies}/>
      <Stat key="temps_moyen" nom={langpack["prof_tps"][lang]} valeur={temps_moyen}/>
      <Stat key="erreurs_moyen" nom={langpack["prof_errmoy"][lang]} valeur={stats.erreurs_moyen}/>
      <Stat key="indices_moyen" nom={langpack["prof_indmoy"][lang]} valeur={stats.indices_moyen}/>
    </div>
  );
}