import { useState } from 'react';

import ListeDrapeaux from './components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from './components/zone_de_jeu/ZoneDeJeu';
import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import Informations from './components/informations/Informations';
import ResultatsProvider from './components/store/ResultatsProvider';
import Resultats from './components/Modal/Resultats';

function App() {
  const [resultatsAffiches, setResultatsAffiches] = useState(false);

  function afficherResultats() {
    setResultatsAffiches(true);
  }

  function relancer() {
    window.location.reload();
  }

  return (
    <ResultatsProvider>
      <DrapeauxUtilisesProvider>
        {resultatsAffiches && <Resultats onClose={relancer}/>}
        <div className='flex flex-col items-center gap-10'>
          <h1 className='underline'>Drapeaux Europe</h1>
          <Informations/>
          <ZoneDeJeu onTermine={afficherResultats}/>
          <ListeDrapeaux/>
        </div>
      </DrapeauxUtilisesProvider>
    </ResultatsProvider>
  );
}

export default App;
