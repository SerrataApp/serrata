import { createContext } from "react"

const ResultatsContext = createContext({
  erreurs: 0,
  indices: 0,
  temps: 0,
  estFini: false,
  ajouterErreur: () => {},
  ajouterIndice: () => {},
  definirTemps: temps => {},
  finir: () => {}
})

export default ResultatsContext;