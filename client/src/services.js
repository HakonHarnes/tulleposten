// @flow
import axios from 'axios';

import { Article } from './components/article/article.js';
import { Comment } from './components/comment/comment.js';
import { Rating } from './components/rating/rating.js';

/**
   These classes are used as communication classes 
   between the client and server. The components use 
   these methods directly to fetch data. 
 */

class ArticleService {
   getArticles(category: ?string, keyword: ?string) {
      if (keyword) return axios.get<Article[]>('/search/' + keyword).then(response => response.data);

      if (category) return axios.get<Article[]>('/category/' + category).then(response => response.data);

      return axios.get<Article[]>('/article').then(response => response.data);
   }

   getArticle(id: number) {
      return axios.get<Article[]>('/article/' + id).then(response => response.data[0]);
   }

   postArticle(article: Article) {
      return axios.post<Article, void>('/article', article).then(response => response.data);
   }

   updateArticle(article: Article) {
      return axios.put<Article, void>('/article/' + article.id, article).then(response => response.data);
   }

   deleteArticle(article: Article) {
      return axios.delete<Article, void>('/article/' + article.id, article).then(response => response.data);
   }

   searchArticle(keyword: string) {
      return axios.delete<Article[], void>('/article/search/' + keyword).then(response => response.data);
   }
}

export let articleService = new ArticleService();

class RatingService {
   getRating(id: number) {
      return axios.get<Rating[]>('/article/' + id + '/ratings').then(response => response.data[0]);
   }

   postRating(rating: Rating) {
      return axios.post<Rating, void>('/article/' + rating.articleId + '/ratings', rating).then(response => response.data);
   }

   deleteRatings(article: Article) {
      return axios.delete<Article, void>('/article/' + article.id + '/ratings', article).then(response => response.data);
   }
}

export let ratingService = new RatingService();

class CommentService {
   getComments(id: number) {
      return axios.get<Comment[]>('/article/' + id + '/comments').then(response => response.data);
   }

   postComment(comment: Comment) {
      return axios.post<Comment, void>('/article/' + comment.articleId + '/comments', comment).then(response => response.data);
   }

   deleteComments(article: Article) {
      return axios.delete<Article, void>('/article/' + article.id + '/comments', article).then(response => response.data);
   }
}

export let commentService = new CommentService();

class LivefeedService {
   getArticles() {
      return axios.get<Article[]>('/livefeed').then(response => response.data);
   }
}

export let livefeedService = new LivefeedService();
