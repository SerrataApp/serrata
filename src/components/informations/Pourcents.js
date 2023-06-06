import { useContext, useEffect, useState } from "react";
import ResultatsContext from "../store/resultats-context";

export default function Pourcents() {
  const [pourcents, setPourcents] = useState();

  const ctx = useContext(ResultatsContext);

  useEffect(() => {
    setPourcents(ctx.pourcentage);
  }, [ctx.pourcentage])

  return (
    <span>
      {pourcents}%
    </span>
  );
}