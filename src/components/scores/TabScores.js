import { useEffect, useState } from "react";

export default function TabScores(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [scores, setScores] = useState([]);
  const [runParfaite, setRunParfaite] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      const response = await fetch(`https://serrata-api.super-sympa.fr/scores_${props.categorie}`);

      if(!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setScores(data);
      setIsLoading(false)      
    };
    
    fetchScores().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [props.categorie]);

  function toggleRunParfaite() {
    setRunParfaite(!runParfaite);
  }

  const listeScores = scores.map((score, index) => {
    if((runParfaite && score.erreurs===0) || !runParfaite) {
      const minutes = Math.floor(score.temps/60);
      const secondes = score.temps%60;
      let style = "";
      if(index%2===0) {
        style = "bg-gray-100";
      }
      return (
        <tr key={score.temps+score.joueur} className={style}>
          <td className="py-1 px-3 border text-center">{index+1}</td>
          <td className="py-1 px-3 border font-bold">{score.joueur}</td>
          <td className="py-1 px-3 border text-center">{minutes < 10 ? "0" + minutes : minutes}:{secondes < 10 ? "0" + secondes : secondes}</td>
          <td className="py-1 px-3 border text-center">{score.erreurs}</td>
          <td className="py-1 px-3 border text-center">0</td>
          <td className="py-1 px-3 border text-center">02/09/2004</td>
        </tr>
      );
    }
    return null;
  })

  if(httpError) {
    return (
      <div className="text-center">{httpError}</div>
    );
  }

  if(isLoading) {
    return (
      <p className="text-center">Chargement</p>
    );
  }

  if(listeScores.length===0) {
    return (
      <p className="text-center">Aucun score dans cette catégorie pour le moment</p>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <div>
        <input type="checkbox" onChange={toggleRunParfaite} id={`perfect_${props.categorie}`}/>
        <label htmlFor={`perfect_${props.categorie}`} className="ml-1 select-none">0 erreur</label>
        </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-1 px-3 border w-fit">#</th>
            <th className="py-1 px-3 border w-full">Joueur</th>
            <th className="py-1 px-3 border w-fit">Temps</th>
            <th className="py-1 px-3 border w-fit">Erreurs</th>
            <th className="py-1 px-3 border w-fit">Indices</th>
            <th className="py-1 px-3 border w-fit">Date</th>
          </tr>
        </thead>
        <tbody>
          {listeScores}
        </tbody>
      </table>
    </div>
  );
}