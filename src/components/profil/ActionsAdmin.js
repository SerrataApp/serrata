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

  function bloquerUser() {
    fermerModal(true);
  }

  function fermerModal(reload) {
    if(reload) {
      window.location.reload()
    } else {
      setModal(null);
    }
  }

  function afficherModalSupprimerUser() {
    setModal(<ModalSupprimerBloquerUser titre="Supprimer" user={props.user} onClose={fermerModal} action={supprimerUser}/>);
  }

  function afficherModalBloquerUser() {
    setModal(<ModalSupprimerBloquerUser titre="Bloquer" user={props.user} onClose={fermerModal} action={bloquerUser}/>);
  }

  return (
    <div className="flex gap-2">
      <BtnActionUser icon="user-slash" onClick={afficherModalSupprimerUser}/>
      <BtnActionUser icon="user-lock" onClick={afficherModalBloquerUser}/>
      {modal}
    </div>
  );
}