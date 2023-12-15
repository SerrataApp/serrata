import BtnActionUser from "./BtnActionUser";

export default function ActionsAdmin() {
  function supprimerUser() {

  }

  return (
    <div className="flex gap-2">
      <BtnActionUser icon="user-slash" action={supprimerUser}/>
      <BtnActionUser icon="user-lock"/>
    </div>
  );
}