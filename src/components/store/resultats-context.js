import { createContext } from "react"

const ResultatsContext = createContext({
  erreurs: 0,
  temps: 0,
  estFini: false,
  ajouterErreur: () => {},
  definirTemps: temps => {},
  finir: () => {}
})

export default ResultatsContext;