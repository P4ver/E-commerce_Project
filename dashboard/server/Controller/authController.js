const jwt = require('jsonwebtoken');
const pool = require('../db')
const bcrypt = require('bcrypt');

const register = async(req, res)=>{
    const {name , password} = req.body

    if (!name || !password) {
        return res.status(400).json({ message: 'Please provide name and password' });
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hashedPassword during Registration', hashedPassword);

        pool.getConnection((err, connection) => {
            if (err) throw err;
            const checkUserQuery = 'SELECT * FROM user WHERE login_User = ?';
            connection.query(checkUserQuery, [name], (err, result) => {
                if (err) {
                    connection.release();
                    return res.status(500).json({ message: 'Server Error : problem during creating new user' });
                }

                if (result.length > 0) {
                    connection.release();
                    return res.status(409).json({ message: 'Username already exists' });
                }
                const insertUserQuery = 'INSERT INTO user (login_User, password_User) VALUES (?, ?)';
                connection.query(insertUserQuery, [name, hashedPassword], (err, result) => {
                    connection.release();

                    if (err) {
                        return res.status(500).json({ message: 'Server Error, will not be added' });
                    }

                    res.status(201).json({ message: 'User registered successfully' });
                });
                
            })
        })
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}


const login = async (req, res) => {
    const { name, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'SELECT * FROM user WHERE login_User = ?'
        connection.query(query ,[name], async (err, result) => {
            connection.release();

            if (err) {
                // console.error(err);
                return res.status(500).json({ message: 'Server Error, went wrong during login' });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: 'Identity incorrect' });
            }

            const {login_User, password_User} = result[0];
            console.log("result login : ", result);
            console.log("Password entered by user : ", password);
            console.log("Hashed password from database : ", password_User);
            
            // const isPasswordValid = await bcrypt.compare(password, password_User);
            const isPasswordValid = await bcrypt.compare(password, password_User);
            console.log("Is password valid : ", isPasswordValid);
            if (!isPasswordValid) {
                return res.status(401).json({message: "identity incorrect"});
            }

            const token = jwt.sign({ login_User }, 'my_secret_key', { expiresIn: '24h' });
            res.cookie('jwt', token, {httpOnly:true, maxAge: 86400000, secure: false})
            res.json({ 
                message:"logged in successfully",
                login_User_BE: login_User  
            });
        });
    });
}

const logout = (req, res) => {
    // Clear the cookie that holds the JWT
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
};



module.exports = {login, logout, register};
