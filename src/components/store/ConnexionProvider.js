import { useReducer } from "react";

import ConnexionContext from "./connexion-context";

const connexionParDefaut = {
  connecte: false,
  username: null
}

function ConnexionReducer(state, action) {
  if(action.type==="CONNECTER") {
    return {
      ...state,
      connecte: true,
      username: action.username
    }
  }
  if(action.type==="DECONNECTER") {
    window.localStorage.removeItem("token");
    return {
      ...state,
      connecte: false,
      username: null
    }
  }
}

export default function ConnexionProvider(props) {
  const [connexionState, dispatchConnexion] = useReducer(ConnexionReducer, connexionParDefaut);

  function connecter(username) {
    dispatchConnexion({type: "CONNECTER", username: username});
  }

  function deconnecter() {
    dispatchConnexion({type: "DECONNECTER"});
  }

  const connexionContext = {
    connecte: connexionState.connecte,
    username: connexionState.username,
    connecter,
    deconnecter
  }

  return (
    <ConnexionContext.Provider value={connexionContext}>
      {props.children}
    </ConnexionContext.Provider>
  );
}