import { useState } from "react";
import Page from "./Page";
import urlApi from "../utils/urlApi";
import ListeResultats from "../components/Recherche/ListeResultats";

export default function Recherche() {
  const [input, setInput] = useState("");
  const [resultats, setResultats] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function onChangeHandler(e) {
    setInput(e.target.value);
    if(e.target.value!=="") {
      setIsLoading(true);
      fetch(urlApi+`users/search/?username=${e.target.value}&limit=10`)
      .then(response => response.json())
      .then(data => {setResultats(data); setErreur(null); setIsLoading(false)})
      .catch(e => {setErreur(e); setIsLoading(false)});
    } else {
      setResultats([]);
    }
  }

  return(
    <Page titre="Recherche">
      <div className="flex flex-col items-center">
        <input type="text" className="border rounded p-2 shadow-sm" onChange={onChangeHandler} value={input} autoFocus={true} placeholder="Rechercher un profil"/>
        {!erreur && input!=="" && !isLoading && <ListeResultats resultats={resultats}/>}
        {erreur && !isLoading && <p>{erreur}</p>}
      </div>
    </Page>
  );
}