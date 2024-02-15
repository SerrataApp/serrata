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
    const formData = {
      "username": inputPseudo.current.value,
      "password": inputMdp.current.value
    }

    fetch(urlApi+"users/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      response.json()
      .then(data => {
        switch(response.status) {
          case 200: window.localStorage.setItem("token", data.token); onClose(); break;
          case 401: setErreur(data.error); break;
          case 422: setErreur(`${langpack["insc_err_champ"][lang]} : ${data.detail[0].loc[1]}`); break;
          case 404: setErreur(langpack["co_err"][lang]); break;
          default: setErreur(langpack["insc_err"][lang]);
        }
      });
    })
    .catch(() => {setErreur(langpack["insc_err"][lang]); setIsLoading(false)})
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
            <div className="flex gap-1 content-bottom relative">
              <input onKeyDown={onPasswordKeyPressHandler} type={showPassword ? 'text' : 'password'} className="border rounded p-1 w-full mr-2 " ref={inputMdp} required/>
              <i className={`fa-regular ${ showPassword?'fa-eye-slash':'fa-eye'} h-5.5 w-5.5  my-2 flex absolute end-4`} onClick={toggleShowPassword} ></i>
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