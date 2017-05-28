'use strict';

let _ = require('underscore');
let Endpoint = require('../modules/Endpoint');
let Hotel = require('../models/Hotel');

class Autocomplete extends Endpoint {
    registerRoutes() {
        this.api.get('/hotels', this.handlerGet.bind(this));
        this.api.post('/hotels', this.handlerPost.bind(this));
    }

    handlerGet(req, res) {
        Hotel.find((e, hotels) => {
            this.send(req, res, {
                status: !!e ? 500 : 200,
                data: { 
                    hotels: !!e ? "Internal Error" : hotels
                }
            });
        })
    }

    handlerPost(req, res) {
        new Hotel({ 
            name: req.body.name,
            stars: req.body.stars,
            price: req.body.price 
        }).save((e) => {
            this.send(req, res, {
                status: !!e ? 500 : 200,
                data: {
                    hotel: !!e ? e : 'Saved!'
                }
            });
        });
    }
}

module.exports = Autocomplete;
