

module.exports = function(query, cb) {
    var getMovieRating = require('./getMovieRating');
    var flux = require('flux');
    var m;

    flux.search(query, function(err, torrents) {
        for (var c = 0; c < 5; c++) {
            var re = /^.*([1][9][0-9][0-9]|[2][0-9][0-9][0-9]).*$/ig;
            while ((m = re.exec(torrents[c].title)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }

                var movieTitle = m.input;
                var str = movieTitle.substring(0, movieTitle.search(movieTitle.replace(/^.*([1][9][0-9][0-9]|[2][0-9][0-9][0-9]).*$/ig, '$1')));
                getMovieRating(str, function(query) {
                    cb({title: query.Title, rating: query.imdbRating});
                });
            }

        }
    });
};
