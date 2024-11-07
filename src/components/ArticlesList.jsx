import React, { useEffect, useState } from "react";
import {
  getAllArticles,
  getArticlesByTopic,
  getSortedArticles,
} from "../../api";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

const ArticlesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "all";
  const sortBy = searchParams.get("sort_by") || "";
  const orderBy = searchParams.get("order") || "desc";
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);

  const sortBys = ["created_at", "votes", "author"];
  const orderBys = ["desc", "asc"];

  useEffect(() => {
    setIsLoading(true);
    if (topic !== "all") {
      getArticlesByTopic(topic)
        .then((data) => {
          setArticles(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      getAllArticles()
        .then((data) => {
          setArticles(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [topic]);

  useEffect(() => {
    if (sortBy) {
      const url = `/api/articles?${
        topic !== "all" ? `topic=${topic}` : ""
      }&sort_by=${sortBy}&order=${orderBy}`;
      setIsLoading(true);
      getSortedArticles(url)
        .then((data) => {
          setArticles(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [sortBy, orderBy, topic]);

  function handleSortByChange(event) {
    if (event.target.value !== "default_sort_by") {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("sort_by", event.target.value);
        return newParams;
      });
    }
  }

  function handleOrderByChange(event) {
    if (event.target.value !== "default_order_by") {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("order", event.target.value);
        return newParams;
      });
    }
  }

  if (isError) {
    return <p>An error has occured</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-sm m-auto bg-green-100 flex flex-col justify-around gap-5">
      <div className="flex justify-between">
        <select name="sort_by" id="sort_by" onChange={handleSortByChange}>
          <option value="default_sort_by">Sort by</option>
          {sortBys.map((sortBy) => {
            return (
              <option value={sortBy} key={sortBy}>
                {sortBy}
              </option>
            );
          })}
        </select>
        <select name="order_by" id="order_by" onChange={handleOrderByChange}>
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
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </div>
  );
};

export default ArticlesList;
