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
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedOrderBy, setOrderBy] = useState("");
  const sortBys = ["created_at", "comment_count", "votes"];
  const orderBys = ["descending", "ascending"];

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
      <div className="flex justify-between">
        <select name="sort_by" id="sort_by">
          <option value="default_sort_by">Sort by</option>
          {sortBys.map((sortBy) => {
            return (
              <option value={sortBy} key={sortBy}>
                {sortBy}
              </option>
            );
          })}
        </select>
        <select name="order_by" id="order_by">
          <option value="default_order_by">Order by</option>
          {orderBys.map((orderBy) => {
            return (
              <option value={orderBy} key={orderBy}>
                {orderBy}
              </option>
            );
          })}
        </select>
      </div>
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
