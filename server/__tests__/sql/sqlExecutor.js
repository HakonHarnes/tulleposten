//@flow
let mysql = require('mysql');
let fs = require('fs');

/**
   Used in testing environment to write to database, namely to:
   - create tables 
   - insert test data
*/
module.exports = function run(filename: string, pool: any, done: () => mixed) {
   let sql = fs.readFileSync(filename, 'utf8');

   pool.getConnection((error, connection) => {
      if (error) {
         console.error(error);
         done();
      }

      connection.query(sql, (error, rows) => {
         connection.release();
         done();
      });
   });
};
