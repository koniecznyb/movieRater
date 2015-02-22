var express = require('express');
var router = express.Router();
var async = require('async');
var flux = require('flux');
var http = require('http');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Rated Movie Finder'
    });
});


router.get('/searching', function(req, res) {
    var val = req.query.search;

    async.waterfall([

            function(callback) {
                callback(null, val);

            },

            function(val, callback) {
                var queries = [];
                var m;
                flux.search(val, function(err, torrents) {
                    for (var c = 0; c < 5; c++) {
                        var re = /^.*([1][9][0-9][0-9]|[2][0-9][0-9][0-9]).*$/ig;
                        while ((m = re.exec(torrents[c].title)) !== null) {
                            if (m.index === re.lastIndex) {
                                re.lastIndex++;
                            }

                            var movieTitle = m.input;
                            var str = movieTitle.substring(0, movieTitle.search(movieTitle.replace(/^.*([1][9][0-9][0-9]|[2][0-9][0-9][0-9]).*$/ig, '$1')));
                            queries.push(str);
                        }
                    }
                    callback(null, queries);
                });

            },

            function(queries, cb) {
                functions = [];

                queries.forEach(function(query) {
                    functions.push(function(callback) {
                        request.post('http://www.omdbapi.com/?t=' + query,
                            function(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    var JSONmovie = JSON.parse(body);
                                    callback(null, JSONmovie);
                                }
                            });
                    });
                });

                async.parallel(functions,
                    function(err, result) {
                        cb(null, result);
                    });
            }

        ],

        function(err, result) {
            result.forEach(function(movie) {
                res.send(movie);
            });
        }


    );

});

module.exports = router;
