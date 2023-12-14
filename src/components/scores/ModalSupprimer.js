import formatDate from "../../utils/formatDate";
import urlApi from "../../utils/urlApi";

export default function ModalSupprimer(props) {
  if(props.partie) {
    const minutes = Math.floor(props.partie.time/(60*1000));
    const secondes = Math.floor(props.partie.time%(60*1000)/1000);
    const ms = props.partie.time%1000;

    function supprimerPartie() {
      fetch(urlApi+"score/?game_id="+props.partie.id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then(() => {
        props.onClose(true);
      })
    }

    return (
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Supprimer la partie ?</h3>
          <div className="rounded-xl border overflow-hidden text-center my-4">
            <table className="w-full">
              <tr className="">
                <td className="p-3 border-r w-1/5">{props.partie.username}</td>
                <td className="p-3 border-r w-1/5">{minutes < 10 ? "0" + minutes : minutes}:{secondes < 10 ? "0" + secondes : secondes}:{(ms < 10) ? '00' + ms : (ms < 100) ? '0' + ms : ms}</td>
                <td className="p-3 border-r w-1/5">{props.partie.errors} erreur</td>
                <td className="p-3 border-r w-1/5">{props.partie.hint} indice</td>
                <td className="p-3">{formatDate(props.partie.game_date)}</td>
              </tr>
            </table>
            </div>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-2">
              <button onClick={() => {props.onClose(false)}} className="bg-green-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-green-500">Annuler</button>
              <button onClick={supprimerPartie} className="bg-red-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-red-500">Supprimer</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
}