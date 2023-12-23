import { createContext } from "react"

const DrapeauxUtilisesContext = createContext({
  drapeauxUtilises: [],
  ajouterDrapeau: nomDrapeau => {},
  resetDrapeauxUtilises: () => {}
})

export default DrapeauxUtilisesContext;