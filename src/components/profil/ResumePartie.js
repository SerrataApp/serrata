import { useContext, useState } from "react";
import formatDate from "../../utils/formatDate";
import urlApi from "../../utils/urlApi";
import ConnexionContext from "../store/connexion-context";
import ModalSupprimer from "../Elements/ModalSupprimer";
import LanguageContext from "../store/language-context";
import langpack from "../../lang/langpack.json";

export default function ResumePartie(props) {
  const [modalSupprimer, setModalSupprimer] = useState(false);

  const ctxConnexion = useContext(ConnexionContext);

  const lang = useContext(LanguageContext).lang;

  function onChangeVisibilityHandler() {
    fetch(urlApi+"score/changeState/?game_id="+props.partie.id, {
      method:"PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    })
    .then(() => {window.location.reload()})
    props.setIsLoading(true);
  }

  function afficherModalSupprimer() {
    setModalSupprimer(<ModalSupprimer partie={props.partie} onClose={onModalClose}/>);
  }

  function onModalClose(reload) {
    if(reload) {
      window.location.reload();
    } else {
      setModalSupprimer(null);
    }
  }

  const minutes = Math.floor(props.partie.time/(60*1000));
  const secondes = Math.floor(props.partie.time%(60*1000)/1000);
  const ms = props.partie.time%1000;
  let style = "";
  if(props.index%2===0) {
    style = "bg-gray-100";
  }

  return (
    <tr className={style}>
      <td className="p-1 border text-center">{minutes < 10 ? "0" + minutes : minutes}:{secondes < 10 ? "0" + secondes : secondes}:{(ms < 10) ? '00' + ms : (ms < 100) ? '0' + ms : ms}</td>
      <td className="p-1 border text-center">{props.partie.errors}</td>
      <td className="p-1 border text-center">{props.partie.hint}</td>
      <td className="p-1 border text-center">{formatDate(props.partie.game_date)}</td>
      <td className="p-1 border text-center">
        {(ctxConnexion.username===props.username||ctxConnexion.admin)?
          <select className="rounded p-1 bg-gray-300" onChange={onChangeVisibilityHandler}>
            <option value="Publique" selected={props.partie.public}>{langpack["prof_pub"][lang]}</option>
            <option value="Privée" selected={!props.partie.public}>{langpack["prof_priv"][lang]}</option>
          </select>
          :
          props.partie.public?langpack["prof_pub"][lang]:langpack["prof_priv"][lang]
        }
      </td>
      {ctxConnexion.admin&&
        <>
          <td className="py-1 px-3 border text-center">
              <button onClick={afficherModalSupprimer}>
                <i className="fa fa-trash-can transition-text duration-150 text-red-600 hover:text-red-400"></i>
              </button>
            </td>
          {modalSupprimer}
        </>
      }
    </tr>
  );
}