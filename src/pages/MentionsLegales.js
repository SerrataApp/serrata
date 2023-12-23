import Page from "./Page";
import Markdown from "../components/markdown/Markdown";
import MentionsLegalesFile from '../md/mentionslegales.md';
import langpack from "../lang/langpack.json";
import { useContext } from "react";
import LanguageContext from "../components/store/language-context";

export default function MentionsLegales() {
  const lang = useContext(LanguageContext).lang;

  return (
    <Page titre={langpack["foot_ml"][lang]}>
      <Markdown markdownFile={MentionsLegalesFile}/>
    </Page>
  );
}
