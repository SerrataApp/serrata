import { useReducer } from "react";

import ConnexionContext from "./connexion-context";

const connexionParDefaut = {
  connecte: false,
  username: null,
  id: null,
  admin: false
}

function ConnexionReducer(state, action) {
  if(action.type==="CONNECTER") {
    return {
      ...state,
      connecte: true,
      username: action.username,
      id: action.id,
      admin: action.admin
    }
  }
  if(action.type==="DECONNECTER") {
    window.localStorage.removeItem("token");
    return {
      ...state,
      connecte: false,
      username: null,
      id: null,
      admin: false
    }
  }
}

export default function ConnexionProvider(props) {
  const [connexionState, dispatchConnexion] = useReducer(ConnexionReducer, connexionParDefaut);

  function connecter(username, id, admin) {
    dispatchConnexion({type: "CONNECTER", username: username, id: id, admin: admin});
  }

  function deconnecter() {
    dispatchConnexion({type: "DECONNECTER"});
  }

  const connexionContext = {
    connecte: connexionState.connecte,
    username: connexionState.username,
    id: connexionState.id,
    admin: connexionState.admin,
    connecter,
    deconnecter
  }

  return (
    <ConnexionContext.Provider value={connexionContext}>
      {props.children}
    </ConnexionContext.Provider>
  );
}