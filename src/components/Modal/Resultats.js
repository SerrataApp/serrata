import Modal from "./Modal";
import ResultatsContext from "../store/resultats-context";
import { useContext } from "react";

export default function Resultats(props) {
  const ctx = useContext(ResultatsContext);

  return(
    <Modal onClose={props.onClose}>
      {ctx.temps}, {ctx.erreurs} {ctx.erreurs>1 ? "erreurs" : "erreur"}
    </Modal>
  );
}