const express = require('express');
const router = express.Router();

const getUser = require('../Controller/userController');

router.get('/user', getUser);

module.exports = router
