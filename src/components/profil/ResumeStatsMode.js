import Stat from "./Stat";

export default function ResumeStatsMode(props) {
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
    if(props.verifMode(partie.game_mode, props.modeSelect)) {
      stats.parties_finies++;
      temps_total += partie.time;
      erreurs_total += partie.errors;
      indices_total += partie.hint;
    }
  });

  stats.erreurs_moyen = Math.round((erreurs_total/stats.parties_finies)*10)/10;
  stats.indices_moyen = Math.round((indices_total/stats.parties_finies)*10)/10;
  stats.temps_moyen = temps_total/stats.parties_finies;
  const minutes = Math.floor(stats.temps_moyen/60);
  const secondes = Math.round(stats.temps_moyen%60);
  const temps_moyen = `${minutes < 10 ? "0" + minutes : minutes}:${secondes < 10 ? "0" + secondes : secondes}`;

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <Stat key="parties_finies" nom="Parties terminées" valeur={stats.parties_finies}/>
      <Stat key="temps_moyen" nom="Temps moyen" valeur={temps_moyen}/>
      <Stat key="erreurs_moyen" nom="Erreurs en moyenne" valeur={stats.erreurs_moyen}/>
      <Stat key="indices_moyen" nom="Indices en moyenne" valeur={stats.indices_moyen}/>
    </div>
  );
}