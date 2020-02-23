const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userSchema = require('../apiSchema/loginSchema');
const tokenValidation = require('../middleware/tokenValidation');

router.post('/login',
    joiSchemaValidation.validateBody(userSchema.login),
    userController.login
);

router.get('/details',
    tokenValidation.validateUserToken,
    userController.userDetails
);

router.post('/logout',
    tokenValidation.validateUserToken,
    userController.logout    
);

router.post('/update_profile_picture',
    tokenValidation.validateUserToken,
    userController.updateProfilePicture
);

router.get('/posts',
    tokenValidation.validateUserToken,
    userController.posts    
);

module.exports = router;