const ErrorHandler = (err, req, res, next) => {
    console.log('==================== Start Error Logger ===============');
    console.log(err);
    console.log('==================== End Error Logger ===============');

    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message,
    });
};

module.exports = ErrorHandler;
