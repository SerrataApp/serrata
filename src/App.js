import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import ResultatsProvider from './components/store/ResultatsProvider';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Jeu from "./pages/Jeu";
import { drapeauxEurope, drapeauxONU } from "./utils/ImportDrapeaux";

export default function App() {
  return (
    <ResultatsProvider>
      <DrapeauxUtilisesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Accueil />} />
            <Route exact path="/europe" element={<Jeu drapeaux={drapeauxEurope} />} />
            <Route exact path="/onu" element={<Jeu drapeaux={drapeauxONU} />} />
          </Routes>
        </BrowserRouter>
      </DrapeauxUtilisesProvider>
    </ResultatsProvider>
  );
}
