var listHeadsNews = document.getElementById("listHeadlines");
var url = "https://gnews.io/api/v4/top-headlines?token=f141e45c014a1fa43dedb9ee213442c0&lang=en";
var acti = document.getElementById("acticle");

function getNews() {

    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function() {
        const jsonNews = JSON.parse(request.response);

        for (var i = 0; i < jsonNews.articles.length; i++) {



            frameNews.innerHTML = "<img src='" + jsonNews.articles[i].image + "' width='100px' height='100px'>";
            acti.appendChild(frameNews);
        }

        // var para = document.createElement("p");
        // acti.innerHTML = jsonNews.articles[0].title;
    };

    function drawFrameNews() {
        var frameNews = document.createElement("DIV");
        acti.appendChild(frameNews);
    }

    /*
    fetch("https://gnews.io/api/v4/top-headlines?token=f141e45c014a1fa43dedb9ee213442c0&lang=en")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        });
        */
}