export default function ChoixMode(props) {
  function onSelectHandler(e) {
    props.changeModeHandler(e.target.value);
  }

  return (
    <div className="join mb-5">
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="1" aria-label="Europe" checked={props.modeSelect==="1"}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="2" aria-label="Afrique" checked={props.modeSelect==="2"} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="3" aria-label="Asie" checked={props.modeSelect==="3"} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="4" aria-label="Amérique" checked={props.modeSelect==="4"} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="5" aria-label="Océanie" checked={props.modeSelect==="5"} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="0" aria-label="Monde" checked={props.modeSelect==="0"} />
    </div>
  );
}