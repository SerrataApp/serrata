import BtnActionUser from "./BtnActionUser";
import ModalSupprimerBloquerUser from "./ModalSupprimerBloquerUser";
import { useState } from "react";
import urlApi from "../../utils/urlApi";

export default function ActionsAdmin(props) {
  const [modal, setModal] = useState(null);

  function supprimerUser() {
    fetch(urlApi+"users/?user_id="+props.user.id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    })
    .then(() => {fermerModal(true);})
  }

  function toggleBloquerUser() {
    fetch(urlApi+"admindisable/?user_id="+props.user.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    })
    .then(() => {fermerModal(true);})
  }

  function fermerModal(reload) {
    if(reload) {
      window.location.reload()
    } else {
      setModal(null);
    }
  }

  function afficherModalSupprimerUser() {
    setModal(<ModalSupprimerBloquerUser danger={true} titre="Supprimer" user={props.user} onClose={fermerModal} action={supprimerUser}/>);
  }

  function afficherModalBloquerUser() {
    setModal(<ModalSupprimerBloquerUser danger={true} titre="Bloquer" user={props.user} onClose={fermerModal} action={toggleBloquerUser}/>);
  }

  function afficherModalDebloquerUser() {
    setModal(<ModalSupprimerBloquerUser danger={false} titre="Débloquer" user={props.user} onClose={fermerModal} action={toggleBloquerUser}/>)
  }

  return (
    <div className="flex gap-2">
      <BtnActionUser danger={true} icon="user-slash" onClick={afficherModalSupprimerUser}/>
      {props.user.disabled?
        <BtnActionUser danger={false} icon="unlock" onClick={afficherModalDebloquerUser}/>
        :
        <BtnActionUser danger={true} icon="user-lock" onClick={afficherModalBloquerUser}/>
      }
      {modal}
    </div>
  );
}