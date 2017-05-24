'use strict';

let _ = require('underscore');
let Endpoint = require('../modules/Endpoint');

class Autocomplete extends Endpoint {
    registerRoutes() {
        this.api.get('/autocomplete', this.handlerAutocomplete.bind(this));
    }

    handlerAutocomplete(req, res) {
        
    }
}

module.exports = Autocomplete;
