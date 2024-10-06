const pool = require('../db');
// const { upload } = require('./uploadController');

// Get all products with category name
const getProducts = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            `SELECT products.*, categories.name AS category_name
             FROM products
             LEFT JOIN categories ON products.category_id = categories.id`,
            (err, rows) => {
                connection.release();
                if (err) throw err;
                res.send(rows);
            }
        );
    });
};

// Get product by ID with category name
const getProductById = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            `SELECT products.*, categories.name AS category_name
             FROM products
             LEFT JOIN categories ON products.category_id = categories.id
             WHERE products.id = ?`,
            [id],
            (err, row) => {
                connection.release();
                if (err) throw err;
                res.send(row);
            }
        );
    });
};


// Create a new product with category_id
// const createProduct = (req, res) => {
//     const { name, price, description, category_id } = req.body;  // Include category_id in the request body
//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         // Include category_id in the insert query
//         connection.query(
//             'INSERT INTO products (name, price, description, category_id) VALUES (?, ?, ?, ?)', 
//             [name, price, description, category_id], 
//             (err, result) => {
//                 connection.release();
//                 if (err) throw err;

//                 res.send({
//                     id: result.insertId, 
//                     name, 
//                     price, 
//                     description, 
//                     category_id  // Return category_id in the response
//                 });
//             }
//         );
//     });
// };

const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


const createProduct = (req, res) => {
    const { name, price, description, category_id } = req.body;
    let image = null;

    // Check if an image is uploaded
    if (req.file) {
        image = path.join('uploads', req.file.filename).replace(/\\/g, '/');
    }
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'INSERT INTO products (name, price, description, category_id, image) VALUES (?, ?, ?, ?, ?)',
            [name, price, description, category_id, image],
            (err, result) => {
                connection.release();
                if (err) throw err;
                res.send({ id: result.insertId, name, price, description, category_id, image });
            }
        );
    });
};



// Update a product with category_id
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'UPDATE products SET name = ?, price = ?, description = ?, category_id = ? WHERE id = ?',
            [name, price, description, category_id, id],
            (err, result) => {
                connection.release();
                if (err) throw err;
                res.send({ id, name, price, description, category_id });
            }
        );
    });
};

// Delete a product
const deleteProduct = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.send({ message: `Product with ID ${id} deleted successfully` });
        });
    });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    upload
};
