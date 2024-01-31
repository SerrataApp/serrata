import BtnActionUser from "./BtnActionUser";
import ModalSupprimerBloquerUser from "./ModalSupprimerBloquerUser";
import { useContext, useState } from "react";
import urlApi from "../../utils/urlApi";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";

export default function ActionsAdmin(props) {
  const [modal, setModal] = useState(null);

  const lang = useContext(LanguageContext).lang;

  function supprimerUser() {
    fetch(urlApi+"admin/user?username="+props.user.username, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    })
    .then(() => {fermerModal(true);})
  }

  function toggleBloquerUser() {
    fetch(urlApi+"admin/disable?id="+props.user.id, {
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
      window.location.reload();
    } else {
      setModal(null);
    }
  }

  function afficherModalSupprimerUser() {
    setModal(<ModalSupprimerBloquerUser danger={true} titre={langpack["admin_suppr"][lang]} user={props.user} onClose={fermerModal} action={supprimerUser}/>);
  }

  function afficherModalBloquerUser() {
    setModal(<ModalSupprimerBloquerUser danger={true} titre={langpack["admin_blo"][lang]} user={props.user} onClose={fermerModal} action={toggleBloquerUser}/>);
  }

  function afficherModalDebloquerUser() {
    setModal(<ModalSupprimerBloquerUser danger={false} titre={langpack["admin_deblo"][lang]} user={props.user} onClose={fermerModal} action={toggleBloquerUser}/>)
  }

  return (
    <div className="flex gap-2">
      <BtnActionUser danger={true} icon="user-slash" onClick={afficherModalSupprimerUser}/>
      {props.user?.disabled?
        <BtnActionUser danger={false} icon="unlock" onClick={afficherModalDebloquerUser}/>
        :
        <BtnActionUser danger={true} icon="user-lock" onClick={afficherModalBloquerUser}/>
      }
      {modal}
    </div>
  );
}