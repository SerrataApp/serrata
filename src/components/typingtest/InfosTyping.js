import { useEffect, useState } from "react";

export default function InfosTyping(props) {
  const [pourcent, setPourcent] = useState(100);

  useEffect(() => {
    if(props.nbBons+props.nbFaux!==0) {
      setPourcent(Math.round(props.nbBons/(props.nbBons+props.nbFaux)*100));
    }
  }, [props.nbBons, props.nbFaux])

  return (
    <div className="flex justify-center gap-6">
      <span>{props.chrono}sec</span>
      <span>{props.nbMots} mots</span>
      <span>{pourcent}%</span>
    </div>
  );
}