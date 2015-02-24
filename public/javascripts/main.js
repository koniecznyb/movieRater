$( document ).on( "click",  function() {
    $("#mainTable").tablesorter();
});


// $('input[name="ohneiln"]').on('change', function() {
   //
   // });
$(function() {


    var source = $("#search-results").html();
    var dataTemplate = Handlebars.compile(source);
    $results = $('#results');

    $('#search').on('keyup', function(e) {
        if (e.keyCode === 13) {
            var parameters = {
                search: $(this).val()
            };
            $.get('/searching', parameters, function(data) {
                if (data instanceof Array) {
                    $results.html(dataTemplate({
                        movies: data
                    }));
                } else {
                    $results.html(data);
                }
            });
        }
    });
});
