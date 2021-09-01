//@flow
var mysql = require('mysql');

const Database = require('../src/database.js');
const sqlExecutor = require('../__tests__/sql/sqlExecutor.js');

//GitLab CI pool
var pool = mysql.createPool({
   connectionLimit: 2,
   host: 'mysql',
   user: 'root',
   password: 'secret',
   database: 'supertestdb',
   debug: false,
   multipleStatements: true
});

let database = new Database(pool);

//initializes the database
beforeAll(done => sqlExecutor('__tests__/sql/tables.sql', pool, done));

//resets test data before each test
beforeEach(done => sqlExecutor('__tests__/sql/testdata.sql', pool, done));

//closes the ConnectionPool
afterAll(() => {
   pool.end();
});

/*
                     -- NOTE --  
   These tests don't test the server endpoints directly, 
   but the funcions used by them. The server end points 
   are highlighted in a comment above the test.
*/

// -- GET /articles -- //
describe('get the articles from the database', () => {
   it('receives three articles', done => {
      database.getArticles((status, data) => {
         expect(data.length).toBe(3);

         expect(data[0].id).toBe(1);
         expect(data[1].id).toBe(2);
         expect(data[2].id).toBe(3);

         expect(data[0].title).toBe('Vetle Harnes vinner volleyballturnering');
         expect(data[1].title).toBe('Vetlegutten forteller: Slik lager du bulkeshake');
         expect(data[2].title).toBe('Snøkaos på Østlandet');

         expect(data[0].image).toBe(
            'https://g.acdn.no/obscura/API/dynamic/r1/ece5/tr_480_434_l_f/0000/nobl/2016/3/9/13/DSC_5166.JPG?chk=964428'
         );
         expect(data[1].image).toBe('https://i.ytimg.com/vi/42jnx2yC6Ik/maxresdefault.jpg');
         expect(data[2].image).toBe('https://i.ytimg.com/vi/McZtCIDAu6U/hqdefault.jpg');

         expect(status).toBe(200);
         done();
      });
   });
});

// -- GET /article/:id -- //
describe('get an article from the database by id', () => {
   it('receives an article when article id is 1', done => {
      database.getArticleById(1, (status, data) => {
         expect(data.length).toBe(1);

         expect(data[0].id).toBe(1);
         expect(data[0].title).toBe('Vetle Harnes vinner volleyballturnering');
         expect(data[0].author).toBe('Ola Nordmann');
         expect(data[0].image).toBe(
            'https://g.acdn.no/obscura/API/dynamic/r1/ece5/tr_480_434_l_f/0000/nobl/2016/3/9/13/DSC_5166.JPG?chk=964428'
         );
         expect(data[0].caption).toBe('Bildet viser sjefen');
         expect(data[0].lead).toBe('I denne artikkelen beskriver Vetle følelsen av å vinne volleyballturnering i mosjøen');
         expect(data[0].text).toBe('blablabla gøy artikkel');
         expect(data[0].category).toBe('kjendis');
         expect(data[0].priority).toBe(1);

         expect(status).toBe(200);
         done();
      });
   });

   it('does not receive an article when id is -1', done => {
      database.getArticleById(-1, (status, data) => {
         expect(data.length).toBe(0);
         expect(status).toBe(200);
         done();
      });
   });
});

// -- GET /search/:keyword -- //
describe('get articles from the database by keyword', () => {
   it('receives one article when keyword is volleyball', done => {
      database.getArticlesByKeyword('volleyball', (status, data) => {
         expect(data.length).toBe(1);
         expect(data[0].title).toContain('volleyball');
         expect(status).toBe(200);
         done();
      });
   });

   it('receives two articles when keyword is Vetle', done => {
      database.getArticlesByKeyword('Vetle', (status, data) => {
         expect(data.length).toBe(2);

         expect(data[0].title).toContain('Vetle');
         expect(data[1].title).toContain('Vetle');

         expect(status).toBe(200);
         done();
      });
   });

   it('does not receive any articles when keyword is banan', done => {
      database.getArticlesByKeyword('banan', (status, data) => {
         expect(data.length).toBe(0);
         expect(status).toBe(200);
         done();
      });
   });
});

// -- GET /category/:category -- //
describe('get articles from the database by category', () => {
   it('does not receive any articles when category is invalid', done => {
      database.getArticlesByCategory('tullekategori', (status, data) => {
         expect(data.length).toBe(0);
         expect(status).toBe(200);
         done();
      });
   });

   it('receives one article when category is kjendis', done => {
      database.getArticlesByCategory('kjendis', (status, data) => {
         expect(data.length).toBe(1);
         expect(data[0].category).toBe('kjendis');
         expect(status).toBe(200);
         done();
      });
   });

   it('receives two articles when category is nyheter', done => {
      database.getArticlesByCategory('nyheter', (status, data) => {
         expect(data.length).toBe(2);
         data.map(article => expect(article.category).toBe('nyheter'));
         expect(status).toBe(200);
         done();
      });
   });
});

// -- POST /article -- //
describe('post article to the database', () => {
   it('posts an article', done => {
      let article = {
         title: 'Vetle kastet ut fra Samfundet',
         author: 'Samfundet',
         image: 'https://www.featurepics.com/StockImage/20100414/drunk-man-stock-picture-1509683.jpg',
         caption: 'Bildet viser gutten',
         lead: 'Oioi hva har skjedd her',
         text: 'Vetle kastet ut. Drakk to cidere. Ble for full. :(',
         category: 'kultur',
         priority: 1
      };

      database.postArticle(article, (status, data) => {
         expect(data.affectedRows).toBe(1);
         expect(status).toBe(200);
         checkDatabase(4);
      });

      const checkDatabase = id =>
         database.getArticleById(id, (status, data) => {
            expect(data.length).toBe(1);
            expect(status).toBe(200);
            done();
         });
   });

   it('does not post an article when category is invalid', done => {
      let article = {
         title: 'Vetle kastet ut fra Samfundet',
         author: 'Samfundet',
         image: 'https://www.featurepics.com/StockImage/20100414/drunk-man-stock-picture-1509683.jpg',
         caption: 'Bildet viser gutten',
         lead: 'Oioi hva har skjedd her',
         text: 'Vetle kastet ut. Drakk to cidere. Ble for full. :(',
         category: 'tullekategori',
         priority: 1
      };

      // $FlowFixMe
      console.error = function() {}; //Avoid printing query error

      database.postArticle(article, (status, data) => {
         expect(status).toBe(500);
         done();
      });
   });
});

// -- DELETE /article/:id --
describe('delete article from the database', () => {
   it('deletes an article', done => {
      database.deleteArticle(3, (status, data) => {
         expect(data.affectedRows).toBe(1);
         expect(status).toBe(200);
         checkDatabase(3);
      });

      const checkDatabase = id =>
         database.getArticleById(id, (status, data) => {
            expect(data.length).toBe(0);
            expect(status).toBe(200);
            done();
         });
   });
});

// -- PUT /article/:id -- //
describe('update article in the database', () => {
   let article = {
      id: 1,
      title: 'Vetle kastet ut fra Samfundet',
      author: 'Samfundet',
      image: 'https://www.featurepics.com/StockImage/20100414/drunk-man-stock-picture-1509683.jpg',
      caption: 'Bildet viser gutten',
      lead: 'Oioi hva har skjedd her',
      text: 'Vetle kastet ut. Drakk to cidere. Ble for full. :(',
      category: 'nyheter',
      priority: 1
   };

   it('updates an article', done => {
      database.updateArticle(article, article.id, (status, data) => {
         expect(data.affectedRows).toBe(1);
         expect(status).toBe(200);
         checkDatabase(article.id);
      });

      const checkDatabase = id =>
         database.getArticleById(id, (status, data) => {
            expect(data.length).toBe(1);

            //$FlowFixMe
            Object.keys(article).map(prop => expect(data[0].prop).toBe(article.prop));

            expect(status).toBe(200);
            done();
         });
   });
});

// -- GET /article/:id/ratings -- //
describe('get a rating from the database', () => {
   it('gets the rating for article when article id is 1', done => {
      database.getRating(1, (status, data) => {
         expect(data.length).toBe(1);
         expect(data[0].value).toBe(3.6667);
         expect(status).toBe(200);
         done();
      });
   });

   it('does not get the rating for article when id is -1', done => {
      database.getRating(-1, (status, data) => {
         expect(data.length).toBe(1);
         expect(data.value).toBeUndefined();
         expect(status).toBe(200);
         done();
      });
   });
});

// -- POST /article/:id/ratings -- //
describe('post a rating in the database', () => {
   let rating = {
      value: 4,
      articleId: 1
   };

   it('posts a rating in an article', done => {
      database.postRating(rating.value, rating.articleId, (status, data) => {
         expect(data.affectedRows).toBe(1);
         expect(status).toBe(200);
         checkDatabase(rating.articleId);
      });

      const checkDatabase = id =>
         database.getRating(rating.articleId, (status, data) => {
            expect(data.length).toBe(1);
            expect(data[0].value).toBe(3.75);
            expect(status).toBe(200);
            done();
         });
   });
});

// -- DELETE /article/:id/ratings -- //
describe('delete all ratings from an article', () => {
   it('deletes all (three) ratings for article when article id is 1', done => {
      database.deleteRatings(1, (status, data) => {
         expect(data.affectedRows).toBe(3);
         expect(status).toBe(200);
         checkDatabase(1);
      });

      const checkDatabase = id =>
         database.getRating(id, (status, data) => {
            expect(data.length).toBe(1);
            expect(data[0].value).toBe(null);
            expect(status).toBe(200);
            done();
         });
   });

   it('deletes all (one) ratings for article when article id is 2', done => {
      database.deleteRatings(2, (status, data) => {
         expect(data.affectedRows).toBe(1);
         expect(status).toBe(200);
         checkDatabase(2);
      });

      const checkDatabase = id =>
         database.getRating(id, (status, data) => {
            expect(data.length).toBe(1);
            expect(data[0].value).toBe(null);
            expect(status).toBe(200);
            done();
         });
   });
});

// -- GET /article/:id/comments -- //
describe('get all comments from an article', () => {
   it('gets all (one) comments for article when article id is 1', done => {
      database.getComments(1, (status, data) => {
         expect(data.length).toBe(1);
         expect(data[0].nickname).toBe('Ola');
         expect(data[0].text).toBe('Fint og flott');
         expect(status).toBe(200);
         done();
      });
   });

   it('gets all (two) comments from article when article id is 2', done => {
      database.getComments(2, (status, data) => {
         expect(data.length).toBe(2);
         expect(data[0].nickname).toBe('Jarle');
         expect(data[0].text).toBe('Flink gutt');
         expect(data[1].nickname).toBe('Kari');
         expect(data[1].text).toBe('Huffamei');

         expect(status).toBe(200);
         done();
      });
   });
});

// -- POST /article/:id/comments -- //
describe('post a comment in the database', () => {
   let comment = {
      nickname: 'Ola Nordmann',
      text: 'Flott artikkel, bro',
      articleId: 1
   };

   it('posts a comment to article', done => {
      database.postComment(comment, comment.articleId, (status, data) => {
         expect(data.affectedRows).toBe(1);
         expect(status).toBe(200);
         checkDatabase(1);
      });

      const checkDatabase = id =>
         database.getComments(id, (status, data) => {
            expect(data.length).toBe(2);

            //$FlowFixMe
            Object.keys(comment).map(prop => expect(data[1].prop).toBe(comment.prop));

            expect(status).toBe(200);
            done();
         });
   });
});

// -- DELETE /article/:id/comments -- //
describe('delete all comments from an article', () => {
   it('deletes all (one) comment from article when article id is 1', done => {
      database.deleteComments(1, (status, data) => {
         expect(data.affectedRows).toBe(1);
         expect(status).toBe(200);
         checkDatabase(1);
      });

      const checkDatabase = id =>
         database.getComments(id, (status, data) => {
            expect(data.length).toBe(0);
            expect(status).toBe(200);
            done();
         });
   });

   it('deletes all (two) comments from article when article id is 2', done => {
      database.deleteComments(2, (status, data) => {
         expect(data.affectedRows).toBe(2);
         expect(status).toBe(200);
         checkDatabase(2);
      });

      const checkDatabase = id =>
         database.getComments(id, (status, data) => {
            expect(data.length).toBe(0);
            expect(status).toBe(200);
            done();
         });
   });

   it('deletes no comments from article when article id is -1', done => {
      database.deleteComments(-1, (status, data) => {
         expect(data.affectedRows).toBe(0);
         expect(status).toBe(200);
         done();
      });
   });
});

// -- GET /livefeed -- //
describe('get all aricles from the livefeed', () => {
   it('gets all (three) articles from the livefeed', done => {
      database.getLivefeed((status, data) => {
         expect(data.length).toBe(3);

         expect(data[0].id).toBe(1);
         expect(data[1].id).toBe(2);
         expect(data[2].id).toBe(3);

         expect(data[0].title).toBe('Vetle Harnes vinner volleyballturnering');
         expect(data[1].title).toBe('Vetlegutten forteller: Slik lager du bulkeshake');
         expect(data[2].title).toBe('Snøkaos på Østlandet');

         expect(status).toBe(200);
         done();
      });
   });
});
