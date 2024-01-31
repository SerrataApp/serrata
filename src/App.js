import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import ResultatsProvider from './components/store/ResultatsProvider';
import LanguageProvider from './components/store/LanguageProvider'
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
import LanguageContext from './components/store/language-context';
import langpack from "./lang/langpack.json";
import ModalCGU from './components/cgu/ModalCGU';

export default function App() {
  const ctxConnexion = useContext(ConnexionContext);
  const ctxLanguage = useContext(LanguageContext);
  const lang = ctxLanguage.lang;
  const [isLoading, setIsLoading] = useState(true);
  const [afficheCGU, setAfficheCGU] = useState();

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
          if(response.ok) {
            ctxConnexion.connecter(data.user.username, data.user.id, data.user.admin);
            if(!data.user.cgu && window.location.pathname!=="/cgu") {
              setAfficheCGU(true);
            }
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

  if(!window.localStorage.getItem("lang") || (localStorage.getItem("lang")!=="fr" && localStorage.getItem("lang")!=="en")) {
    localStorage.setItem("lang", "fr");
    ctxLanguage.setLangue("fr");
    window.location.reload();
  }

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

  function RedirectScores() {
    const navigate = useNavigate();

    useEffect(() => {
      navigate('/scores/europe', { replace: true });
    }, [navigate]);

    return null;
  }

  function modalCGUHandler(accepte) {
    if(accepte) {
      setAfficheCGU(false)
    } else {
      if(!ctxConnexion.connecte) {
        setAfficheCGU(false);
      }
    }
  }

  if(!isLoading) return (
    <div className="h-screen overflow-auto bg-white">
      <ResultatsProvider>
        <DrapeauxUtilisesProvider>
          <LanguageProvider>
            <BrowserRouter>
              {afficheCGU && <ModalCGU onClose={modalCGUHandler}/>}
              <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/europe" element={<Jeu drapeaux={drapeauxEurope} titre={langpack["rub_eu"][lang]}/>}/>
                <Route path="/monde" element={<Jeu drapeaux={drapeauxMonde} titre={langpack["rub_mo"][lang]}/>}/>
                <Route path="/afrique" element={<Jeu drapeaux={drapeauxAfrique} titre={langpack["rub_af"][lang]}/>} />
                <Route path="/asie" element={<Jeu drapeaux={drapeauxAsie} titre={langpack["rub_as"][lang]}/>} />
                <Route path="/amerique" element={<Jeu drapeaux={drapeauxAmerique} titre={langpack["rub_am"][lang]}/>} />
                <Route path="/oceanie" element={<Jeu drapeaux={drapeauxOceanie} titre={langpack["rub_oc"][lang]}/>} />
                <Route path="/scores" element={<RedirectScores />} />
                <Route path="/scores/:continent" element={<Scores/>} />
                <Route path="/inscription" element={<Inscription/>} />
                <Route path="/profil/:username" element={<Profil/>} />
                <Route path="/profil" element={<RedirectProfil />} />
                <Route path="/mentionslegales" element={<MentionsLegales />} />
                <Route path="/cgu" element={<CGU />} />
                <Route path="*" element={<RedirectAccueil />} />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </DrapeauxUtilisesProvider>
      </ResultatsProvider>
    </div>
  );
}
