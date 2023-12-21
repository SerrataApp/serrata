import Page from "./Page";
import Markdown from "../components/markdown/Markdown";
import CGUFile from '../md/cgu.md';
import langpack from "../lang/langpack.json";

export default function CGU() {
  return (
    <Page titre={langpack["foot_cguext"][localStorage.getItem("lang")]}>
      <Markdown markdownFile={CGUFile}/>
    </Page>
  );
}