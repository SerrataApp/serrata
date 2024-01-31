import Modal from "../Modal/Modal";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";
import { useContext } from "react";

export default function ModalCGU(props) {
  const lang = useContext(LanguageContext).lang;

  return (
    <Modal onClose={() => {props.onClose(false)}}>
      <h3 className="font-bold text-lg">{langpack["menu_cgu"][lang]}</h3>
        <p className="my-2">
          {langpack["menu_cgu_par"][lang]} <a href="/cgu" className="text-blue-500 hover:underline">{langpack["foot_cgu"][lang]}</a>.
        </p>
        <form method="dialog">
          <div className="flex gap-2 justify-end">
            <button onClick={() => {props.onClose(true)}} className="bg-green-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-green-500">{langpack["menu_cgu_btn"][lang]}</button>
          </div>
        </form>
    </Modal>
  );
}