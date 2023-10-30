import HistoriqueParties from "../components/profil/HistoriqueParties";
import ResumeStats from "../components/profil/ResumeStats";

export default function Profil() {
  const stats = {
    parties_lancees: 15,
    parties_finies: 8,
    temps_moyen: "1:44"
  };

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
    }
  ]

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl">Pseudo</h1>
      <div className="flex items-center gap-12">
        <ResumeStats stats={stats}/>
        <HistoriqueParties listeParties={listeParties}/>
      </div>
    </div>
  );
}