import { useState } from "react";
import ModalConnexion from "../connexion/ModalConnexion";

export default function Header() {
  const [connexionOuvert, setConnexionOuvert] = useState(false);

  function openConnexionModal() {
    setConnexionOuvert(true);
  }

  function closeConnexionModal() {
    setConnexionOuvert(false);
  }

  return(
    <div className="w-full bg-secondary p-4 flex justify-between">
      <a href="/"><h1 className="select-none">Serrata</h1></a>
      <div className="flex gap-5">
        <a href="/" className="text-blue-700 hover:underline">Jouer</a>
        <a href="/scores" className="text-blue-700 hover:underline">Scores</a>
        {!true ?
          <a href="/profil" className="text-blue-700 hover:underline">Profil</a>
        :
          <a onClick={openConnexionModal} className="text-blue-700 hover:underline hover:cursor-pointer">Connexion</a>
        }
      </div>
      {connexionOuvert && <ModalConnexion onClose={closeConnexionModal}/>}
    </div>
  );
}