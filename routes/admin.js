const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const adminSchema = require('../apiSchema/loginSchema');
const tokenValidation = require('../middleware/tokenValidation');

router.get('/users',
    tokenValidation.validateAdminToken,
    adminController.getAllUsers    
);

router.get('/posts',
    tokenValidation.validateAdminToken,
    adminController.getAllUserPosts    
);

router.post('/login',
    joiSchemaValidation.validateBody(adminSchema.login),
    adminController.login
);

router.post('/logout',
    tokenValidation.validateAdminToken,
    adminController.logout    
);

module.exports = router