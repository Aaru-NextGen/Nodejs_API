const User = require('../database/models/userModel');
const constants = require('../constants/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');


module.exports.login = async ({email, password}) => {
    try {
        
        const user = await User.findOne({email});
        console.log(user);
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid){
            throw new Error(constants.userMessage.INVALID_PASSWORD);
        }
        user.loggedin = true;
        let result = await user.save();
        console.log(result);
        const token = jwt.sign({id: user._id}, process.env.USER_SECRET_KEY);

        return { token };
    } catch (error) {
        console.log('Something went wrong: Service: login', error);
        throw new Error(error);
    }
}

module.exports.logout = async ({authorization}) => {
    try {
        const token = authorization.split('Bearer')[1].trim();
        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
        const user = await User.findOne({"_id": decoded.id}, {"posts": 0});
        if (user.loggedin === false) {
            throw new Error(constants.userMessage.ALREADY_LOGGED_OUT);
        }
        user.loggedin = false;
        let result = await user.save();
        return {'message' : constants.userMessage.SUCCESSFULLY_LOGGED_OUT};
    } catch (error) {
        console.log('Something went wrong: Service: Logout', error);
        throw new Error(error);
    }
}

module.exports.userDetails = async ({authorization}) => {
    try {
        const token = authorization.split('Bearer')[1].trim();
        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
        const user = await User.findOne({"_id": decoded.id}, {"posts": 0});
        if (user.loggedin) {
            return user
        } else {
            return { message: constants.userMessage.LOGIN_BEFORE};
        }
    } catch (error) {
        console.log(error.message);
    }
}


module.exports.userPosts = async ({authorization}) => {
    try {
        const token = authorization.split('Bearer')[1].trim();
        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
        const user = await User.findOne({"_id": decoded.id});
        if (user.loggedin) {
            return user.posts
        } else {
            return { message: constants.userMessage.LOGIN_BEFORE};
        }
    } catch (error) {
        console.log(error.message);
    }
}

const storage = multer.diskStorage({
    destination: constants.userMessage.UPLOAD_FOLDER,
    filename: function(req, file, cb){
        const token = req.headers.authorization.split('Bearer')[1].trim();
        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
        cb(null, decoded.id.toString());
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
        } else {
        cb(null, false);
        return cb(new Error(constants.userMessage.FILE_TYPE_ERROR));
        }
    },
    limits: { fileSize: 1024 * 1024*5}
}).single('file');

module.exports.updateProfilePicture = async (req, res) => {
    try {
        // console.log('userService updateProfilePicture');
        upload(req, res, (error) => {
            if (error) {
                // console.log('another error');
                console.log(error.message);
                return {'message' : error.message};
            }
        return {'message' : constants.userMessage.SUCCESSFULLY_UPDATED_IMAGE};
        });
    } catch (error) {
        console.log(error.message);
    }
}
