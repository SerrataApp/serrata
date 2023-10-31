import HistoriqueParties from "../components/profil/HistoriqueParties";
import ResumeStats from "../components/profil/ResumeStats";

export default function Profil() {
  const listeParties = [
    {
      temps: 455,
      erreurs: 3,
      date: "02/09/2004"
    },
    {
      temps: 305,
      erreurs: 5,
      date: "03/09/2004"
    },
    {
      temps: 555,
      erreurs: 2,
      date: "04/09/2004"
    },
    {
      temps: null,
      erreurs: 2,
      date: "04/09/2004"
    }
  ]

  const stats = {
    parties_lancees: 0,
    parties_finies: 0,
    temps_moyen: 0
  };

  let temps_total = 0;

  listeParties.forEach(partie => {
    stats.parties_lancees++;
    if(partie.temps!==null) {
      stats.parties_finies++;
      temps_total += partie.temps;
    }
  });

  stats.temps_moyen = temps_total/stats.parties_finies;

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl">Pseudo</h1>
        <div className="flex items-center gap-12">
          <ResumeStats stats={stats}/>
          <HistoriqueParties listeParties={listeParties}/>
        </div>
      </div>
    </>
  );
}