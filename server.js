const app = require('./src/app');
const { PORT } = require('./src/config');

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
