import Modal from "../Modal/Modal";
import formatDate from "../../utils/formatDate";
import langpack from "../../lang/langpack.json";
import { useContext } from "react";
import LanguageContext from "../store/language-context";

export default function ModalSupprimerBloquerUser(props) {
  const lang = useContext(LanguageContext).lang;

  let styleAnnuler, styleAction;
  if(props.danger) {
    styleAnnuler = "bg-green-400 hover:bg-green-500";
    styleAction = "bg-red-400 hover:bg-red-500";
  } else {
    styleAnnuler = "bg-red-400 hover:bg-red-500";
    styleAction = "bg-green-400 hover:bg-green-500";
  }

  return (
    <Modal onClose={() => {props.onClose(false)}}>
      <h3 className="font-bold text-lg">{props.titre} {langpack["admin_uti"][lang]} ?</h3>
        <div className="rounded-xl border overflow-hidden text-center my-4">
          <table className="w-full">
            <tr>
              <td className="p-3 border-r w-1/3">{props.user.username}</td>
              <td className="p-3 border-r w-1/3">{props.user.email}</td>
              <td className="p-3 w-1/3">{formatDate(props.user.signup_date)}</td>
            </tr>
          </table>
        </div>
        <form method="dialog">
          <div className="flex gap-2 justify-end">
            <button onClick={() => {props.onClose(false)}} className={`py-3 px-4 rounded-xl transition-bg duration-150 ${styleAnnuler}`}>{langpack["co_ann"][lang]}</button>
            <button onClick={props.action} className={`py-3 px-4 rounded-xl transition-bg duration-150 ${styleAction}`}>{props.titre}</button>
          </div>
        </form>
    </Modal>
  );
}