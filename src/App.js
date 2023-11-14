import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import ResultatsProvider from './components/store/ResultatsProvider';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Jeu from "./pages/Jeu";
import Profil from "./pages/Profil";
import { drapeauxAfrique, drapeauxAsie, drapeauxEurope, drapeauxMonde } from "./utils/ImportDrapeaux";
import Scores from './pages/Scores';
import Connexion from './pages/Connexion';

export default function App() {
  return (
    <div className="h-screen overflow-auto bg-primary">
      <ResultatsProvider>
        <DrapeauxUtilisesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/europe" element={<Jeu drapeaux={drapeauxEurope} titre="Europe"/>} />
              <Route path="/monde" element={<Jeu drapeaux={drapeauxMonde} titre="Monde"/>}/>
              <Route path="/afrique" element={<Jeu drapeaux={drapeauxAfrique} titre="Afrique"/>} />
              <Route path="/asie" element={<Jeu drapeaux={drapeauxAsie} titre="Asie"/>} />
              <Route path="/scores" element={<Scores/>} />
              <Route path="/profil" element={<Profil/>} />
              <Route path="/connexion" element={<Connexion/>} />
            </Routes>
          </BrowserRouter>
        </DrapeauxUtilisesProvider>
      </ResultatsProvider>
    </div>
  );
}
