$(document).ready(function() {
    var list = $("#listNews");
    $('#dateRow').hide(); // Default Datetime picker is hide.
    /**
     * Get Top Headline  
     */
    var ulrHeadline = "https://gnews.io/api/v4/top-headlines?token=f141e45c014a1fa43dedb9ee213442c0&lang=en";
    $.ajax({
        url: ulrHeadline,
        // url: 'test.json',
        type: 'GET',
        cache: true,

    }).done(function(data) { // if done then show the News list
        for (var i = 0; i < data['articles'].length; i++) {
            showNews(data['articles'][i]);
            if (i < data['articles'].length - 1) { // check if last news will not show the line. 
                var line = "<div class='row line'>" +
                    "<div class='col-md-1 col-lg-1'></div>" +
                    "<div class='col-md-10 col-lg-10'><hr></div>" +
                    "<div class='col-md-1 col-lg-1'></div></div>";
                list.append(line);
            }
        }
    }).fail(function(f) { // if fails then output to cosole
        console.log(f.responseText);
    });



    /**
     * Check if you choose filter by date then Date Form will show or hide 
     */

    $('#keyCheck').change(function() { //check the change event when user click on Checkbox
        if (this.checked)
            $('#keywordRow').show();
        else
            $('#keywordRow').hide();
    });
    $('#dateCheck').change(function() { //check the change event when user click on Checkbox
        if (this.checked)
            $('#dateRow').show();
        else
            $('#dateRow').hide();
    });

    /**
     * Check if keyword textbox or Datetime picker get focus then remove the error info.
     */
    $('#inputSearch').focus(function() {
        $('#error').removeClass('errStyle');
        $('#error').text("");
    });
    $('#dateFrom').focus(function() {
        $('#error').removeClass('errStyle');
        $('#error').text("");
    });

    /**
     * Get News from the Search 
     */

    $('#submitKeywords').click(function() {
        var urlSearch;
        var keyword = $('#inputSearch').val(); // Keyword
        if (keyword == "") { // check if keyword is empty.
            setError("Type keyword to search .");
            return;
        }
        if ($('#dateCheck').prop('checked') == true) { // if Date Filter  = true then do statements bellow
            var inputDateFrom = ($('#dateFrom').val()); // Date From
            var inputDateTo = ($('#dateTo').val()); // Date To
            const dateF = new Date(inputDateFrom); // Contruction Date type
            const dateT = new Date(inputDateTo);
            if (isNaN(dateF.getTime()) || isNaN(dateT.getTime())) { // check if keyword is empty 
                setError("Invalid Date.");
                return;
            } else if (dateF.getTime() > dateT.getTime()) { // check if Date from < date to
                setError("DateFrom greater than DateTo .");
                return;
            } else {
                urlSearch = "https://gnews.io/api/v4/search?q=" + keyword + "&from=" + dateF.toISOString() + "&to=" + dateT.toISOString() + "&token=f141e45c014a1fa43dedb9ee213442c0&lang=en";
            }
        } else {
            urlSearch = "https://gnews.io/api/v4/search?q=" + keyword + "&token=f141e45c014a1fa43dedb9ee213442c0&lang=en";
        }
        // Contruction Ajax request to get data from API  
        $.ajax({
            url: urlSearch,
            type: 'GET',
            cache: true,
        }).done(function(data) { // if done then show the News list
            list.empty(); // delete all of items exits.
            for (var i = 0; i < data['articles'].length; i++) {
                showNews(data['articles'][i]); // show News
                if (i < data['articles'].length - 1) { // check if last news will not show the line. 
                    var line = "<div class='row line'>" +
                        "<div class='col-md-1 col-lg-1'></div>" +
                        "<div class='col-md-10 col-lg-10'><hr></div>" +
                        "<div class='col-md-1 col-lg-1'></div></div>";
                    list.append(line);
                }
            }
        }).fail(function(f) { // if fails then output to cosole
            alert(f.responseText);
        });
        $('#dateFrom').val(" "); // set DateFrom value is default 
        $('#dateTo').val(" "); // set DateTo value is default
        $('#searchNewsForm').modal('hide'); // when the search is done then the Search form (Modal) will hide.  
        $('#inputSearch').val(' '); // and clear the text in Keyword input. 
        $('#dateCheck').prop('checked', false); // set Date checkbox value is false
    });

    /**
     * Function show News
     *  
     * */

    function showNews(item) {
        var row = "<div class='row listRow'>" +
            "<div class='col-sm-12 col-md-1 col-lg-1'></div>" +
            "<div class='picture col-sm-12 col-md-4 col-lg-4' style='background-image: url(" + item.image + ");' >" +
            "</div>" +
            "<div class='title col-sm-12 col-md-6 col-lg-6'>" +
            "<h6><a href='" + item.url + "' target='_blank'>" + item.title + "</a></h6>" +
            "<p><i><b>" + item.publishedAt + "</b></i></p>" +
            "<p>" + item.description + "</p>" +
            "</div>" +
            "<div class='col-sm-12 col-md-1 col-lg-1'></div>" +
            "</div>";
        list.append(row);
    }

    /**
     *  Set error information .
     */

    function setError(str) {
        $('#error').addClass('errStyle');
        $('#error').text(str);
    }

});