const app = require('./src/app');
const {
    app: { port },
} = require('./src/config/config.mongodb');

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
