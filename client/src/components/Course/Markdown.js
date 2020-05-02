import React from "react";
import ReactMarkdown from "react-markdown";

export default (props) => {
  const { source } = props;

  return (
    <ReactMarkdown
      source={source}
      className="markdown"
      escapeHtml={true}
    />
  );
};
