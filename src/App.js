import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import ResultatsProvider from './components/store/ResultatsProvider';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Jeu from "./pages/Jeu";
import { drapeauxEurope, drapeauxONU } from "./utils/ImportDrapeaux";
import Scores from './pages/Scores';

export default function App() {
  return (
    <ResultatsProvider>
      <DrapeauxUtilisesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/europe" element={<Jeu drapeaux={drapeauxEurope}/>} />
            <Route path="/onu" element={<Jeu drapeaux={drapeauxONU}/>} />
            <Route path="/scores" element={<Scores/>} />
          </Routes>
        </BrowserRouter>
      </DrapeauxUtilisesProvider>
    </ResultatsProvider>
  );
}
