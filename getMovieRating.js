var http = require('http');

module.exports = function(movieName, cb){

    var request = require('request');
    request.post(
        'http://www.omdbapi.com/?t=' + movieName,
        function(error, response, body) {
         var JSONobject;
            if (!error && response.statusCode == 200) {
                JSONobject = JSON.parse(body);
                cb(JSONobject);
            }
        }
    );


};
