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

function getArticleById(article_id) {
  return api
    .get(`/api/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCommentsByArticleId(article_id) {
  return api
    .get(`/api/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      console.log(error);
    });
}

function voteOnArticle(article_id, request) {
  return api
    .patch(`/api/articles/${article_id}`, request)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function postComment(article_id, request) {
  return api
    .post(`/api/articles/${article_id}`, request)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  voteOnArticle,
  postComment,
};
