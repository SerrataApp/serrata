import DrapeauxUtilisesProvider from './components/store/DrapeauxUtilisesProvider';
import ResultatsProvider from './components/store/ResultatsProvider';
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <ResultatsProvider>
      <DrapeauxUtilisesProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </DrapeauxUtilisesProvider>
    </ResultatsProvider>
  );
}
