import React, { useEffect, useState } from "react";
import { getAllArticles } from "../../api";
import ArticleCard from "./ArticleCard";

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  if (isError) {
    return <p>An error has occured</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-5">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </div>
  );
};

export default Articles;
