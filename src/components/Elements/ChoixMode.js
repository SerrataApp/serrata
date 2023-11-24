export default function ChoixMode(props) {
  function onSelectHandler(e) {
    props.changeModeHandler(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="join mb-5">
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="Europe" aria-label="Europe" defaultChecked={props.modeSelect==="Europe"?true:false}/>
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="Afrique" aria-label="Afrique" defaultChecked={props.modeSelect==="Afrique"?true:false} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="Asie" aria-label="Asie" defaultChecked={props.modeSelect==="Asie"?true:false} />
      <input onClick={onSelectHandler} className="join-item btn btn-square w-fit px-4" type="radio" name="choixMode" value="Monde" aria-label="Monde" defaultChecked={props.modeSelect==="Monde"?true:false} />
    </div>
  );
}