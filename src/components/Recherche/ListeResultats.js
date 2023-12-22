import PlayerCard from "./PlayerCard";

export default function ListeResultats(props) {
  const resultats = props.resultats.map(resultat => <PlayerCard key={resultat.id} user={resultat}/>)

  return(
    <div className="flex flex-wrap w-8/12 gap-3 justify-center my-3">
      {resultats}
      {resultats.length===0 && <p>Aucun résultat</p>}
    </div>
  );
}