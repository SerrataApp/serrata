import { useEffect, useState } from "react";
import HistoriqueParties from "../components/profil/HistoriqueParties";
import ResumeStatsGeneral from "../components/profil/ResumeStatsGeneral";
import Page from "./Page";

export default function Profil() {
  const [listeParties, setListeParties] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [dateInscription, setDateInscription] = useState();

  useEffect(() => {
    function fetchGames(id) {
      console.log(id);
      const url = "http://127.0.0.1:8000/score/user/?user_id="+id;
      return fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then(response => response.json());
    }

    function fetchProfile() {
      setIsLoading(true);
      const url = "http://127.0.0.1:8000/"
      return fetch(url+"users/me", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then(response => response.json())
      .then(data => {setDateInscription(data.signup_date); return fetchGames(data.id)})
      .then(retour => {setIsLoading(false); return retour});
    }
    fetchProfile().then(liste => setListeParties(liste));
  }, [])

  const stats = {
    parties_lancees: 0,
    parties_finies: 0,
    temps_moyen: 0
  };

  listeParties?.forEach(partie => {
    stats.parties_lancees++;
    if(partie.temps!==null) {
      stats.parties_finies++;
    }
  });

  return (
    <Page titre="Profil">
      {isLoading &&
        <div className="flex justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      }
      {!isLoading &&
        <div className="flex flex-col items-center gap-5 mt-3">
          <ResumeStatsGeneral stats={stats} dateInscription={dateInscription}/>
          {listeParties && <HistoriqueParties listeParties={listeParties}/>}
        </div>
      }
    </Page>
  );
}