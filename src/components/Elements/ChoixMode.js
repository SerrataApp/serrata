import BoutonMode from "./BoutonMode";

export default function ChoixMode(props) {
  return (
    <div className="flex w-fit mb-3">
      <BoutonMode mode="Europe" onSelect={props.changeModeHandler} selection={props.modeSelect}/>
      <BoutonMode mode="Afrique" onSelect={props.changeModeHandler} selection={props.modeSelect}/>
      <BoutonMode mode="Asie" onSelect={props.changeModeHandler} selection={props.modeSelect}/>
      <BoutonMode mode="Monde" onSelect={props.changeModeHandler} selection={props.modeSelect}/>
    </div>
  );
}