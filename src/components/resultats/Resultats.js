import Modal from "../Modal/Modal";
import ResultatsContext from "../store/resultats-context";
import { useContext, useEffect, useState } from "react";

export default function Resultats(props) {
  const [minutes, setMinutes] = useState(0);
  const [secondes, setSecondes] = useState(0);
  const [ms, setMs] = useState(0);

  const ctx = useContext(ResultatsContext);

  useEffect(() => {
    setMinutes(Math.floor(ctx.temps / (60*1000)));
    setSecondes(Math.floor(ctx.temps % (60*1000)/1000));
    setMs(ctx.temps % 1000);
  }, [ctx.temps]);

  return(
    <Modal onClose={props.onClose}>
      <div className="flex flex-col text-center gap-3 w-fit">
        <span className="text-9xl">
          {minutes < 10 ? "0" + minutes : minutes}:
          {secondes < 10 ? "0" + secondes : secondes}:
          {(ms < 10) ? '00' + ms : (ms < 100) ? '0' + ms : ms}
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