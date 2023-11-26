import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import HistoriqueParties from "../components/profil/HistoriqueParties";
import ResumeStatsGeneral from "../components/profil/ResumeStatsGeneral";
import Page from "./Page";
import UrlApi from "../utils/UrlApi";

export default function Profil() {
  const [dataJoueur, setDataJoueur] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dateInscription, setDateInscription] = useState();
  const [partiesLancees, setPartiesLancees] = useState();

  const {username} = useParams();

  useEffect(() => {
    function fetchGames() {
      console.log(username);
      return fetch(UrlApi+"score/user/?username="+username, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then(response => {setIsLoading(false); return response.json()});
    }

    // function fetchProfile() {
    //   setIsLoading(true);
    //   return fetch(UrlApi+"users/me", {
    //     method: "GET",
    //     headers: {
    //       "Accept": "application/json",
    //       "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(data => {setDateInscription(data.signup_date); return fetchGames(data.id)})
    //   .then(retour => {setIsLoading(false); return retour});
    // }
    fetchGames().then(data => {setDataJoueur(data); setDateInscription(data.signup_date); setPartiesLancees(data.played_games)});
  }, [])

  const stats = {
    parties_finies: 0,
    temps_moyen: 0
  };

  dataJoueur.games?.forEach(partie => {
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
          <ResumeStatsGeneral stats={stats} dateInscription={dateInscription} partiesLancees={partiesLancees}/>
          {dataJoueur.games && <HistoriqueParties listeParties={dataJoueur.games}/>}
        </div>
      }
    </Page>
  );
}