import { useEffect, useState, useContext } from 'react';

import Page from './Page';
import ListeDrapeaux from '../components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from '../components/zone_de_jeu/ZoneDeJeu';
import Informations from '../components/informations/Informations';
import Resultats from '../components/resultats/Resultats';
import ResultatsContext from '../components/store/resultats-context';
import UrlApi from '../utils/UrlApi';

export default function Jeu(props) {
  const [resultatsAffiches, setResultatsAffiches] = useState(false);
  const [drapeaux, setDrapeaux] = useState([...props.drapeaux]);

  const ctx = useContext(ResultatsContext);

  function numeroMode() {
    switch(props.titre) {
      case "Monde": return 0;
      case "Europe": return 1;
      case "Afrique": return 2;
      case "Asie": return 3;
    }
  }

  useEffect(() => {
    if(ctx.estFini && ctx.temps>0) {
      setResultatsAffiches(true);
      console.log(ctx);

      const numMode = numeroMode();
      console.log("mode:"+numMode);

      const scoreData = {
        game_mode: numMode,
        time: ctx.temps,
        errors: ctx.erreurs,
        hint: ctx.indices,
        player_id: 1,
        public: true,
      };

      fetch(UrlApi+"score", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(scoreData),
      })
    }
  }, [ctx.estFini, ctx.temps]);

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