const Admin = require('../database/models/adminModel');
const Users = require('../database/models/userModel');
const constants = require('../constants/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = async ({email, password}) => {
    try {
        const admin = await Admin.findOne({email});
        if (!admin) {
            throw new Error(constants.adminMessage.ADMIN_NOT_FOUND);
        }
        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid){
            throw new Error(constants.adminMessage.INVALID_PASSWORD);
        }
        admin.loggedin = true;
        let result = await admin.save();
        const token = jwt.sign({id: admin._id}, process.env.ADMIN_SECRET_KEY, { expiresIn: constants.adminMessage.EXPIRES_IN});
        return { token };
    } catch (error) {
        console.log('Something went wrong: Service: login', error);
        throw new Error(error);
    }
}

module.exports.logout = async ({email, password}) => {
    try {
        const admin = await Admin.findOne({email});
        if (!admin) {
            throw new Error(constants.adminMessage.ADMIN_NOT_FOUND);
        }
        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid){
            throw new Error(constants.adminMessage.INVALID_PASSWORD);
        }
        if (!admin.loggedin) {
            return { 'caution': constants.adminMessage.ALREADY_LOGGED_OUT};
        }
        admin.loggedin = false;
        let result = await admin.save();
        return {};
    } catch (error) {
        console.log('Something went wrong: Service: logout', error);
        throw new Error(error);
    }
}

module.exports.getAllUsers = async () => {
    try {
        const user = await Users.find({}, {"posts": 0, "createdAt": 0, "updatedAt": 0, "__v": 0});
        return user;
    } catch (error) {
        console.log('Somthing went wrong: Service : get all Users', error);
        throw new Error(error);
    }
}

module.exports.getAllUsersPosts = async () => {
    try {
        const posts = await Users.find({}, {"createdAt": 0, "updatedAt": 0, "__v": 0}) 
        return posts;
    } catch (error) {
        console.log('Somthing went wrong : Serivce : get all posts', error);
        throw new Error(error);
    }
}