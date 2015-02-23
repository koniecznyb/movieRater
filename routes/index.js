var express = require('express');
var router = express.Router();
var async = require('async');
var flux = require('flux');
var http = require('http');
var request = require('request');

var NUMBER_OF_TORRENTS = 5;

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

            function searchForTorrents(val, callback) {
                var queries = [];
                flux.search(val, function(err, torrents) {
                    for (var c = 0; c < NUMBER_OF_TORRENTS; c++) {
                        var re = /^.*([1][9][0-9][0-9]|[2][0-9][0-9][0-9]).*$/ig;
                        while ((m = re.exec(torrents[c].title)) !== null) {
                            queries.push(torrents[c]);
                        }
                    }
                    callback(null, queries);
                });
            },

            function getMovieRatingsIMDB(queries, cb) {
                var functions = [];

                queries.forEach(function(query) {
                    functions.push(function(callback) {
                        var mov = query.title;
                        var movieName = mov.substring(0, mov.search(mov.replace(/^.*([1][9][0-9][0-9]|[2][0-9][0-9][0-9]).*$/ig, '$1')));
                        request.post('http://www.omdbapi.com/?t=' + movieName,
                            function(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    var JSONmovie = JSON.parse(body);
                                    callback(null, JSONmovie, query);
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
            var movies = [];
            result.forEach(function(res) {
                movies.push({
                    torrentQuery: res[1],
                    imdbQuery: res[0]
                });
            });
            console.log(movies);
            res.send(movies);

        }


    );



});

module.exports = router;
