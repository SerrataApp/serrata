import { useContext, useEffect, useState } from "react";
import ResultatsContext from "../store/resultats-context";
import LanguageContext from "../store/language-context";
import langpack from "../../lang/langpack.json";

export default function Indices() {
  const [indices, setIndices] = useState();

  const ctx = useContext(ResultatsContext);

  const lang = useContext(LanguageContext).lang;

  useEffect(() => {
    setIndices(ctx.indices);
  }, [ctx.indices])

  return (
    <span>
      {indices} {indices>1 ? langpack["sco_ind"][lang].toLowerCase() : langpack["sco_indsing"][lang].toLowerCase()}
    </span>
  );
}