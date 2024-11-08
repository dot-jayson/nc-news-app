import Articles from "./components/Articles";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import SingleArticle from "./components/SingleArticle";
import ArticlesList from "./components/ArticlesList";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="bg-[#322d2d] min-h-screen text-[#faf8f6]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/users" element={<Users />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="*" to="/404" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
