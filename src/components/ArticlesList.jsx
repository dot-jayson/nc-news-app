import React, { useEffect, useState } from "react";
import {
  getAllArticles,
  getArticlesByTopic,
  getSortedArticles,
} from "../../api";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

const ArticlesList = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "all";
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("");

  const sortBys = ["created_at", "votes", "author"];
  const orderBys = ["desc", "asc"];

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
          setArticles(data);
          setIsLoading(false);
          setSelectedSortBy("");
          setSelectedOrderBy("");
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
        });
    } else {
      setIsLoading(true);
      getAllArticles()
        .then((data) => {
          setArticles(data);
          setIsLoading(false);
          setSelectedSortBy("");
          setSelectedOrderBy("");
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
        });
    }
  }, [topic]);

  useEffect(() => {
    if (selectedSortBy) {
      const order = selectedOrderBy || "desc";
      const url = `/api/articles?${
        topic !== `topic=${topic}`
      }&sort_by=${selectedSortBy}&order=${order}`;

      console.log(url, "<<< formed url to fetch from");
      getSortedArticles(url).then((data) => {
        setArticles(data);
      });
    }
  }, [selectedSortBy, selectedOrderBy]);

  function handleSortByChange(event) {
    if (event.target.value !== "default_sort_by") {
      console.log(event.target.value, "<<< selected sort by");
      setSelectedSortBy(event.target.value);
    }
  }

  function handleOrderByChange(event) {
    if (event.target.value !== "default_order_by") {
      console.log(event.target.value, "<<< selected order by");
      setSelectedOrderBy(event.target.value);
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
