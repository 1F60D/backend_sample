
const mysql = require('mysql2/promise'); 
const config = require('../../config'); 

const DB_CONFIG = config().databases.mysql; 

/** Create Database Pool */
const DB_POOL = mysql.createPool({
  host: DB_CONFIG.host, 
  user: DB_CONFIG.user, 
  password: DB_CONFIG.password, 
  database: DB_CONFIG.database
}); 

/** Execute Sql Query  */
const EXEC_QUERY = async (sql) => {

  try {
    const DB_CONN = await DB_POOL.getConnection(async CONN => CONN); 
    
    try {
      const [rows] = await DB_CONN.query(sql); 
      DB_CONN.release(); 

      return rows; 

    } catch(err) {
      console.error('Error Occured @ Query Executing'); 
      throw new Error(err); 
    }

  } catch(err) {
    console.error(err); 
    console.error('Error Occured @ Getting database connection'); 
    // throw new Error(err); 
  }
}

/** Execute Sql Query with transaction  */
const EXEC_QUERY_TRANS = async (sql) => {

  try {
    const DB_CONN = await DB_POOL.getConnection(async CONN => CONN); 
    
    try {
      await DB_CONN.beginTransaction(); 
      const [rows] = await DB_CONN.query(sql); 
      await DB_CONN.commit(); 
      DB_CONN.release(); 

      return rows; 

    } catch(err) {
      await DB_CONN.rollback(); 
      DB_CONN.release(); 
      console.error('Error Occured @ Executing Query Transaction '); 
      throw new Error(err); 
    }

  } catch(err) {
    console.error('Error Occured @ Getting database connection'); 
    throw new Error(err); 
  }
  
}


module.exports = {
  EXEC_QUERY, 
  EXEC_QUERY_TRANS
}
