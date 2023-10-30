import HistoriqueParties from "../components/profil/HistoriqueParties";
import ResumeStats from "../components/profil/ResumeStats";

export default function Profil() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl">Pseudo</h1>
      <div className="flex items-center gap-12">
        <ResumeStats/>
        <HistoriqueParties/>
      </div>
    </div>
  );
}