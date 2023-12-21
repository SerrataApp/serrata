import Page from "./Page";
import Markdown from "../components/markdown/Markdown";
import MentionsLegalesFile from '../md/mentionslegales.md';
import langpack from "../lang/langpack.json";

export default function MentionsLegales() {
  return (
    <Page titre={langpack["foot_ml"][localStorage.getItem("lang")]}>
      <Markdown markdownFile={MentionsLegalesFile}/>
    </Page>
  );
}
