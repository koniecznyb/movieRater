#!/usr/bin/env node

var async = require('async');
var flux = require('flux');
var http = require('http');
var request = require('request');

var val = 'Batman';

function searchForTorrents(val, callback) {
    var queries = [];
    flux.search(val, function(err, torrents) {
        for (var c = 0; c < 10; c++) {
            var re = /^.*([1][9][0-9][0-9]|[2][0-9][0-9][0-9]).*$/ig;
            while ((m = re.exec(torrents[c].title)) !== null) {
            //     if (m.index === re.lastIndex) {
            //         re.lastIndex++;
            //     }
            //     // console.log(m);
            //     var movieTitle = m.input;
            //     var str = movieTitle.substring(0, movieTitle.search(movieTitle.replace(/^.*([1][9][0-9][0-9]|[2][0-9][0-9][0-9]).*$/ig, '$1')));
                queries.push(torrents[c]);
            }
        }
        callback(queries);
    });
}

searchForTorrents(val, function(queries) {
    console.log(queries);
});
