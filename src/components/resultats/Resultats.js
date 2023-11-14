import Modal from "../Modal/Modal";
import ResultatsContext from "../store/resultats-context";
import { useContext, useEffect, useState } from "react";
import EnvoyerScore from "./EnvoyerScore";

export default function Resultats(props) {
  const [minutes, setMinutes] = useState(0);
  const [secondes, setSecondes] = useState(0);

  const ctx = useContext(ResultatsContext);

  useEffect(() => {
    setMinutes(Math.floor(ctx.temps / 60));
    setSecondes(ctx.temps % 60);
  }, [ctx.temps]);

  return(
    <Modal onClose={props.onClose}>
      <div className="flex flex-col text-center gap-3">
        <span className="text-9xl">
          {minutes < 10 ? "0" + minutes : minutes}:
          {secondes < 10 ? "0" + secondes : secondes}
        </span>
        <span className="text-3xl">
          {ctx.erreurs} {ctx.erreurs>1 ? "erreurs" : "erreur"}
        </span>
        <span className="text-3xl">
          {ctx.indices} {ctx.indices>1 ? "indices" : "indice"}
        </span>
        <button className="border py-4" onClick={props.onClose}>Fermer</button>
      </div>
    </Modal>
  );
}