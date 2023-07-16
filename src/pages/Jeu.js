import { useEffect, useState } from 'react';

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
    <>
      {resultatsAffiches && <Resultats onClose={relancer}/>}
      <div className='flex flex-col items-center gap-10'>
        <div className='text-center'>
          <a href="/" className='underline'>Retour Accueil</a>
          <h1>Drapeaux {props.titre}</h1>
        </div>
        <Informations longueur={drapeaux.length}/>
        <ZoneDeJeu drapeaux={drapeaux} onTermine={afficherResultats}/>
        <ListeDrapeaux drapeaux={drapeaux}/>
      </div>
    </>
  );
}