import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-rdca.onrender.com",
  timeout: 5000,
});

function getAllArticles() {
  return api
    .get("/api/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.log(error);
    });
}

export { getAllArticles };
