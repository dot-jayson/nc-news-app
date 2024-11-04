import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = (props) => {
  const { article } = props;
  return (
    <Link to={`/articles/${article.article_id}`}>
      <div className="mb-5 bg-blue-400 border border-gray-200 rounded-lg p-6 ">
        <h3>{article.title}</h3>
        <p className="text-xs">By: {article.author}</p>
      </div>
    </Link>
  );
};

export default ArticleCard;
