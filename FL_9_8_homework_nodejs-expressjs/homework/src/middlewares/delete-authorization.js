module.exports = app => {
    const delete_authorization = (req, res, next) => {
        if (req.method === 'DELETE') {
            if (req.headers.authorization === 'X-Password qwerty') { //Basic WC1QYXNzd29yZDpxd2VydHk=   X-Password qwerty
                console.log('Success');
                next();
            } else {
                return res.status(401).json({
                    "message": 'Unauthorized.'
                });
            }

        }
        next();
    }
    app.use(delete_authorization);
};