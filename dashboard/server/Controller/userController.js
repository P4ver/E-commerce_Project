const pool = require('../db');


const getUser = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        connection.query('SELECT * FROM user', (err, row)=>{
            connection.release();
            if (err) throw err;
            res.send(row);
        })
    })
}

module.exports = getUser;