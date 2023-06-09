import { useEffect, useState } from "react";

export default function TabScores(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/scores_${props.categorie}`);

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
  }, []);

  if(httpError) {
    return (
      <div>{httpError}</div>
    );
  }

  const listeScores = scores.map(score => {
    return (
      <tr>
        <td className="p-1 border">{score.joueur}</td>
        <td className="p-1 border">{score.temps}</td>
        <td className="p-1 border">{score.erreurs}</td>
      </tr>
    );
  })

  return (
    <div>
      <h2>{props.categorie==="onu" ? "ONU" : "Europe"}</h2>
      <table className="border text-center">
        {listeScores}
      </table>
    </div>
  );
}