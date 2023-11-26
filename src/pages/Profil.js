import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import HistoriqueParties from "../components/profil/HistoriqueParties";
import ResumeStatsGeneral from "../components/profil/ResumeStatsGeneral";
import Page from "./Page";
import urlApi from "../utils/urlApi";
import formatDate from "../utils/formatDate";

export default function Profil() {
  const [dataJoueur, setDataJoueur] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dateInscription, setDateInscription] = useState();
  const [partiesLancees, setPartiesLancees] = useState();
  const [erreur, setErreur] = useState();

  const {username} = useParams();

  useEffect(() => {
    function fetchGames() {
      return fetch(urlApi+"score/user/?username="+username, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then(response => {setIsLoading(false); return response.json()});
    }
    fetchGames().then(data => {setDataJoueur(data); setDateInscription(data.signup_date); setPartiesLancees(data.played_games)})
    .catch(() => {setErreur("Le joueur n'existe pas"); setIsLoading(false)});
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
    <Page titre={username}>
      {isLoading &&
        <div className="flex justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      }
      {!isLoading && !erreur &&
        <div className="flex flex-col items-center gap-5 mt-3">
          <ResumeStatsGeneral stats={stats} dateInscription={formatDate(dateInscription)} partiesLancees={partiesLancees}/>
          {dataJoueur.games && <HistoriqueParties listeParties={dataJoueur.games} username={username}/>}
        </div>
      }
      {!isLoading && erreur && <p className="text-center text-red-500">{erreur}</p>}
    </Page>
  );
}