import { useEffect, useState } from "react";
import urlApi from "../../utils/urlApi";
import formatDate from "../../utils/formatDate";

export default function TabScores(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [scores, setScores] = useState([]);
  const [runParfaite, setRunParfaite] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      const response = await fetch(`${urlApi}scores/mode/?game_mode_id=${props.categorie}`);

      if(!response.ok) {
        throw new Error("Something went wrong");
      }
      let data = await response.json();
      for(let i_partie in data) {
        const responseJoueur = await fetch(urlApi+"users/?user_id="+data[i_partie].player_id);
        const dataJoueur = await responseJoueur.json();
        const nomJoueur = dataJoueur.username;
        data[i_partie] = {
          ...data[i_partie],
          username: nomJoueur
        }
      }
      data = data.sort((a,b) => (a.time>b.time?1:-1));
      setScores(data);
      setIsLoading(false);
    };
    
    fetchScores().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [props.categorie]);

  function toggleRunParfaite() {
    setRunParfaite(!runParfaite);
  }

  let compteur = 0;
  const listeScores = scores.map((score, index) => {
    if((runParfaite && score.errors===0) || !runParfaite) {
      const minutes = Math.floor(score.time/(60*1000));
      const secondes = Math.floor(score.time%(60*1000)/1000);
      const ms = score.time%1000;
      let style = "";
      if(compteur%2===0) {
        style = "bg-gray-100";
      }
      compteur++;
      return (
        <tr key={index} className={style}>
          <td className="py-1 px-3 border text-center">{index+1}</td>
          <td className="py-1 px-3 border font-bold"><a href={`/profil/${score.username}`} className="hover:underline">{score.username}</a></td>
          <td className="py-1 px-3 border text-center">{minutes < 10 ? "0" + minutes : minutes}:{secondes < 10 ? "0" + secondes : secondes}:{(ms < 10) ? '00' + ms : (ms < 100) ? '0' + ms : ms}</td>
          <td className="py-1 px-3 border text-center">{score.errors}</td>
          <td className="py-1 px-3 border text-center">{score.hint}</td>
          <td className="py-1 px-3 border text-center">{formatDate(score.game_date)}</td>
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
      <div className="flex justify-center">
        <span className="loading loading-spinner"></span>
      </div>
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
        <input type="checkbox" onChange={toggleRunParfaite} id={`perfect_${props.categorie}`} checked={runParfaite}/>
        <label htmlFor={`perfect_${props.categorie}`} className="ml-1 select-none">0 erreur</label>
        </div>
      <div className="overflow-auto w-full border rounded-xl" style={{maxHeight: "400px"}}>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-1 px-3 border w-fit">#</th>
              <th className="py-1 px-3 border w-full">Joueur -<span className=" font-normal"> cliquer pour accéder au profil</span></th>
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
    </div>
  );
}