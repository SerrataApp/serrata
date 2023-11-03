import { useEffect, useState } from 'react';

import Page from './Page';
import ListeDrapeaux from '../components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from '../components/zone_de_jeu/ZoneDeJeu';
import Informations from '../components/informations/Informations';
import Resultats from '../components/resultats/Resultats';

export default function Jeu(props) {
  const [resultatsAffiches, setResultatsAffiches] = useState(false);
  const [drapeaux, setDrapeaux] = useState([...props.drapeaux]);

  function afficherResultats() {
    setResultatsAffiches(true);
  }

  function relancer() {
    window.location.reload();
  }

  useEffect(() => {
    setDrapeaux([...props.drapeaux])
  }, [props.drapeaux])

  return (
    <Page>
      {resultatsAffiches && <Resultats categorie={props.titre} onClose={relancer}/>}
      <div className='flex flex-col items-center gap-10'>
        <h2>Drapeaux {props.titre}</h2>
        <Informations longueur={drapeaux.length}/>
        <ZoneDeJeu drapeaux={drapeaux} onTermine={afficherResultats}/>
        <ListeDrapeaux drapeaux={drapeaux}/>
      </div>
    </Page>
  );
}