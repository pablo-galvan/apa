'use strict';

let _ = require('underscore');
let Endpoint = require('../modules/Endpoint');

class Autocomplete extends Endpoint {
    registerRoutes() {
        this.api.get('/autocomplete/:phrase', this.handlerAutocomplete.bind(this));
    }

    handlerAutocomplete(req, res) {
        this.service.get(`/homev2/autocomplete/hotels/${req.params.phrase}`)
            .then(response => {
                this.send(req, res, response);
            });
    }
}

module.exports = Autocomplete;
