import Modal from "../Modal/Modal";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";
import { useContext } from "react";
import urlApi from "../../utils/urlApi";
import ConnexionContext from "../store/connexion-context";

export default function ModalCGU(props) {
  const lang = useContext(LanguageContext).lang;
  const ctxConnexion = useContext(ConnexionContext);

  function accepterCGUHandler() {
    fetch(urlApi + "users/me/cgu", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
    .then(() => props.onClose(true));
  }

  function refuserCGUHandler() {
    ctxConnexion.deconnecter();
    props.onClose(false);
  }

  return (
    <Modal onClose={() => {props.onClose(false)}}>
      <h3 className="font-bold text-lg">{langpack["menu_cgu"][lang]}</h3>
        <p className="my-2">
          {langpack["menu_cgu_par1"][lang]} <a href="/cgu" className="text-blue-500 hover:underline">{langpack["foot_cgu"][lang]}</a>.
        </p>
        <p className="my-2">
          {langpack["menu_cgu_par2"][lang]}
        </p>
        <form method="dialog">
          <div className="flex gap-2 justify-end">
            <button onClick={refuserCGUHandler} className="bg-red-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-red-500">{langpack["menu_cgu_ref"][lang]}</button>
            <button onClick={accepterCGUHandler} className="bg-green-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-green-500">{langpack["menu_cgu_acc"][lang]}</button>
          </div>
        </form>
    </Modal>
  );
}