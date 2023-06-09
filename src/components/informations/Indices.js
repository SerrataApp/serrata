import { useContext, useEffect, useState } from "react";
import ResultatsContext from "../store/resultats-context";

export default function Indices() {
  const [indices, setIndices] = useState();

  const ctx = useContext(ResultatsContext);

  useEffect(() => {
    setIndices(ctx.indices);
  }, [ctx.indices])

  return (
    <span>
      {indices} {indices>1 ? "indices" : "indice"}
    </span>
  );
}