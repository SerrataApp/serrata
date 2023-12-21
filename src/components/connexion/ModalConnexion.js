import urlApi from "../../utils/urlApi";
import Modal from "../Modal/Modal";
import { useContext, useRef, useState } from "react";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";

export default function ModalConnexion(props) {
  const [erreur, setErreur] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputPseudo = useRef();
  const inputMdp = useRef();

  const lang = useContext(LanguageContext).lang;

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
          case 422: setErreur(`${langpack["insc_err_champ"][lang]} : ${data.detail[0].loc[1]}`); break;
          default: setErreur("insc_err");
        }
      });
    })
    .catch(() => {setErreur("insc_err"); setIsLoading(false)})
  }

  return (
    <Modal onClose={onCancel}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl">{langpack["menu_co"][lang]}</h2>
        <p className="italic text-gray-500 text-center">
          {langpack["co_p1"][lang]}
          <br/>
          {langpack["co_p2"][lang]}
        </p>
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center p-4 gap-3 rounded w-[250px]">
          <label className="flex flex-col w-full">
            {langpack["co_id"][lang]}
            <input type="text" className="border rounded p-1" ref={inputPseudo} required autoFocus={true}/>
          </label>
          <label className="flex flex-col w-full">
            {langpack["co_mdp"][lang]}
            <div className="flex gap-1">
              <input onKeyDown={onPasswordKeyPressHandler} type={showPassword ? 'text' : 'password'} className="border rounded p-1 w-full" ref={inputMdp} required/>
              <button onClick={toggleShowPassword} className="border bg-gray-100 w-fit p-1 rounded">{showPassword?langpack["co_cach"][lang]:langpack["co_montr"][lang]}</button>
            </div>
          </label>
          <div className="flex gap-2 w-full">
            <input type="submit" value={langpack["co_conn"][lang]} className="w-1/2 rounded border p-2 transition-all duration-200 bg-green-400 hover:bg-green-500"/>
            <input type="button" onClick={onCancel} value={langpack["co_ann"][lang]} className="w-1/2 rounded border p-2 transition-all duration-200 bg-red-400 hover:bg-red-500"/>
          </div>
          {erreur && <div className="h-5 whitespace-nowrap inline text-red-500 text-center">{erreur}</div>}
          {isLoading && !erreur && <span className="loading loading-spinner"></span>}
          <p className="whitespace-nowrap inline">{langpack["co_pas_insc"][lang]} <a href="/inscription" className="text-blue-500 hover:underline">{langpack["insc_btn"][lang]}</a></p>
        </form>
      </div>
    </Modal>
  )
}