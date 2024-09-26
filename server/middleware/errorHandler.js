const { handleSignupDuplicateKeyError, handleLoginError } = require('./loginAndRegistrationErrorHandlers');

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // MongoDB duplicate key error (E11000) during signup
    if (isMongoDuplicateKeyError(err)) {
        handleSignupDuplicateKeyError(err);
    }

    // Incorrect email or password during login
    if (isLoginError(err)) {
        handleLoginError(err);
    }

    // Default error response
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

// Helper to detect MongoDB duplicate key error   //registration
const isMongoDuplicateKeyError = (err) => {
    return err.code === 11000 && err.message.includes('registration');
};

// Helper to detect login-related errors
const isLoginError = (err) => {
    return err.message.includes('login');
};

module.exports = errorHandler;
