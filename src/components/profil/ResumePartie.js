import { useContext } from "react";
import formatDate from "../../utils/formatDate";
import urlApi from "../../utils/urlApi";
import ConnexionContext from "../store/connexion-context";

export default function ResumePartie(props) {
  const ctxConnexion = useContext(ConnexionContext);

  function onChangeVisibilityHandler() {
    fetch(urlApi+"score/changeState/?game_id="+props.partie.id, {
      method:"PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    });
  }

  const minutes = Math.floor(props.partie.time/60);
  const secondes = props.partie.time%60;
  let style = "";
  if(props.index%2===0) {
    style = "bg-gray-100";
  }

  return (
    <tr className={style}>
      <td className="p-1 border text-center">{minutes < 10 ? "0" + minutes : minutes}:{secondes < 10 ? "0" + secondes : secondes}</td>
      <td className="p-1 border text-center">{props.partie.errors}</td>
      <td className="p-1 border text-center">{props.partie.hint}</td>
      <td className="p-1 border text-center">{formatDate(props.partie.game_date)}</td>
      <td className="p-1 border text-center">
        {ctxConnexion.username===props.username?
          <select className="rounded p-1 bg-gray-300" onChange={onChangeVisibilityHandler}>
            <option value="Publique" selected={props.partie.public}>Publique</option>
            <option value="Privée" selected={!props.partie.public}>Privée</option>
          </select>
          :
          props.partie.public?"Publique":"Privée"
        }
      </td>
    </tr>
  );
}