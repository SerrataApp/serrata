import { createContext } from "react";

const ConnexionContext = createContext({
  connecte: false,
  username: null,
  id: null,
  admin: false,
  connecter: () => {},
  deconnecter: () => {}
})

export default ConnexionContext;