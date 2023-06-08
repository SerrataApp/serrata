import { useEffect, useState } from 'react';

import ListeDrapeaux from '../components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from '../components/zone_de_jeu/ZoneDeJeu';
import Informations from '../components/informations/Informations';
import Resultats from '../components/Modal/Resultats';

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
        <h1>Drapeaux {drapeaux.length===46 ? "Europe" : "ONU"}</h1>
        <Informations longueur={drapeaux.length}/>
        <ZoneDeJeu drapeaux={drapeaux} onTermine={afficherResultats}/>
        <ListeDrapeaux drapeaux={drapeaux}/>
      </div>
    </>
  );
}