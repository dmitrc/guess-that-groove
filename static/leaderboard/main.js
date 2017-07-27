var _w = window;

_w.onload = function() {
    jQuery.ajax({
            url: "api/leaderboard/1",
            type: "GET",

            contentType: 'application/json; charset=utf-8',
            success: function(resultData) {
                resultData = JSON.parse(resultData);

                document.getElementById("name1").innerHTML = JSON.stringify(resultData[0]["user"]);
                document.getElementById("score1").innerHTML = JSON.stringify(resultData[0]["score:"]);

                document.getElementById("name2").innerHTML = JSON.stringify(resultData[1]["user"]);
                document.getElementById("score2").innerHTML = JSON.stringify(resultData[1]["score:"]);

                document.getElementById("name3").innerHTML = JSON.stringify(resultData[2]["user"]);
                document.getElementById("score3").innerHTML = JSON.stringify(resultData[2]["score:"]);
            },
            error : function(jqXHR, textStatus, errorThrown) {
            },
            timeout: 120000,
        });
};