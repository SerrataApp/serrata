import { useContext, useEffect, useState } from "react";
import ModalConnexion from "../connexion/ModalConnexion";
import ConnexionContext from "../store/connexion-context";

export default function Header() {
  const [connexionOuvert, setConnexionOuvert] = useState(false);
  const [connecte, setConnecte] = useState(false);

  const ctxConnexion = useContext(ConnexionContext);

  useEffect(() => {
    setConnecte(ctxConnexion.connecte);
  }, [ctxConnexion.connecte]);

  function openConnexionModal() {
    setConnexionOuvert(true);
  }

  function disconnect() {
    ctxConnexion.deconnecter();
  }

  return(
    <div className="w-full bg-gray-100 p-4 flex justify-between">
      <a href="/"><h1 className="select-none">Serrata</h1></a>
      <div className="flex gap-5">
        <a href="/" className="text-blue-700 hover:underline">Jouer</a>
        <a href="/scores" className="text-blue-700 hover:underline">Scores</a>
        {connecte ?
          <a href={`/profil/${ctxConnexion.username}`} className="text-blue-700 hover:underline">Profil</a>
        :
          <a onClick={openConnexionModal} className="text-blue-700 hover:underline hover:cursor-pointer">Connexion</a>
        }
        {connecte && <a onClick={disconnect} className="text-blue-700 hover:underline hover:cursor-pointer">Deconnexion</a>}
      </div>
      {connexionOuvert && <ModalConnexion/>}
    </div>
  );
}