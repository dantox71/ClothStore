const express = require('express');
const router = express.Router();

const {
    register,
    getMe,
    login,
    uploadUserPhoto,
    updateUserData,
    updateUserPassword
} = require('../controllers/auth');


const User = require('../models/Item');

const { protect } = require('../middleware/auth');


router.route('/register').post(register);
router.route('/login').post(login);


router.route('/me').get(protect, getMe);
router.route('/me/photo').put(protect, uploadUserPhoto);
router.route('/me/data').put(protect, updateUserData);
router.route('/me/password').put(protect, updateUserPassword);

module.exports = router;