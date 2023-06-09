import { useEffect, useRef, useState } from "react";

export default function EnvoyerScore(props) {
  const [visible, setVisible] = useState(true);
  const inputRef = useRef(null);

  function submitScore(event) {
    event.preventDefault();
    fetch(`http://109.12.118.42:8080/add_score_${props.categorie}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        temps: props.score.temps,
        erreurs: props.score.erreurs,
        joueur: inputRef.current.value
      }),
      mode: 'cors'
    })
    .then(() => {setVisible(false)});
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <>
      {visible && <form className="flex flex-col w-5/6 mx-auto" onSubmit={submitScore}>
        <label for="nom">Votre nom</label>
        <input type="text" id="nom" className="border" ref={inputRef}/>
        <input type="submit" value="Envoyer" className="hover:cursor-pointer"/>
      </form>}
    </>
  );
}