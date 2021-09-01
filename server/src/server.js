//@flow
import express from 'express';

import path from 'path';
import reload from 'reload';
import fs from 'fs';
import mysql from 'mysql';
const Database = require('./database.js');

const public_path = path.join(__dirname, '/../../client/public');

const app = express();

app.use(express.static(public_path));
app.use(express.json());

let pool = mysql.createPool({
   host: 'mysql.stud.iie.ntnu.no',
   user: 'haakaha',
   database: 'haakaha',
   password: 'q0Qy977f',
   debug: false
});

let database = new Database(pool);

app.get('/article', (req, res) => {
   database.getArticles((status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.post('/article', (req, res) => {
   database.postArticle(req.body, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.get('/article/:id', (req, res) => {
   database.getArticleById(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.delete('/article/:id', (req, res) => {
   database.deleteArticle(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.put('/article/:id', (req, res) => {
   database.updateArticle(req.body, req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.get('/article/:id/ratings', (req, res) => {
   database.getRating(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.post('/article/:id/ratings', (req, res) => {
   database.postRating(req.body.value, req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.delete('/article/:id/ratings', (req, res) => {
   database.deleteRatings(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.get('/article/:id/comments', (req, res) => {
   database.getComments(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.post('/article/:id/comments', (req, res) => {
   database.postComment(req.body, req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.delete('/article/:id/comments', (req, res) => {
   database.deleteComments(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.get('/search/:keyword', (req, res) => {
   database.getArticlesByKeyword(req.params.keyword, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.get('/category/:category', (req, res) => {
   database.getArticlesByCategory(req.params.category, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

app.get('/livefeed', (req, res) => {
   database.getLivefeed((status, data) => {
      res.status(status);
      res.json(data);
   });
});

reload(app).then(reloader => {
   app.listen(3000, (error: ?Error) => {
      if (error) console.error(error);
      console.log('Express server started'); 
      reloader.reload(); 
      fs.watch(public_path, () => reloader.reload());
   });
});