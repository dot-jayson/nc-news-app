import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

const ArticlesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "all";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const orderBy = searchParams.get("order") || "desc";
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [notFoundError, setNotFoundError] = useState(false);
  const [badRequestError, setBadRequestError] = useState(false);

  const sortBys = ["created_at", "votes", "author"];
  const orderBys = ["desc", "asc"];

  useEffect(() => {
    setNotFoundError(false);
    setBadRequestError(false);
    if (sortBy) {
      let url = `/api/articles?`;
      if (topic !== "all") {
        url += `topic=${topic}&`;
      }
      if (sortBy) {
        url += `sort_by=${sortBy}&`;
      }
      if (orderBy) {
        url += `order=${orderBy}`;
      }

      getArticles(url)
        .then((data) => {
          if (data.status === 404) {
            setNotFoundError(true);
            setIsLoading(false);
          } else if (data.status === 400) {
            setBadRequestError(true);
            setIsLoading(false);
          } else {
            setArticles(data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [sortBy, orderBy, topic]);

  function handleSortByChange(event) {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("sort_by", event.target.value);
      return newParams;
    });
  }

  function handleOrderByChange(event) {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("order", event.target.value);
      return newParams;
    });
  }

  if (isError) {
    return <p>An error has occured</p>;
  }
  if (badRequestError) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-4xl">Bad request</p>
      </div>
    );
  }
  if (notFoundError) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-4xl">Topic not found</p>
      </div>
    );
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-sm m-auto bg-green-100 flex flex-col justify-around gap-5">
      <div className="flex justify-between">
        <p>Sort by:</p>
        <select
          name="sort_by"
          id="sort_by"
          onChange={handleSortByChange}
          value={sortBy}
        >
          {sortBys.map((sortBy) => {
            return (
              <option value={sortBy} key={sortBy}>
                {sortBy}
              </option>
            );
          })}
        </select>
        <p>Order by:</p>
        <select
          name="order_by"
          id="order_by"
          onChange={handleOrderByChange}
          value={orderBy}
        >
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
