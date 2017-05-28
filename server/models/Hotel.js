'use strict';

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hotels');

module.exports = mongoose.model('Hotels', mongoose.Schema({
    name: String,
    stars: String,
    price: String
}));