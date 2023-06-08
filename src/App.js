import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import ResultatsProvider from './components/store/ResultatsProvider';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Jeu from "./pages/Jeu";
import { drapeauxEurope, drapeauxONU } from "./utils/ImportDrapeaux";

export default function App() {
  return (
    <ResultatsProvider>
      <DrapeauxUtilisesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/drapeaux_react" replace />} />
            <Route path="/drapeaux_react" element={<Accueil />} />
            <Route path="/drapeaux_react/europe" element={<Jeu drapeaux={drapeauxEurope} />} />
            <Route path="/drapeaux_react/onu" element={<Jeu drapeaux={drapeauxONU} />} />
          </Routes>
        </Router>
      </DrapeauxUtilisesProvider>
    </ResultatsProvider>
  );
}
