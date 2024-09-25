// Helper to handle signup-related MongoDB duplicate key errors
const handleSignupDuplicateKeyError = (err) => {
    const field = Object.keys(err.keyValue)[0]; // This will be 'email' or 'username'
    const value = err.keyValue[field];
    err.statusCode = 400;

    if (field === 'email') {
        err.message = `Signup failed: Email '${value}' is already in use.`;
    } else if (field === 'username') {
        err.message = `Signup failed: Username '${value}' is already in use.`;
    }
};

// Helper to handle login-related errors
const handleLoginError = (err) => {
    if (err.statusCode === 401) {
        err.message = 'Login failed: Incorrect email or password.';
    } else if (err.statusCode === 400) {
        err.message = 'Login failed: Please provide both email and password.';
    }
};

module.exports = {
    handleSignupDuplicateKeyError,
    handleLoginError,
};
