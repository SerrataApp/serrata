export default function ChoixMode(props) {
  function onSelectHandler(e) {
    props.changeModeHandler(e.target.value);
  }

  return (
    <div className="join mb-5">
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="1" aria-label="Europe" defaultChecked={props.modeSelect==="1"}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="2" aria-label="Afrique" defaultChecked={props.modeSelect==="2"} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="3" aria-label="Asie" defaultChecked={props.modeSelect==="3"} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="0" aria-label="Monde" defaultChecked={props.modeSelect==="0"} />
    </div>
  );
}