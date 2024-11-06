import React, { useEffect, useState } from "react";
import { getAllArticles, getArticlesByTopic } from "../../api";
import ArticleCard from "./ArticleCard";

const ArticlesList = (props) => {
  const { topic } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [topicArticles, setTopicArticles] = useState([]);

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
    if (topic !== "All") {
      setIsLoading(true);
      getArticlesByTopic(topic)
        .then((data) => {
          setTopicArticles(data);
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
      {topic === "All"
        ? articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })
        : topicArticles.map((topicArticle) => {
            return (
              <ArticleCard
                key={topicArticle.article_id}
                article={topicArticle}
              />
            );
          })}
    </div>
  );
};

export default ArticlesList;
