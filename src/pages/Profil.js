import HistoriqueParties from "../components/profil/HistoriqueParties";
import ResumeStatsGeneral from "../components/profil/ResumeStatsGeneral";
import Page from "./Page";

export default function Profil() {
  const listeParties = [
    {
      temps: 455,
      erreurs: 3,
      indices: 12,
      date: "02/09/2004",
      mode: "Europe"
    },
    {
      temps: 305,
      erreurs: 5,
      indices: 0,
      date: "03/09/2004",
      mode: "Afrique"
    },
    {
      temps: 555,
      erreurs: 2,
      indices: 4,
      date: "04/09/2004",
      mode: "Monde"
    },
    {
      temps: null
    }
  ]

  const stats = {
    parties_lancees: 0,
    parties_finies: 0,
    temps_moyen: 0
  };

  listeParties.forEach(partie => {
    stats.parties_lancees++;
    if(partie.temps!==null) {
      stats.parties_finies++;
    }
  });

  return (
    <Page titre="Profil">
      <div className="flex flex-col items-center gap-5 mt-3">
        <ResumeStatsGeneral stats={stats}/>
        <HistoriqueParties listeParties={listeParties}/>
      </div>
    </Page>
  );
}