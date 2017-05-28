'use strict';

let asynquence = require('asynquence');
let config = require('../config');
let mongoose = require('mongoose');
let promise = require('bluebird');

class Model {
    constructor(model, schema, callback) {
        this.mongoose = mongoose;
        this.mongoose.Promise = promise;
        this.model = model;
        this.schema = schema;

        this.callback = callback;

        asynquence()
            .then(this.connect.bind(this))
            .then(this.createSchema.bind(this))
            .then(this.createModel.bind(this))
            .val(() => {
                this.callback();
            });
    }

    connect(done) {
        this.mongoose.connect(config.mongodb.host, (err) => {
            if (err) {
                this.onError(err);
            }
            else {
                done();
            }
        });
    }

    createSchema(done) {
        let res = new this.mongoose.Schema(this.schema);
        return done(res);
    }

    createModel(done, schema) {
        this.Model = this.mongoose.model(this.model, schema);
        return done();
    }

    onError(err) {
        console.error(`Error Mongo connect: ${err}`);
        return this.close();
    }

    close() {
        return this.mongoose.connection.close();
    }
}

module.exports = Model;
