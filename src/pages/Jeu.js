import { useEffect, useState, useContext } from 'react';

import Page from './Page';
import ListeDrapeaux from '../components/drapeaux/ListeDrapeaux';
import ZoneDeJeu from '../components/zone_de_jeu/ZoneDeJeu';
import Informations from '../components/informations/Informations';
import Resultats from '../components/resultats/Resultats';
import ResultatsContext from '../components/store/resultats-context';
import urlApi from '../utils/urlApi';
import langpack from "../lang/langpack.json";
import LanguageContext from '../components/store/language-context';

export default function Jeu(props) {
  const [resultatsAffiches, setResultatsAffiches] = useState(false);
  const [drapeaux, setDrapeaux] = useState([...props.drapeaux]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBest, setIsBest] = useState();
  const [gameId, setGameId] = useState();

  const ctxResultats = useContext(ResultatsContext);

  const lang = useContext(LanguageContext).lang;

  function numeroMode() {
    switch(props.titre) {
      case langpack["rub_mo"][localStorage.getItem("lang")]: return 1;
      case langpack["rub_eu"][localStorage.getItem("lang")]: return 2;
      case langpack["rub_af"][localStorage.getItem("lang")]: return 3;
      case langpack["rub_as"][localStorage.getItem("lang")]: return 4;
      case langpack["rub_am"][localStorage.getItem("lang")]: return 5;
      case langpack["rub_oc"][localStorage.getItem("lang")]: return 6;
    }
  }

  useEffect(() => {
    if(ctxResultats.estFini && ctxResultats.temps>0) {
      setIsLoading(true);
      setResultatsAffiches(true);

      const numMode = numeroMode();
      
      fetch(urlApi+"game", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          gameMode: numMode,
          time: ctxResultats.temps,
          errors: ctxResultats.erreurs,
          hint: ctxResultats.indices
        }),
      })
      .then(response => response.json())
      .then(data => {
        setGameId(data.id);
        setIsBest(data.best);
        setIsLoading(false);
      });
    }
  }, [ctxResultats.estFini, ctxResultats.temps]);

  function relancer() {
    window.location.reload();
  }

  useEffect(() => {
    setDrapeaux([...props.drapeaux])
  }, [props.drapeaux])

  return (
    <Page titre={`${langpack["jou_drap"][lang]} - ${props.titre}`}>
      {resultatsAffiches && <Resultats categorie={props.titre} onClose={relancer} isLoading={isLoading} isBest={isBest} gameId={gameId}/>}
      <div className='flex flex-col items-center gap-5 mt-3'>
        <Informations longueur={drapeaux.length}/>
        <ZoneDeJeu drapeaux={drapeaux}/>
        <ListeDrapeaux drapeaux={drapeaux}/>
      </div>
    </Page>
  );
}