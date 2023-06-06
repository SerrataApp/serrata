import { useContext, useEffect, useState } from "react";
import ResultatsContext from "../store/resultats-context";

export default function Pourcents() {
  const [erreurs, setErreurs] = useState();

  const ctx = useContext(ResultatsContext);

  useEffect(() => {
    setErreurs(ctx.erreurs);
  }, [ctx.erreurs])

  return (
    <span>
      {erreurs} {erreurs>1 ? "erreurs" : "erreur"}
    </span>
  );
}