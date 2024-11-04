import Articles from "./components/Articles";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";

function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
