//@flow
module.exports = class DAO {
   pool: any; 

   constructor(pool: any) {
      this.pool = pool;
   }

   query(sql: string, params: any, callback: (satus: number, data: any) => mixed) {
      this.pool.getConnection((error, connection) => {
         if (error) {
            console.error(error);
            return callback(500, { error: 'Could not connect to database!' });
         }

         connection.query(sql, params, (error, rows) => {
            connection.release();

            if (error) {
               console.error(error);
               return callback(500, { error: 'error querying' });
            }

            return callback(200, rows);
         });
      });
   }
};