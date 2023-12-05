import Page from "./Page";
import Markdown from "../components/markdown/Markdown";
import CGUFile from '../md/cgu.md';

export default function CGU() {
  return (
    <Page titre="Conditions générales d'utilisation">
      <Markdown markdownFile={CGUFile}/>
    </Page>
  );
}