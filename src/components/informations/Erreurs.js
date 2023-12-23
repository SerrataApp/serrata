import { useContext, useEffect, useState } from "react";
import ResultatsContext from "../store/resultats-context";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";

export default function Pourcents() {
  const [erreurs, setErreurs] = useState();

  const lang = useContext(LanguageContext).lang;

  const ctx = useContext(ResultatsContext);

  useEffect(() => {
    setErreurs(ctx.erreurs);
  }, [ctx.erreurs])

  return (
    <span>
      {erreurs} {erreurs>1 ? langpack["sco_err"][lang].toLowerCase() : langpack["sco_errsing"][lang].toLowerCase()}
    </span>
  );
}