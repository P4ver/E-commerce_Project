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

// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = path.join(__dirname, '../uploads');
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir);
//         }
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Folder in Cloudinary
        allowed_formats: ['jpg', 'png'], // Allowed image formats
    },
});
const upload = multer({ storage: storage });
const createProduct = (req, res) => {
    const { name, price, description, category_id } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'INSERT INTO products (name, price, description, category_id, image) VALUES (?, ?, ?, ?, ?)',
            [name, price, description, category_id, imageUrl],
            (err, result) => {
                connection.release();
                if (err) throw err;
                res.send({ id: result.insertId, name, price, description, category_id, image: imageUrl });
            }
        );
    });
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

    pool.getConnection((err, connection) => {
        if (err) throw err;

        let query = 'UPDATE products SET name = ?, price = ?, description = ?, category_id = ?';
        let queryParams = [name, price, description, category_id, id];

        if (imageUrl) {
            query += ', image = ?'; // Add image to the query if provided
            queryParams.splice(4, 0, imageUrl); // Insert image before 'id'
        }

        query += ' WHERE id = ?';

        connection.query(query, queryParams, (err, result) => {
            connection.release();
            if (err) throw err;
            res.send({ id, name, price, description, category_id, image: imageUrl });
        });
    });
};
// const createProduct = (req, res) => {
//     const { name, price, description, category_id } = req.body;
//     let image = null;

//     // Check if an image is uploaded
//     if (req.file) {
//         image = path.join('uploads', req.file.filename).replace(/\\/g, '/');
//     }
//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         connection.query(
//             'INSERT INTO products (name, price, description, category_id, image) VALUES (?, ?, ?, ?, ?)',
//             [name, price, description, category_id, image],
//             (err, result) => {
//                 connection.release();
//                 if (err) throw err;
//                 res.send({ id: result.insertId, name, price, description, category_id, image });
//             }
//         );
//     });
// };


// const updateProduct = (req, res) => {
//     const { id } = req.params;
//     const { name, price, description, category_id } = req.body;
//     const image = req.file ? `uploads/${req.file.filename}` : null; // Get the new image if uploaded

//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         // Check if an image is provided for the update
//         let query = 'UPDATE products SET name = ?, price = ?, description = ?, category_id = ?';
//         let queryParams = [name, price, description, category_id, id];

//         if (image) {
//             query += ', image = ?'; // Add image to the query if provided
//             queryParams.splice(4, 0, image); // Insert the image before the 'id'
//         }

//         query += ' WHERE id = ?';

//         connection.query(query, queryParams, (err, result) => {
//             connection.release();
//             if (err) throw err;

//             res.send({ id, name, price, description, category_id, image: image ? `/${image}` : null });
//         });
//     });
// };

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
