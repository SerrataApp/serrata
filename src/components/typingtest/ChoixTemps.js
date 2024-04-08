export default function ChoixTemps(props) {
  function onSelectHandler(e) {
    props.changeTempsHandler(e.target.value);
  }

  return (
    <div className="join join-vertical md:join-horizontal mb-5 w-full flex items-center justify-center">
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="15" aria-label="15sec" defaultChecked={props.tempsSelect==="15"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="30" aria-label="30sec" defaultChecked={props.tempsSelect==="30"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="60" aria-label="1min" defaultChecked={props.tempsSelect==="60"} disabled={props.disabled}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-8/12 md:w-fit px-4" type="radio" name="choixMode" value="120" aria-label="2min" defaultChecked={props.tempsSelect==="120"} disabled={props.disabled}/>
    </div>
  );
}