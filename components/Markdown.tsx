import "highlight.js/styles/atom-one-dark.css"
import hljs from "highlight.js"
import DOMPurify from "isomorphic-dompurify"
import { marked } from "marked"
import { useMemo } from "react"
import styles from "./Markdown.module.css"

// Initialize and use highlight.js
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value;
    } else {
      return code;
    }
  },
});

// A simple component to render markdown
export const Markdown = ({ markdown }: { markdown: string }) => {
  const renderedMarkdown = useMemo(
    () => DOMPurify.sanitize(marked.parse(markdown)),
    [markdown]
  );

  return (
    <div className={styles.contentContainer}>
      <div
        className="markdown markdownspacing"
        dangerouslySetInnerHTML={{
          __html: renderedMarkdown,
        }}
      />
    </div>
  );
};
