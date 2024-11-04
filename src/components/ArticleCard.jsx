import React from "react";

const ArticleCard = (props) => {
  const { article } = props;
  return (
    <div className="m-auto mb-5 bg-blue-400 border border-gray-200 rounded-lg p-6 max-w-sm">
      <h3>{article.title}</h3>
      <p className="text-xs">By: {article.author}</p>
    </div>
  );
};

export default ArticleCard;
