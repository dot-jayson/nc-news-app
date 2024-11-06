import { useEffect, useState } from "react";
import ArticlesList from "./ArticlesList";
import { getTopics } from "../../api";

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("All");

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  function handleClickAll() {
    setTopic("All");
  }

  function handleTopicClick(topic) {
    setTopic(topic.slug);
  }

  if (isError) {
    return <p>An error has occured</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-purple-400">
      <h2 className="text-center pt-2">Topics: {topic}</h2>
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

      <ArticlesList topic={topic} />
    </div>
  );
};

export default Articles;
