export default function ChoixMode(props) {
  function onSelectHandler(e) {
    props.changeModeHandler(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="join mb-5">
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="Europe" aria-label="Europe" checked={props.modeSelect==="Europe"?true:false}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="Afrique" aria-label="Afrique" checked={props.modeSelect==="Europe"?true:false} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="Asie" aria-label="Asie" checked={props.modeSelect==="Europe"?true:false} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="Monde" aria-label="Monde" checked={props.modeSelect==="Europe"?true:false} />
    </div>
  );
}