import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import ResultatsProvider from './components/store/ResultatsProvider';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Jeu from "./pages/Jeu";
import { drapeauxEurope, drapeauxONU } from "./utils/ImportDrapeaux";

export default function App() {
  return (
    <ResultatsProvider>
      <DrapeauxUtilisesProvider>
        <HashRouter>
          <Routes>
            <Route exact path="/" element={<Navigate to="/drapeaux_react" replace />} />
            <Route exact path="/drapeaux_react" element={<Accueil />} />
            <Route exact path="/drapeaux_react/europe" element={<Jeu drapeaux={drapeauxEurope} />} />
            <Route exact path="/drapeaux_react/onu" element={<Jeu drapeaux={drapeauxONU} />} />
          </Routes>
        </HashRouter>
      </DrapeauxUtilisesProvider>
    </ResultatsProvider>
  );
}
