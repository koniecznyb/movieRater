#!/usr/bin/env node

var async = require('async');
var flux = require('flux');
var http = require('http');
var request = require('request');

var val = 'Batman';

var q = [
    {torrentQuery:
        { title: 'Batman: Assault on Arkham 2014 1080p BrRip x264 YIFY',
        torrentInfo:
            { size: '1267 MB',
            seeds: '538',
            peers: '82',
            hash: '5aef97311d6922332a390fe2b82e12527db7af5a' },
        provider: 'Torrentz',
        category: 'Movies' },
    imdbQuery:
         { imdbRating: '2.3',
            votes: '123' }}
       ];

var a = { Title: 'Son of Batman',
  Year: '2014',
  Rated: 'PG-13',
  Released: '06 May 2014',
  Runtime: '74 min',
  Genre: 'Animation, Action, Adventure',
  Director: 'Ethan Spaulding',
  Writer: 'Bob Kane (characters), Grant Morrison (comic book), Andy Kubert (graphic novel illustrator), James Robinson (story), Joe R. Lansdale (screenplay)',
  Actors: 'Jason O\'Mara, Stuart Allan, Thomas Gibson, Morena Baccarin',
  Plot: 'Batman learns he has a violent, unruly pre-teen son, secretly raised by the terrorist group the League of Assassins.',
  Language: 'English',
  Country: 'USA',
  Awards: 'N/A',
  Poster: 'http://ia.media-imdb.com/images/M/MV5BMTc4MDY3NDU3MF5BMl5BanBnXkFtZTgwODQ2MjU2MTE@._V1_SX300.jpg',
  Metascore: 'N/A',
  imdbRating: '6.6',
  imdbVotes: '5,976',
  imdbID: 'tt3139072',
  Type: 'movie',
  Response: 'True' };

var b = { title: 'Batman: Assault on Arkham 2014 1080p BrRip x264 YIFY',
  torrentInfo:
   { size: '1267 MB',
     seeds: '538',
     peers: '82',
     hash: '5aef97311d6922332a390fe2b82e12527db7af5a' },
  provider: 'Torrentz',
  category: 'Movies',
  contentInfo:
   { isHD: true,
     quality: '1080p',
     codec: 'H.264',
     digitalMedium: 'BRRip',
     originalMedium: 'Blu-ray' } };

var table = [];
table.push({torrentQuery: a, imdbQuery: b});
console.log(table[0].torrentQuery.quality);
