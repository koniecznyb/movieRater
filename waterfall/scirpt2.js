#!/usr/bin/env node

var async = require('async');
var flux = require('flux');
var http = require('http');
var request = require('request');

var val = 'movies 2014';

queries = ['batman', 'interstellar', 'hobbit'];

request.post('http://www.omdbapi.com/?t=' + 'batman',
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var JSONmovie = JSON.parse(body);
            if (JSONmovie.Response !== 'False' && JSONmovie.imdbRating !== 'N/A')
                console.log(JSONmovie.imdbRating);
        }
    });
