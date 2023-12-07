import ConnexionContext from "../components/store/connexion-context";
import urlApi from "../utils/urlApi";
import Page from "./Page";
import { useContext, useRef, useState } from "react";

export default function Inscription() {
  const [erreur, setErreur] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refPseudo = useRef();
  const refEmail = useRef();
  const refMdp = useRef();
  const refMdp2 = useRef();

  const ctxConnexion = useContext(ConnexionContext);

  if(ctxConnexion.connecte) {
    window.location.href = "/";
  }

  function connexionRedirection() {
    const formData = new URLSearchParams();
    formData.append("username", refPseudo.current.value);
    formData.append("password", refMdp.current.value);

    fetch(urlApi+"token", {
      method: "POST",
      mode: "cors",
      headers: {
        "Accept": "application/json"
      },
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      window.localStorage.setItem("token", data.access_token);
      window.location.href = "/";
    })
    .catch(e => {
      setErreur(e);
      setIsLoading(false);
    })
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    setErreur(null);
    if(refMdp.current.value!==refMdp2.current.value) {
      setErreur("Les mots de passe ne correspondent pas.");
    } else {
      setIsLoading(true);

      const dateActuelle = new Date();
      const annee = dateActuelle.getFullYear();
      const mois = ('0' + (dateActuelle.getMonth() + 1)).slice(-2);
      const jour = ('0' + dateActuelle.getDate()).slice(-2);

      fetch(urlApi+"signup", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: refPseudo.current.value,
          email: refEmail.current.value,
          password: refMdp.current.value,
          signup_date: `${annee}-${mois}-${jour}`
        })
      })
      .then(response =>
        response.json()
        .then(data => {
          switch(response.status) {
            case 200: connexionRedirection(); break;
            case 400: setErreur(data.detail); break;
            case 401: setErreur(data.detail); break;
            case 422: setErreur(`Champ manquant : ${data.detail[0].loc[1]}`); break;
            default: setErreur("Erreur, veuillez réessayer");
          }
          if(response.status!==200) {
            setIsLoading(false);
          }
        })
      )
    }
  }

  return(
    <Page titre="Inscription">
      <div className="flex justify-center w-screen">
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3 items-center border bg-gray-100 rounded p-5">
          <label className="flex flex-col">
            Pseudo
            <input type="text" className="border p-1 rounded" ref={refPseudo} required autoFocus={true}/>
          </label>
          <label className="flex flex-col">
            Adresse mail
            <input type="email" className="border p-1 rounded" ref={refEmail} required/>
          </label>
          <label className="flex flex-col">
            Mot de passe
            <input type="password" className="border p-1 rounded" ref={refMdp} required/>
          </label>
          <label className="flex flex-col">
            Confirmer mot de passe
            <input type="password" className="border p-1 rounded" ref={refMdp2} required/>
          </label>
          <label>
            <input type="checkbox" className="mr-1" required/>
            J'ai lu et j'accepte les <a href="/cgu" className="text-blue-500 hover:underline">CGUs</a>
          </label>
          <button type="submit" className="btn bg-blue-400 hover:bg-blue-500">Créer un compte</button>
          {erreur && <div className="h-5 text-red-500">{erreur}</div>}
          {isLoading && <span className="loading loading-spinner"></span>}
        </form>
      </div>
    </Page>
  );
}