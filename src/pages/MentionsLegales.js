import Page from "./Page";
import Markdown from "../components/markdown/Markdown";
import MentionsLegalesFile from '../md/mentionslegales.md';

export default function MentionsLegales() {
  return (
    <Page titre="Mentions Légales">
      <Markdown markdownFile={MentionsLegalesFile}/>
    </Page>
  );
}
