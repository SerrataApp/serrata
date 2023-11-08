export default function BoutonMode(props) {
  let style = "";
  if(props.selection===props.mode) {
    style = "bg-blue-300";
  }

  function onSelectHandler() {
    props.onSelect(props.mode);
  }

  return(
    <button onClick={onSelectHandler} className={`p-2 border transition-all duration-100 ${style}`}>{props.mode}</button>
  );
}