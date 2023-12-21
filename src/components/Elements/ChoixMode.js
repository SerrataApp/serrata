export default function ChoixMode(props) {
  function onSelectHandler(e) {
    props.changeModeHandler(e.target.value);
  }

  return (
    <div className="join join-vertical md:join-horizontal mb-5 w-full flex items-center justify-center">
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="1" aria-label="Europe" checked={props.modeSelect==="1"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="2" aria-label="Afrique" checked={props.modeSelect==="2"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="3" aria-label="Asie" checked={props.modeSelect==="3"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="4" aria-label="Amérique" checked={props.modeSelect==="4"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="5" aria-label="Océanie" checked={props.modeSelect==="5"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="0" aria-label="Monde" checked={props.modeSelect==="0"} disabled={props.disabled}/>
    </div>
  );
}