import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import ResultatsProvider from './components/store/ResultatsProvider';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Jeu from "./pages/Jeu";
import Profil from "./pages/Profil";
import { drapeauxAfrique, drapeauxAsie, drapeauxEurope, drapeauxMonde, drapeauxAmerique, drapeauxOceanie } from "./utils/ImportDrapeaux";
import Scores from './pages/Scores';
import { useContext, useEffect, useState } from 'react';
import ConnexionContext from './components/store/connexion-context';
import urlApi from './utils/urlApi';
import Inscription from './pages/Inscription';
import MentionsLegales from './pages/MentionsLegales';
import CGU from './pages/CGU';

export default function App() {
  const ctxConnexion = useContext(ConnexionContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(window.localStorage.getItem("token")) {
      fetch(urlApi+"users/me", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then(response => {
        response.json()
        .then(data => {
          if(response.status===200) {
            ctxConnexion.connecter(data.username, data.id, data.admin);
          } else {
            window.localStorage.removeItem("token");
          }
          setIsLoading(false);
        })
      })
    } else {
      setIsLoading(false);
    }
  }, []);

  
  function RedirectProfil() {
    const navigate = useNavigate();

    useEffect(() => {
      if(ctxConnexion.connecte) {
        navigate('/profil/'+ctxConnexion.username, { replace: true });
      } else {
        navigate('/profil/Coco', { replace: true });
      }
    }, [navigate]);

    return null;
  }

  function RedirectAccueil() {
    const navigate = useNavigate();

    useEffect(() => {
      navigate('/', { replace: true });
    }, [navigate]);

    return null;
  }

  if(!isLoading) return (
    <div className="h-screen overflow-auto bg-white">
      <ResultatsProvider>
        <DrapeauxUtilisesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/europe" element={<Jeu drapeaux={drapeauxEurope} titre="Europe"/>} />
              <Route path="/monde" element={<Jeu drapeaux={drapeauxMonde} titre="Monde"/>}/>
              <Route path="/afrique" element={<Jeu drapeaux={drapeauxAfrique} titre="Afrique"/>} />
              <Route path="/asie" element={<Jeu drapeaux={drapeauxAsie} titre="Asie"/>} />
              <Route path="/amerique" element={<Jeu drapeaux={drapeauxAmerique} titre="Amérique"/>} />
              <Route path="/oceanie" element={<Jeu drapeaux={drapeauxOceanie} titre="Océanie"/>} />
              <Route path="/scores" element={<Scores/>} />
              <Route path="/inscription" element={<Inscription/>} />
              <Route path="/profil/:username" element={<Profil/>} />
              <Route path="/profil" element={<RedirectProfil />} />
              <Route path="/mentionslegales" element={<MentionsLegales />} />
              <Route path="/cgu" element={<CGU />} />
              <Route path="*" element={<RedirectAccueil />} />
            </Routes>
          </BrowserRouter>
        </DrapeauxUtilisesProvider>
      </ResultatsProvider>
    </div>
  );
}
