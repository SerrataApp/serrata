import urlApi from "../../utils/urlApi";
import Modal from "../Modal/Modal";
import { useRef, useState } from "react";

export default function ModalConnexion(props) {
  const [erreur, setErreur] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputPseudo = useRef();
  const inputMdp = useRef();

  function onClose() {
    if(!props.onClose) {
      window.location.reload();
    } else {
      props.onClose();
    }
  }

  function onCancel() {
    if(!props.onCancel) {
      onClose();
    } else {
      props.onCancel();
    }
  }

  function toggleShowPassword(e) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  function onPasswordKeyPressHandler(e) {
    if (e.key === 'Enter') {
      onSubmitHandler(e);
    }
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    setErreur(null);
    const formData = new URLSearchParams();
    formData.append("username", inputPseudo.current.value);
    formData.append("password", inputMdp.current.value);

    fetch(urlApi+"token", {
      method: "POST",
      mode: "cors",
      headers: {
        "Accept": "application/json"
      },
      body: formData,
    })
    .then(response => {
      response.json()
      .then(data => {
        switch(response.status) {
          case 200: window.localStorage.setItem("token", data.access_token); onClose(); break;
          case 401: setErreur(data.detail); break;
          case 422: setErreur(`Champ manquant : ${data.detail[0].loc[1]}`); break;
          default: setErreur("Erreur, veuillez réessayer");
        }
      });
    })
    .catch(() => {setErreur("Erreur, veuillez réessayer"); setIsLoading(false)})
  }

  return (
    <Modal onClose={onCancel}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl">Connexion</h2>
        <p className="italic text-gray-500 text-center">
          Il faut être connecté pour jouer à Serrata,
          <br/>
          ce sera prochainement possible de jouer sans compte.
        </p>
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center p-4 gap-3 rounded w-[250px]">
          <label className="flex flex-col w-full">
            Pseudo ou Email
            <input type="text" className="border rounded p-1" ref={inputPseudo} required autoFocus={true}/>
          </label>
          <label className="flex flex-col w-full">
            Mot de passe
            <div className="flex gap-1">
              <input onKeyDown={onPasswordKeyPressHandler} type={showPassword ? 'text' : 'password'} className="border rounded p-1 w-full" ref={inputMdp} required/>
              <button onClick={toggleShowPassword} className="border bg-gray-100 w-fit p-1 rounded">{showPassword?"Cacher":"Montrer"}</button>
            </div>
          </label>
          <div className="flex gap-2 w-full">
            <input type="submit" value="Se connecter" className="w-1/2 rounded border p-2 transition-all duration-200 bg-green-400 hover:bg-green-500"/>
            <input type="button" onClick={onCancel} value="Annuler" className="w-1/2 rounded border p-2 transition-all duration-200 bg-red-400 hover:bg-red-500"/>
          </div>
          {erreur && <div className="h-5 whitespace-nowrap inline text-red-500 text-center">{erreur}</div>}
          {isLoading && !erreur && <span className="loading loading-spinner"></span>}
          <p className="whitespace-nowrap inline">Pas encore inscrit ? <a href="/inscription" className="text-blue-500 hover:underline">Créer un compte</a></p>
        </form>
      </div>
    </Modal>
  )
}