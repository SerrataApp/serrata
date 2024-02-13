import { useState, useReducer } from "react";
import Page from "../../pages/Page";
import AjoutImage from "./AjoutImage";
import InfosMode from "./InfosMode";

function infosModeReducer(state, action) {
  if(action.type === "SET_NOM") {
    return {
      ...state,
      nom: action.value
    }
  }
  if(action.type === "SET_LANGUE") {
    return {
      ...state,
      langue: action.value
    }
  }
  if(action.type === "SET_DESCRIPTION") {
    return {
      ...state,
      description: action.value
    }
  }
  if(action.type === "RESET") {
    return {
      ...state,
      nom: "",
      description: "",
      vignette: null
    }
  }
}

export default function CreationCustom() {
  const [listeImages, setListeImages] = useState([]);
  const [infosMode, dispatchInfosMode] = useReducer(infosModeReducer, {nom: "", langue:"fr", description: "", vignette: null});

  function ajouterImage() {
    let nvKey = 0;
    if(listeImages.length > 0) {
      nvKey = listeImages.reduce((max, item) => (item.key > max ? item.key : max), -1) + 1;
    }
    setListeImages([{key: nvKey}, ...listeImages]);
  }

  function modifierAttibut(index, attribut, valeur) {
    const tmpListe = [...listeImages];
    tmpListe[index] = {
      ...tmpListe[index],
      [attribut]: valeur
    };
    setListeImages(tmpListe);
  }

  function supprimerImage(index) {
    setListeImages(listeImages.filter((_, i) => i !== index))
  }

  function onResetHandler() {
    setListeImages([]);
    dispatchInfosMode({type: "RESET"});
  }

  const divsImages = listeImages.map((image, index) => <AjoutImage key={image.key} index={index} supprimer={supprimerImage} modifierAttibut={modifierAttibut}/>)

  return (
    <Page titre="Créer un mode de jeu">
      <div className="w-full flex justify-center mb-6">
        <div className="w-[80%] md:w-[70%] lg:w-[60%] flex flex-col gap-3">
          <InfosMode infosMode={infosMode} dispatchInfosMode={dispatchInfosMode}/>
          <div className="flex justify-between">
            <span>Total : {divsImages.length}</span>
            <button onClick={ajouterImage} className="border border-black rounded w-5 h-5 flex justify-center items-center hover:shadow-md transition-shadow duration-150">+</button>
          </div>
          {divsImages}
        </div>
      </div>
      <div className="fixed w-screen flex bottom-[75px] justify-center">
        <div className="flex gap-4 bg-white rounded-xl border border-black p-3 shadow-lg">
          <button className="p-2 rounded shadow-md bg-red-500 hover:bg-red-400 transition-bg duration-150">Annuler</button>
          <button className="p-2 rounded shadow-md bg-blue-500 hover:bg-blue-400 transition-bg duration-150" onClick={onResetHandler}>Réinitialiser</button>
          <button className="p-2 rounded shadow-md bg-green-500 hover:bg-green-400 transition-bg duration-150">Valider</button>
        </div>
      </div>
    </Page>
  );
}