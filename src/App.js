import ListeDrapeaux from './components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from './components/zone_de_jeu/ZoneDeJeu';
import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import Informations from './components/informations/Informations';

function App() {
  return (
    <DrapeauxUtilisesProvider>
      <div className='flex flex-col items-center gap-10'>
        <h1 className='underline'>Drapeaux Europe</h1>
        <Informations/>
        <ZoneDeJeu/>
        <ListeDrapeaux/>
      </div>
    </DrapeauxUtilisesProvider>
  );
}

export default App;
