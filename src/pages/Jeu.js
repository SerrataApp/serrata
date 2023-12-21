import { useEffect, useState, useContext } from 'react';

import Page from './Page';
import ListeDrapeaux from '../components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from '../components/zone_de_jeu/ZoneDeJeu';
import Informations from '../components/informations/Informations';
import Resultats from '../components/resultats/Resultats';
import ResultatsContext from '../components/store/resultats-context';
import urlApi from '../utils/urlApi';
import ConnexionContext from '../components/store/connexion-context';
import langpack from "../lang/langpack.json";
import LanguageContext from '../components/store/language-context';

export default function Jeu(props) {
  const [resultatsAffiches, setResultatsAffiches] = useState(false);
  const [drapeaux, setDrapeaux] = useState([...props.drapeaux]);

  const ctxResultats = useContext(ResultatsContext);
  const ctxConnexion = useContext(ConnexionContext);

  const lang = useContext(LanguageContext).lang;

  function numeroMode() {
    switch(props.titre) {
      case langpack["rub_mo"][localStorage.getItem("lang")]: return 0;
      case langpack["rub_eu"][localStorage.getItem("lang")]: return 1;
      case langpack["rub_af"][localStorage.getItem("lang")]: return 2;
      case langpack["rub_as"][localStorage.getItem("lang")]: return 3;
      case langpack["rub_am"][localStorage.getItem("lang")]: return 4;
      case langpack["rub_oc"][localStorage.getItem("lang")]: return 5;
    }
  }

  useEffect(() => {
    if(ctxResultats.estFini && ctxResultats.temps>0) {
      setResultatsAffiches(true);

      const numMode = numeroMode();

      fetch(urlApi+"score/user/?username="+ctxConnexion.username)
      .then(response => response.json())
      .then(data => {
        let partiesTriees = [];
        if(data.games.length>0) {
          partiesTriees = data.games.filter(game => game.game_mode === numMode);
          partiesTriees = partiesTriees.filter(game => game.public);
        }
        let temps_min = null;
        let id_min = null;
        if(partiesTriees.length>0) {
          temps_min = partiesTriees[0].time;
          id_min = partiesTriees[0].id;
          for(let game of partiesTriees) {
            if(game.time<temps_min) {
              temps_min = game.time;
              id_min = game.id;
            }
          }
        }
        if(temps_min && ctxResultats.temps<=temps_min) {
          fetch(urlApi+"score/changeState/?game_id="+id_min, {
            method:"PUT",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${window.localStorage.getItem("token")}`
              }
          });
        }
        return temps_min;
      })
      .then(temps_min => {
        const dateActuelle = new Date();
        const annee = dateActuelle.getFullYear();
        const mois = ('0' + (dateActuelle.getMonth() + 1)).slice(-2);
        const jour = ('0' + dateActuelle.getDate()).slice(-2);

        fetch(urlApi+"score", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            game_mode: numMode,
            time: ctxResultats.temps,
            errors: ctxResultats.erreurs,
            hint: ctxResultats.indices,
            player_id: ctxConnexion.id,
            public: temps_min===null || ctxResultats.temps <= temps_min,
            game_date: `${annee}-${mois}-${jour}`
          }),
        })
      })
    }
  }, [ctxResultats.estFini, ctxResultats.temps]);

  function relancer() {
    window.location.reload();
  }

  useEffect(() => {
    setDrapeaux([...props.drapeaux])
  }, [props.drapeaux])

  return (
    <Page titre={`${langpack["jou_drap"][lang]} - ${props.titre}`}>
      {resultatsAffiches && <Resultats categorie={props.titre} onClose={relancer}/>}
      <div className='flex flex-col items-center gap-5 mt-3'>
        <Informations longueur={drapeaux.length}/>
        <ZoneDeJeu drapeaux={drapeaux}/>
        <ListeDrapeaux drapeaux={drapeaux}/>
      </div>
    </Page>
  );
}