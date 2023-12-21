import { useContext, useEffect, useState } from "react";
import ModalConnexion from "../connexion/ModalConnexion";
import ConnexionContext from "../store/connexion-context";
import langpack from "../../lang/langpack.json";

export default function Header() {
  const [connexionOuvert, setConnexionOuvert] = useState(false);
  const [connecte, setConnecte] = useState(false);

  const ctxConnexion = useContext(ConnexionContext);

  const lang = localStorage.getItem("lang");

  useEffect(() => {
    setConnecte(ctxConnexion.connecte);
  }, [ctxConnexion.connecte]);

  function openConnexionModal() {
    setConnexionOuvert(true);
  }

  function closeConnexionModal() {
    setConnexionOuvert(false);
  }

  function disconnect() {
    ctxConnexion.deconnecter();
  }

  return(
    <div className="w-full bg-gray-100 p-4 flex justify-between">
      <a href="/"><h1 className="select-none">Serrata</h1></a>
      <div className="flex gap-5">
        <a href="/" className="text-blue-700 hover:underline">{langpack["menu_jouer"][lang]}</a>
        <a href="/scores" className="text-blue-700 hover:underline">{langpack["menu_scores"][lang]}</a>
        {connecte ?
          <a href={`/profil/${ctxConnexion.username}`} className="text-blue-700 hover:underline">{langpack["menu_prof"][lang]}</a>
        :
          <a onClick={openConnexionModal} className="text-blue-700 hover:underline hover:cursor-pointer">{langpack["menu_co"][lang]}</a>
        }
        {connecte && <a onClick={disconnect} className="text-blue-700 hover:underline hover:cursor-pointer">{langpack["menu_deco"][lang]}</a>}
      </div>
      {connexionOuvert && <ModalConnexion onCancel={closeConnexionModal}/>}
    </div>
  );
}