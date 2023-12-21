import Langue from "./Langue";

export default function SelectionLangue(props) {
  return (
    <div className="absolute mt-2 w-11 bg-white border-2 rounded shadow-sm flex flex-col">
      <Langue drapeau={props.drapeaux["fr"]} langue="fr" closeDiv={props.closeDiv}/>
      <Langue drapeau={props.drapeaux["en"]} langue="en" closeDiv={props.closeDiv}/>
    </div>
  );
}