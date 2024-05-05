const cors = require('cors');

module.exports = async (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use(
        cors({
            origin: '*',
            credentials: true,
        }),
    );
};
