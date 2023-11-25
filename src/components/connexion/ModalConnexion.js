import Modal from "../Modal/Modal";
import { useRef, useState } from "react";

export default function ModalConnexion(props) {
  const [erreur, setErreur] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const inputPseudo = useRef();
  const inputMdp = useRef();

  function onClose() {
    window.location.reload();
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    setErreur(null);
    const url = "http://127.0.0.1:8000/token";
    const formData = new URLSearchParams();
    formData.append("username", inputPseudo.current.value);
    formData.append("password", inputMdp.current.value);

    fetch(url, {
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
        setIsLoading(false);
      });
    })
    .catch(() => {setErreur("Erreur, veuillez réessayer"); setIsLoading(false)})
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl">Connexion</h2>
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center p-4 gap-3 rounded">
          <label className="flex flex-col">
            Pseudo
            <input type="text" className="border" ref={inputPseudo}/>
          </label>
          <label className="flex flex-col">
            Mot de passe
            <input type="password" className="border" ref={inputMdp}/>
          </label>
          <div className="flex gap-2">
            <input type="submit" value="Se connecter" className="rounded border p-2 transition-all duration-200 bg-green-400 hover:bg-green-500"/>
            <input type="button" onClick={onClose} value="Annuler" className="rounded border p-2 transition-all duration-200 bg-red-400 hover:bg-red-500"/>
          </div>
          <div className="h-5 text-red-500">{erreur}</div>
          {isLoading && <span className="loading loading-spinner"></span>}
        </form>
      </div>
    </Modal>
  )
}