import Modal from "../Modal/Modal";
import formatDate from "../../utils/formatDate";

export default function ModalSupprimerUser(props) {
  return (
    <Modal onClose={() => {props.onClose(false)}}>
      <h3 className="font-bold text-lg">{props.titre} l'utilisateur ?</h3>
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
            <button onClick={() => {props.onClose(false)}} className="bg-green-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-green-500">Annuler</button>
            <button onClick={props.action} className="bg-red-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-red-500">{props.titre}</button>
          </div>
        </form>
    </Modal>
  );
}