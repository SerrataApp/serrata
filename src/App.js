import { useEffect, useState } from 'react';

import ListeDrapeaux from './components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from './components/zone_de_jeu/ZoneDeJeu';
import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import Informations from './components/informations/Informations';
import ResultatsProvider from './components/store/ResultatsProvider';
import Resultats from './components/Modal/Resultats';
import { drapeauxEurope, drapeauxONU } from './utils/ImportDrapeaux';

function App() {
  const [resultatsAffiches, setResultatsAffiches] = useState(false);
  const [modeSelectionne, setModeSelectionne] = useState("europe");
  const [drapeaux, setDrapeaux] = useState([...drapeauxEurope]);

  function onChooseHandler(event) {
    setModeSelectionne(event.target.value);
  }

  function afficherResultats() {
    setResultatsAffiches(true);
  }

  function relancer() {
    window.location.reload();
  }

  useEffect(() => {
    if(modeSelectionne==="europe") {
      setDrapeaux([...drapeauxEurope]);
    } else if(modeSelectionne==="onu") {
      setDrapeaux([...drapeauxONU]);
    }
  }, [modeSelectionne]);

  return (
    <ResultatsProvider>
      <DrapeauxUtilisesProvider>
        {resultatsAffiches && <Resultats onClose={relancer}/>}
        <div className='flex flex-col items-center gap-10'>
          <select onChange={onChooseHandler} value={modeSelectionne}>
            <option value="europe">Europe</option>
            <option value="onu">ONU</option>
          </select>
          <Informations longueur={drapeaux.length}/>
          <ZoneDeJeu drapeaux={drapeaux} onTermine={afficherResultats}/>
          <ListeDrapeaux drapeaux={drapeaux}/>
        </div>
      </DrapeauxUtilisesProvider>
    </ResultatsProvider>
  );
}

export default App;
