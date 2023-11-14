import { useEffect, useState, useContext } from 'react';

import Page from './Page';
import ListeDrapeaux from '../components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from '../components/zone_de_jeu/ZoneDeJeu';
import Informations from '../components/informations/Informations';
import Resultats from '../components/resultats/Resultats';
import Cookies from 'js-cookie';
import ResultatsContext from '../components/store/resultats-context';

export default function Jeu(props) {
  const [resultatsAffiches, setResultatsAffiches] = useState(false);
  const [drapeaux, setDrapeaux] = useState([...props.drapeaux]);

  const ctx = useContext(ResultatsContext);

  function finPartie() {
    setResultatsAffiches(true);

    const scoreData = {
      game_mode: 1,
      time: "18:19:07.391Z",
      errors: ctx.erreurs,
      hint: ctx.indices,
      player_id: 1,
      public: true,
    };

    const url = "http://localhost:8000/score/";

    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("token")}`
      },
      body: JSON.stringify(scoreData),
    })
  }

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
        <ZoneDeJeu drapeaux={drapeaux} onTermine={finPartie}/>
        <ListeDrapeaux drapeaux={drapeaux}/>
      </div>
    </Page>
  );
}