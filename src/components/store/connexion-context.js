import { createContext } from "react";

const ConnexionContext = createContext({
  connecte: false,
  username: null,
  connecter: () => {},
  deconnecter: () => {}
})

export default ConnexionContext;