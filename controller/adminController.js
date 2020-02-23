const constants = require('../constants');
const adminService = require('../service/adminService');

module.exports.login = async (req, res) => {

    let response = { ...constants.defaultServerResponse };
    console.log('Trying to login as admin after validation');
    try {
        const responseFromServer = await adminService.login(req.body);
        response.status = 200;
        response.message = constants.adminMessage.LOGIN_SUCCESS;
        response.body = responseFromServer;
    } catch (error) {
        console.log('Something went wrong: Controller: login', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}    

module.exports.logout = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromServer = await adminService.logout(req.body);
        response.status = 200;
        response.message = constants.adminMessage.LOGOUT_SUCCESS;
        response.body = responseFromServer;
    } catch (error) {
        console.log('Something went wrong: Controller: logout', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}    

module.exports.getAllUsers = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try {
        const responseFromServer = await adminService.getAllUsers();
        response.status = 200;
        response.message = constants.adminMessage.SUCCESS_GET_ALL_USER_DETAILS;
        response.body = responseFromServer;
    } catch (error) {
        console.log('Something went wrong: Controller: GetUsers', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getAllUserPosts = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try {
        const responseFromServer = await adminService.getAllUsersPosts();
        response.status = 200;
        response.message = constants.adminMessage.SUCCESS_GET_ALL_USER_POSTS;
        response.body = responseFromServer;
    } catch (error) {
        console.log('Something went wrong: Controller: GetUsers', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}