module.exports = {
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },
    adminMessage: {
        ADMIN_NOT_FOUND: 'Incurrect (email) or Password',
        INVALID_PASSWORD: 'Incurrect email or (Password)',
        LOGIN_SUCCESS: 'Login Success',
        LOGOUT_SUCCESS: 'Logout Success',
        ALREADY_LOGGED_OUT: 'Logout was done previously',
        EXPIRES_IN: '2h',
        SUCCESSFULLY_LOGGED_OUT: 'Successfully Logout',
        SUCCESS_GET_ALL_USER_DETAILS: 'Successful fetch',
        SUCCESS_GET_ALL_USER_POSTS: 'Successfull fetch'
    },
    userMessage: {
        USER_NOT_FOUND: 'Incurrect (email) or Password',
        INVALID_PASSWORD: 'Incurrect email or (Password)',
        LOGIN_SUCCESS: 'Login Success',
        LOGOUT_SUCCESS: 'Logout Success',
        ALREADY_LOGGED_OUT: 'Logout was done previously',
        LOGIN_BEFORE: 'Please login',
        EXPIRES_IN: 300,
        SUCCESSFULLY_UPDATED_IMAGE: 'Successfully uploaded image',
        SUCCESSFULLY_LOGGED_OUT: 'Successfully Logout',
        SUCCESS_FETCH_USER_DETAILS: 'Successful fetch',
        SUCCESS_UPDATION_OF_USER_PROFILE_PICTURE: 'Successful update',
        SUCCESS_GET_USER_POST: 'Successful fetch',
        UPLOAD_FOLDER: './database/images/',
        FILE_TYPE_ERROR: 'Only .png, .jpg and .jpeg format allowed!'
    },
    requestValidationMessage: {
        BAD_REQUEST: 'Unexpected parameter',
        TOKEN_MISSING: 'Can find token'
    }
}