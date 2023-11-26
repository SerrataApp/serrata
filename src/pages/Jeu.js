import { useEffect, useState, useContext } from 'react';

import Page from './Page';
import ListeDrapeaux from '../components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from '../components/zone_de_jeu/ZoneDeJeu';
import Informations from '../components/informations/Informations';
import Resultats from '../components/resultats/Resultats';
import ResultatsContext from '../components/store/resultats-context';
import urlApi from '../utils/urlApi';
import ConnexionContext from '../components/store/connexion-context';

export default function Jeu(props) {
  const [resultatsAffiches, setResultatsAffiches] = useState(false);
  const [drapeaux, setDrapeaux] = useState([...props.drapeaux]);

  const ctxResultats = useContext(ResultatsContext);
  const ctxConnexion = useContext(ConnexionContext);

  function numeroMode() {
    switch(props.titre) {
      case "Monde": return 0;
      case "Europe": return 1;
      case "Afrique": return 2;
      case "Asie": return 3;
    }
  }

  useEffect(() => {
    if(ctxResultats.estFini && ctxResultats.temps>0) {
      setResultatsAffiches(true);

      const numMode = numeroMode();

      fetch(urlApi+"score/user/?user_id="+ctxConnexion.id)
      .then(response => response.json())
      .then(data => {
        let partiesTriees = [];
        if(data.length>0) {
          partiesTriees = data.filter(game => game.game_mode === numMode);
        }
        let temps_min = null;
        if(partiesTriees.length>0) {
          temps_min = partiesTriees[0].time;
          for(let game of partiesTriees) {
            if(game.time<temps_min) {
              temps_min = game.time
            }
          }
        }
        return temps_min;
      })
      .then(temps_min => {
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
            public: temps_min===null || ctxResultats.temps <= temps_min
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
    <Page titre={`Drapeaux ${props.titre}`}>
      {resultatsAffiches && <Resultats categorie={props.titre} onClose={relancer}/>}
      <div className='flex flex-col items-center gap-5 mt-3'>
        <Informations longueur={drapeaux.length}/>
        <ZoneDeJeu drapeaux={drapeaux}/>
        <ListeDrapeaux drapeaux={drapeaux}/>
      </div>
    </Page>
  );
}