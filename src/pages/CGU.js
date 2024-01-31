import Page from "./Page";
import Markdown from "../components/markdown/Markdown";
import CGUFile from '../md/cgu.md';
import langpack from "../lang/langpack.json";
import { useContext } from "react";
import LanguageContext from "../components/store/language-context";
import urlApi from "../utils/urlApi";
import ConnexionContext from "../components/store/connexion-context";

export default function CGU() {
  const lang = useContext(LanguageContext).lang;
  const ctxConnexion = useContext(ConnexionContext);

  function notifyCGU() {
    fetch(urlApi+"admin/cgu", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    })
  }

  return (
    <Page titre={langpack["foot_cguext"][lang]}>
      {ctxConnexion.admin &&
        <div className="w-full flex justify-center">
          <button onClick={notifyCGU} className="p-2 rounded transition-all duration-150 bg-red-500 hover:bg-red-400 active:scale-95">{langpack["admin_cgu"][lang]}</button>
        </div>
      }
      <Markdown markdownFile={CGUFile}/>
    </Page>
  );
}