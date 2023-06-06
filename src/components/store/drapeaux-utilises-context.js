import { createContext } from "react"

const drapeauxUtilisesContext = createContext({
  drapeauxUtilises: [],
  ajouterDrapeau: drapeau => {},
  resetDrapeauxUtilises: () => {}
})

export default DrapeauxUtilisesContext;