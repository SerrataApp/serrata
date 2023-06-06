import { useState, useRef, useEffect } from "react";

export default function ZoneDentree(props) {
  const [drapeauEntre, setDrapeauEntre] = useState("");
  const inputRef = useRef(null);

  function ecritDrapeauHandler(event) {
    setDrapeauEntre(event.target.value);
  }

  function envoyerRep(event) {
    event.preventDefault();
    console.log(drapeauEntre);
    const juste = props.onEnvoi(drapeauEntre);
    if(juste) {
      setDrapeauEntre("");
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={envoyerRep}>
        <input type="text" className="border" onChange={ecritDrapeauHandler} value={drapeauEntre} ref={inputRef}/>
        <input type="submit" className="border" value="Envoyer"/>
      </form>
    </div>
  );
}