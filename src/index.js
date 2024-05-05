const express = require('express');

const appExpress = require('./app-express');

const StartServer = async () => {
    const app = express();

    await appExpress(app);

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
};

StartServer();
