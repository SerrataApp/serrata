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
          <td className="p-1 border">{score.joueur}</td>
          <td className="p-1 border">{minutes < 10 ? "0" + minutes : minutes}:{secondes < 10 ? "0" + secondes : secondes}</td>
          <td className="p-1 border">{score.erreurs}</td>
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

  if(scores.length===0) {
    return (
      <p className="text-center">Aucun score dans cette catégorie pour le moment</p>
    );
  }

  return (
    <div className="w-full">
      <div>
        <input type="checkbox" onChange={toggleRunParfaite} id={`perfect_${props.categorie}`}/>
        <label htmlFor={`perfect_${props.categorie}`} className="ml-1 select-none">0 erreur</label>
        </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-1 border w-1/3">Joueur</th>
            <th className="p-1 border w-1/3">Temps</th>
            <th className="p-1 border w-1/3">Erreurs</th>
          </tr>
        </thead>
        <tbody>
          {listeScores}
        </tbody>
      </table>
    </div>
  );
}