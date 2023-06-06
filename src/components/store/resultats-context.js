import { createContext } from "react"

const ResultatsContext = createContext({
  pourcentage: 100,
  temps: 0,
  estFini: false,
  enleverPourcent: pourcents => {},
  definirTemps: temps => {},
  finir: () => {}
})

export default ResultatsContext;