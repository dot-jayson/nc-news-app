import { useEffect, useState } from "react";
import ArticlesList from "./ArticlesList";
import { getTopics } from "../../api";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [topics, setTopics] = useState([]);
  const [timeOutError, setTimeOutError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeOutError(false);
    getTopics()
      .then((data) => {
        if (data.code === "ECONNABORTED") {
          setTimeOutError(true);
          setIsLoading(false);
        } else {
          setTopics(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  function handleClickAll() {
    navigate("/articles");
  }

  function handleTopicClick(topic) {
    navigate(`/articles?topic=${topic.slug}`);
  }

  if (isError) {
    return <p>An error has occured</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (timeOutError) {
    return <p>Took too long making request to API, please try again</p>;
  }

  return (
    <div className="bg-[#322d2d] pb-10">
      <h2 className="text-center pt-2">Topics: </h2>
      <div className="flex justify-around pt-3 pb-5">
        <button
          onClick={handleClickAll}
          className="bg-blue-600 px-2.5 py-1.5 rounded-lg text-slate-200"
        >
          All
        </button>
        {topics.map((topic) => {
          return (
            <button
              onClick={() => handleTopicClick(topic)}
              className="bg-blue-600 px-2.5 py-1.5 rounded-lg text-slate-200"
              key={topic.slug}
            >
              {topic.slug}
            </button>
          );
        })}
      </div>
      <ArticlesList topics={topics} />
    </div>
  );
};

export default Articles;
