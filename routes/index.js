var express = require('express');
var router = express.Router();
var parseQuery = require('../parseQuery');
var flux = require('flux');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Rated Movie Finder'
    });
});

router.post('/', function(req, res) {
    var query = req.body.query;

    results = [{
        title: 'batman',
        rating: '2.3'
    }, {
        title: 'batman 2',
        rating: '4.3'
    }];



    async.series([
        function(callback) {
            // do some stuff ...
            parseQuery(query, function respond(data) {
                console.log('eloelo');

            });
            callback();

        },
        function(callback) {
            // do some more stuff ...
            console.log('koniec');
            res.end('koniec');
            callback();
        }
    ]);



});

module.exports = router;
