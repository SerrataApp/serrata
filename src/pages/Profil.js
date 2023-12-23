import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import HistoriqueParties from "../components/profil/HistoriqueParties";
import ResumeStatsGeneral from "../components/profil/ResumeStatsGeneral";
import Page from "./Page";
import urlApi from "../utils/urlApi";
import formatDate from "../utils/formatDate";
import ActionsAdmin from "../components/profil/ActionsAdmin";
import ConnexionContext from "../components/store/connexion-context";
import LanguageContext from "../components/store/language-context";
import langpack from "../lang/langpack.json";

export default function Profil() {
  const [dataJoueur, setDataJoueur] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dateInscription, setDateInscription] = useState();
  const [partiesLancees, setPartiesLancees] = useState();
  const [erreur, setErreur] = useState();

  const {username} = useParams();

  const ctxConnexion = useContext(ConnexionContext);

  const lang = useContext(LanguageContext).lang;

  useEffect(() => {
    async function fetchGames() {
      let response = await fetch(urlApi + "score/user/?username=" + username, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      });
      let data = await response.json();
      if(ctxConnexion.admin) {
        response = await fetch(urlApi + "adminusers/?user_id=" + data.id, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
          }
        })
        data = await {
          ...data,
          ...await response.json()
        }
      }
      setIsLoading(false);
      return data;
    }
    fetchGames().then(data => {setDataJoueur(data); setDateInscription(data.signup_date); setPartiesLancees(data.played_games)})
    .catch(() => {setErreur(langpack["prof_err_existepas"][lang]); setIsLoading(false)});
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
          {ctxConnexion.admin && <ActionsAdmin user={dataJoueur}/>}
          <ResumeStatsGeneral stats={stats} dateInscription={formatDate(dateInscription)} partiesLancees={partiesLancees}/>
          {dataJoueur.games && <HistoriqueParties listeParties={dataJoueur.games} username={username} setIsLoading={setIsLoading}/>}
        </div>
      }
      {!isLoading && erreur &&
        <div className="flex flex-col gap-3 items-center">
          <p className="text-red-500">{erreur}</p>
          <a className="btn" href="/">{langpack["prof_retour_acc"][lang]}</a>
        </div>
      }
    </Page>
  );
}