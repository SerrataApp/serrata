import langpack from "../../lang/langpack.json";
import { useContext } from "react";
import LanguageContext from "../store/language-context";

export default function ChoixMode(props) {
  function onSelectHandler(e) {
    props.changeModeHandler(e.target.value);
  }

  const lang = useContext(LanguageContext).lang;

  return (
    <div className="join join-vertical md:join-horizontal mb-5 w-full flex items-center justify-center">
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="1" aria-label={langpack["rub_eu"][lang]} checked={props.modeSelect==="1"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="2" aria-label={langpack["rub_af"][lang]} checked={props.modeSelect==="2"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="3" aria-label={langpack["rub_as"][lang]} checked={props.modeSelect==="3"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="4" aria-label={langpack["rub_am"][lang]} checked={props.modeSelect==="4"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="5" aria-label={langpack["rub_oc"][lang]} checked={props.modeSelect==="5"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="0" aria-label={langpack["rub_mo"][lang]} checked={props.modeSelect==="0"} disabled={props.disabled}/>
    </div>
  );
}