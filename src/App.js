import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import ResultatsProvider from './components/store/ResultatsProvider';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Jeu from "./pages/Jeu";
import { drapeauxAfrique, drapeauxEurope, drapeauxONU } from "./utils/ImportDrapeaux";
import Scores from './pages/Scores';

export default function App() {
  return (
    <ResultatsProvider>
      <DrapeauxUtilisesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/europe" element={<Jeu drapeaux={drapeauxEurope} titre="Europe"/>} />
            <Route path="/onu" element={<Jeu drapeaux={drapeauxONU} titre="ONU"/>}/>
            <Route path="/afrique" element={<Jeu drapeaux={drapeauxAfrique} titre="Afrique"/>} />
            <Route path="/scores" element={<Scores/>} />
          </Routes>
        </BrowserRouter>
      </DrapeauxUtilisesProvider>
    </ResultatsProvider>
  );
}
