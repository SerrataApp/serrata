import { useRef, useEffect } from "react";

export default function ZoneDentree(props) {
  const inputRef = useRef(null);

  function envoyerRep(event) {
    event.preventDefault();
    console.log(drapeauEntre);
    const juste = props.onEnvoi(inputRef.current.value);
    if(juste) {
      inputRef.current.value = "";
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={envoyerRep}>
        <input type="text" className="border" onChange={ecritDrapeauHandler} ref={inputRef}/>
        <input type="submit" className="border" value="Envoyer"/>
      </form>
    </div>
  );
}