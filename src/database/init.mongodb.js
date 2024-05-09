'use strict';

const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

class Database {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if ('dev' === 'dev') {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose
            .connect(MONGO_URI)
            .then(() => {
                console.log('Database connect sucessfully.');
            })
            .catch((err) => {
                console.log('Failed to connect database' + err);
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
