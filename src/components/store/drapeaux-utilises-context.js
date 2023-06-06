import { createContext } from "react"

const DrapeauxUtilisesContext = createContext({
  drapeauxUtilises: [],
  ajouterDrapeau: drapeau => {},
  resetDrapeauxUtilises: () => {}
})

export default DrapeauxUtilisesContext;