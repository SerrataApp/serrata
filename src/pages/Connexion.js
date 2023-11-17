import { useRef } from "react";
import Page from "./Page";

export default function Connexion() {
  const inputPseudo = useRef();
  const inputMdp = useRef();

  function onSubmitHandler(e) {
    e.preventDefault();
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
    .then(response => response.json())
    .then(data => {
      window.localStorage.setItem("token", data.access_token);
    })
  }

  return(
    <Page titre="Connexion">
      <div className="flex justify-center">
        <form onSubmit={onSubmitHandler} className="w-5/12 border bg-gray-100 flex flex-col items-center p-4 gap-3 rounded">
          <label className="flex flex-col">
            Pseudo
            <input type="text" className="border" ref={inputPseudo}/>
          </label>
          <label className="flex flex-col">
            Mot de passe
            <input type="password" className="border" ref={inputMdp}/>
          </label>
          <input type="submit" value="Se connecter" className="bg-white border p-2"/>
        </form>
      </div>
    </Page>
  );
}