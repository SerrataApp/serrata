import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from "react";

export default function Markdown(props) {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const response = await fetch(props.markdownFile);
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error('Erreur lors de la lecture du fichier Markdown', error);
      }
    };

    fetchMarkdownContent();
  }, []);

  return (
    <div className="w-full flex justify-center mb-5">
      <div className="markdown w-[70%] text-justify">
        <style>
          {`
            .markdown h2 {
              font-size: 1.15rem;
              font-weight: bold;
              margin-top: 10px;
              margin-bottom: 10px;
            }
            .markdown p, li {
              text-justify: inter-word;
              margin-bottom: 5px;
            }
            .markdown ul {
              list-style-type: disc;
            }
            .markdown li {
              list-style-position: inside;
              align-items: baseline;
            }
          `}
        </style>
        <ReactMarkdown>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
