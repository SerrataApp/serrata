import { useEffect, useState } from "react";
import HistoriqueParties from "../components/profil/HistoriqueParties";
import ResumeStatsGeneral from "../components/profil/ResumeStatsGeneral";
import Page from "./Page";

export default function Profil() {
  const [listeParties, setListeParties] = useState();

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
      const url = "http://127.0.0.1:8000/"
      return fetch(url+"users/me", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then(response => response.json())
      .then(data => fetchGames(data.id));
    }
    fetchProfile().then(liste => setListeParties(liste));
  }, [])

  // const listeParties = [
  //   {
  //     time: 455,
  //     errors: 3,
  //     hint: 12,
  //     game_date: "2004-09-02",
  //     game_mode: 1
  //   }
  // ]

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
      <div className="flex flex-col items-center gap-5 mt-3">
        <ResumeStatsGeneral stats={stats}/>
        {listeParties && <HistoriqueParties listeParties={listeParties}/>}
      </div>
    </Page>
  );
}