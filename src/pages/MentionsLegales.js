import Page from "./Page";
import ReactMarkdown from 'react-markdown';

export default function MentionsLegales() {
  const markdownText = '# Titre principal\n\nCeci est un paragraphe en **Markdown**.';

  return (
    <Page titre="Mentions Légales">
      <ReactMarkdown>
        {markdownText}
      </ReactMarkdown>
    </Page>
  );
}
