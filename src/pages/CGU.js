import Page from "./Page";
import Markdown from "../components/markdown/Markdown";
import CGUFile from '../md/cgu.md';
import langpack from "../lang/langpack.json";
import { useContext } from "react";
import LanguageContext from "../components/store/language-context";

export default function CGU() {
  const lang = useContext(LanguageContext).lang;

  return (
    <Page titre={langpack["foot_cguext"][lang]}>
      <Markdown markdownFile={CGUFile}/>
    </Page>
  );
}