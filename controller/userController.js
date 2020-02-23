
const constants = require('../constants');
const userService = require('../service/userService');

module.exports.login = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    try {
        const responseFromServer = await userService.login(req.body);
        response.status = 200;
        response.message = constants.userMessage.LOGIN_SUCCESS;
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
        const responseFromServer = await userService.logout(req.headers);
        response.status = 200;
        response.message = constants.userMessage.LOGOUT_SUCCESS;
        response.body = responseFromServer;
    } catch (error) {
        console.log('Something went wrong: Controller: logout', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}    

module.exports.userDetails = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromServer = await userService.userDetails(req.headers);
        response.status = 200;
        response.message = constants.userMessage.SUCCESS_FETCH_USER_DETAILS;
        response.body = responseFromServer;
    } catch (error) {
        console.log('Something went wrong: Controller: Fetching user details', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}    

module.exports.updateProfilePicture = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        console.log('userController');
        const responseFromServer = await userService.updateProfilePicture(req, res);
        response.status = 200;
        response.message = constants.userMessage.SUCCESS_UPDATION_OF_USER_PROFILE_PICTURE;
        response.body = responseFromServer;
    } catch (error) {
        console.log('Something went wrong: Controller: Fetching user details', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.posts = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromServer = await userService.userPosts(req.headers);
        response.status = 200;
        response.message = constants.userMessage.SUCCESS_GET_USER_POST;
        response.body = responseFromServer;
    } catch (error) {
        console.log('Something went wrong: Controller: Fetching user Posts', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}