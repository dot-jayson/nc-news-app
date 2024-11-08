import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-rdca.onrender.com",
  timeout: 5000,
});

function getArticleById(article_id) {
  return api
    .get(`/api/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
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
    .post(`/api/articles/${article_id}/comments`, request)
    .then((response) => {
      return response.data.comment;
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteComment(comment_id) {
  return api
    .delete(`/api/comments/${comment_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTopics() {
  return api
    .get("/api/topics")
    .then((response) => {
      return response.data.topics;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function getArticles(url) {
  return api
    .get(url)
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}

export {
  getArticleById,
  getCommentsByArticleId,
  voteOnArticle,
  postComment,
  deleteComment,
  getTopics,
  getArticles,
};
