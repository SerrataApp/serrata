import ListeDrapeaux from './components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from './components/zone_de_jeu/ZoneDeJeu';

function App() {
  return (
    <div className='flex flex-col items-center gap-10'>
      <h1 className='underline'>Drapeaux Europe</h1>
      <ZoneDeJeu/>
      <ListeDrapeaux/>
    </div>
  );
}

export default App;
