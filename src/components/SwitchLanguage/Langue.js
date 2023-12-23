import { useContext } from "react";
import LanguageContext from "../store/language-context";

export default function Langue(props) {
  const ctxLangue = useContext(LanguageContext);

  function onClickHandler() {
    props.closeDiv();
    ctxLangue.setLangue(props.langue);
  }

  return (
    <div className="bg-white transition-bg duration-150 hover:bg-gray-300 hover:cursor-pointer p-2" onClick={onClickHandler}>
      <img src={props.drapeau} alt={props.langue}/>
    </div>
  );
}