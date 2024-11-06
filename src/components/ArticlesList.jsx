import React, { useEffect, useState } from "react";
import { getAllArticles, getArticlesByTopic } from "../../api";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

const ArticlesList = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "all";
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [articlesByTopic, setArticlesByTopic] = useState([]);

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

  useEffect(() => {
    if (topic !== "all") {
      setIsLoading(true);
      getArticlesByTopic(topic)
        .then((data) => {
          setArticlesByTopic(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
        });
    }
  }, [topic]);

  if (isError) {
    return <p>An error has occured</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-sm m-auto bg-green-100 flex flex-col justify-around gap-5">
      {topic === "all"
        ? articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })
        : articlesByTopic.map((articleByTopic) => {
            return (
              <ArticleCard
                key={articleByTopic.article_id}
                article={articleByTopic}
              />
            );
          })}
    </div>
  );
};

export default ArticlesList;
