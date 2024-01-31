import Modal from "../Modal/Modal";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";
import { useContext } from "react";
import urlApi from "../../utils/urlApi";

export default function ModalCGU(props) {
  const lang = useContext(LanguageContext).lang;

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

  return (
    <Modal onClose={() => {props.onClose(false)}}>
      <h3 className="font-bold text-lg">{langpack["menu_cgu"][lang]}</h3>
        <p className="my-2">
          {langpack["menu_cgu_par"][lang]} <a href="/cgu" className="text-blue-500 hover:underline">{langpack["foot_cgu"][lang]}</a>.
        </p>
        <form method="dialog">
          <div className="flex gap-2 justify-end">
            <button onClick={accepterCGUHandler} className="bg-green-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-green-500">{langpack["menu_cgu_btn"][lang]}</button>
          </div>
        </form>
    </Modal>
  );
}