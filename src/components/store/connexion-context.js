import { createContext } from "react";

const ConnexionContext = createContext({
  connecte: false,
  username: null,
  id: null,
  connecter: () => {},
  deconnecter: () => {}
})

export default ConnexionContext;