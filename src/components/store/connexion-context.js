import { createContext } from "react";

const ConnexionContext = createContext({
  connecte: false,
  connecter: () => {},
  deconnecter: () => {}
})

export default ConnexionContext;