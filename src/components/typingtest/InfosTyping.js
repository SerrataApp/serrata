import { useEffect, useState } from "react";

export default function InfosTyping(props) {
  const [pourcent, setPourcent] = useState(100);

  useEffect(() => {
    setPourcent(Math.round(props.nbBons/(props.nbBons+props.nbFaux)*100));
  }, [props.nbBons, props.nbFaux])

  return (
    <div className="flex justify-center">
      {pourcent}%
    </div>
  );
}