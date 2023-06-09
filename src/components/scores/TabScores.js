import { useEffect, useState } from "react";

export default function TabScores(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [scores, setScores] = useState([]);
  const [runParfaite, setRunParfaite] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      const response = await fetch(`http://109.12.118.42:8080/scores_${props.categorie}`);

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

  const listeScores = scores.map(score => {
    if((runParfaite && score.erreurs===0) || !runParfaite) {
      return (
        <tr>
          <td className="p-1 border">{score.joueur}</td>
          <td className="p-1 border">{score.temps}</td>
          <td className="p-1 border">{score.erreurs}</td>
        </tr>
      );
    }
  })

  if(httpError) {
    return (
      <div>{httpError}</div>
    );
  }

  if(isLoading) {
    return (
      <p>Chargement</p>
    );
  }

  return (
    <div>
      <div className="flex flex-nowrap justify-between">
        <h2 className="text-center">{props.categorie==="onu" ? "ONU" : "Europe"}</h2>
        <div>
          <input type="checkbox" onChange={toggleRunParfaite} id={`perfect_${props.categorie}`}/>
          <label for={`perfect_${props.categorie}`} className="ml-1 select-none">0 erreur</label>
        </div>
      </div>
      <table className="border text-center">
        <tr>
          <th className="p-1 border">Joueur</th>
          <th className="p-1 border">Temps</th>
          <th className="p-1 border">Erreurs</th>
        </tr>
        {listeScores}
      </table>
    </div>
  );
}