import ConnexionContext from "../components/store/connexion-context";
import LanguageContext from "../components/store/language-context";
import urlApi from "../utils/urlApi";
import Page from "./Page";
import { useContext, useRef, useState } from "react";
import langpack from "../lang/langpack.json";


export default function Inscription() {
  const [erreur, setErreur] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refPseudo = useRef();
  const refEmail = useRef();
  const refMdp = useRef();
  const refMdp2 = useRef();

  const ctxConnexion = useContext(ConnexionContext);

  const lang = useContext(LanguageContext).lang;

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

      fetch(urlApi+"users", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: refPseudo.current.value,
          email: refEmail.current.value,
          password: refMdp.current.value
        })
      })
      .then(response =>
        response.json()
        .then(data => {
          if(response.ok) {
            connexionRedirection();
          } else {
            if(response.status===400) {
              if(data.field) {
                if(data.field[0]==="username") {
                  setErreur("Pseudo déjà existant");
                } else {
                  setErreur("Email déjà existant");
                }
              } else {
                setErreur("Il faut remplir tous les champs");
              }
            } else {
              setErreur("Erreur, réessayez plus tard");
            }
            setIsLoading(false);
          }
        })
      )
    }
  }

  return(

    <Page titre={langpack["insc_titre"][lang]}>
      <div className="flex justify-center w-screen">
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3 items-center border bg-gray-100 rounded p-5">
          <label className="flex flex-col">
            {langpack["insc_pseudo"][lang]}
            <input type="text" className="border p-1 rounded" ref={refPseudo} required autoFocus={true}/>
          </label>
          <label className="flex flex-col">
            {langpack["insc_mail"][lang]}
            <input type="email" className="border p-1 rounded" ref={refEmail} required/>
          </label>
          <label className="flex flex-col">
          {langpack["insc_mdp"][lang]}
            <input type="password" className="border p-1 rounded" ref={refMdp} required/>
          </label>
          <label className="flex flex-col">
          {langpack["insc_conf_mdp"][lang]}
            <input type="password" className="border p-1 rounded" ref={refMdp2} required/>
          </label>
          <label>
            <input type="checkbox" className="mr-1" required/>
            {langpack["insc_cgu"][lang]} <a href="/cgu" className="text-blue-500 hover:underline">{langpack["foot_cgu"][lang]}</a>
          </label>
          <button type="submit" className="btn bg-blue-400 hover:bg-blue-500">{langpack["insc_btn"][lang]}</button>
          {erreur && <div className="h-5 text-red-500">{erreur}</div>}
          {isLoading && <span className="loading loading-spinner"></span>}
        </form>
      </div>
    </Page>
  );
}