//@flow
const DAO = require('./dao.js');

//TODO: Fix article type 
module.exports = class Database extends DAO {
   getArticles(callback: (satus: number, data: any) => mixed) {
      super.query('SELECT id, title, image FROM article WHERE priority = 1 ORDER BY published DESC, id ASC LIMIT 20', [], callback);
   }

   getArticleById(id: number, callback: (satus: number, data: any) => mixed) {
      super.query(
         'SELECT id, title, author, LOWER(DATE_FORMAT(published, "%e %b %Y kl %H.%i")) as published, LOWER(DATE_FORMAT(edited, "%e %b %Y kl %H.%i")) as edited, image, caption, lead, text, category, priority FROM article WHERE id = ?',
         id,
         callback
      );
   }

   getArticlesByKeyword(keyword: string, callback: (satus: number, data: any) => mixed) {
      keyword = '%' + keyword + '%';
      let val = [keyword, keyword, keyword, keyword, keyword];
      super.query(
         'SELECT id, title, image FROM article WHERE title LIKE ? OR author LIKE ? OR caption LIKE ? OR lead LIKE ? OR text LIKE ? ORDER BY published DESC',
         val,
         callback
      );
   }

   getArticlesByCategory(category: string, callback: (satus: number, data: any) => mixed) {
      super.query('SELECT * FROM article WHERE category = ? ORDER BY published DESC LIMIT 20', category, callback);
   }

   postArticle(json: any, callback: (satus: number, data: any) => mixed) {
      let val = [json.title, json.author, json.image, json.caption, json.lead, json.text, json.category, json.priority];
      super.query('INSERT INTO article VALUES(DEFAULT, ?, ?, DEFAULT, DEFAULT, ?, ?, ?, ?, ?, ?)', val, callback);
   }

   deleteArticle(id: number, callback: (satus: number, data: any) => mixed) {
      super.query('DELETE FROM article WHERE id = ?', id, callback);
   }

   updateArticle(json: any, id: number, callback: (satus: number, data: any) => mixed) {
      let val = [json.title, json.author, json.image, json.caption, json.lead, json.text, json.category, json.priority, id];
      super.query(
         'UPDATE article SET title = ?, author = ?, image = ?, caption = ?, lead = ?, text = ?, category = ?, priority = ? WHERE id = ?',
         val,
         callback
      );
   }

   getRating(id: number, callback: (satus: number, data: any) => mixed) {
      super.query('SELECT AVG(value) as value FROM rating JOIN article ON rating.articleId = article.id WHERE article.id = ?', id, callback);
   }

   postRating(value: number, id: number, callback: (satus: number, data: any) => mixed) {
      super.query('INSERT INTO rating VALUES(DEFAULT, ?, ?)', [value, id], callback);
   }

   deleteRatings(id: number, callback: (satus: number, data: any) => mixed) {
      super.query('DELETE FROM rating WHERE articleId = ?', id, callback);
   }

   getComments(id: number, callback: (satus: number, data: any) => mixed) {
      super.query(
         'SELECT comment.nickname, comment.text, LOWER(DATE_FORMAT(comment.published, "%e %b %Y kl %H.%i")) as published FROM comment JOIN article ON comment.articleId = article.id WHERE article.id = ? ORDER BY comment.published DESC, nickname ASC',
         id,
         callback
      );
   }

   postComment(json: any, id: number, callback: (satus: number, data: any) => mixed) {
      let val = [json.nickname, json.text, id];
      super.query('INSERT INTO comment VALUES(?, ?, DEFAULT, ?)', val, callback);
   }

   deleteComments(id: number, callback: (satus: number, data: any) => mixed) {
      super.query('DELETE FROM comment WHERE articleId = ?', id, callback);
   }

   getLivefeed(callback: (satus: number, data: any) => mixed) {
      super.query('SELECT id, title, DATE_FORMAT(published, "%H.%i") as published FROM article ORDER BY published DESC, id ASC', [], callback);
   }
};