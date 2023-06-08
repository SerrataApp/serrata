import { Navigate, useRoutes } from "react-router-dom";

//
import { Accueil, Jeu } from "./elements";
import { drapeauxEurope, drapeauxONU } from "../utils/ImportDrapeaux";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        { element: <Navigate to={"/drapeaux_react"} replace />, index: true },
      ],
    },
    {
      path: "/drapeaux_react",
      element: <Accueil/>
    },
    {
      path: "/drapeaux_react/europe",
      element: <Jeu drapeaux={drapeauxEurope}/>
    },
    {
      path: "/drapeaux_react/onu",
      element: <Jeu drapeaux={drapeauxONU}/>
    }
  ]);
}
