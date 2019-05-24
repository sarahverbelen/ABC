$(document).ready(function () {

    $.ajax({
        'url': 'http://10.3.50.56:3015/getData',
        'method': 'POST',
        'data': {
            'uuid': localStorage.getItem('uuid')
        }
    }).done(function (data) {

        console.log(JSON.parse(data["storyboards"]));
        var storyboards = JSON.parse(data["storyboards"]);

        displayStoryboardInfo(storyboards);
    });


    function displayStoryboardInfo(storyboards) {

        for (var i = 0; i < storyboards.length; i++) {

            console.log(storyboards[i].naam);

            var storyboardHTML = $("<div>", {
                    "class": "StoryboardInfo",
                    "id": i
                })
                .append(
                    $("<a>", {
                        "href": "storyboard.html"
                    })
                    .append(
                        $("<h6>").text(storyboards[i].naam)
                    )
                    .append(
                        $("<p>", {
                            "class": "fontRegular extraInfo"
                        }).text("Opleidingsonderdeel: " + storyboards[i].opleidingsonderdeel)
                    )
                    .append(
                        $("<p>", {
                            "class": "fontRegular extraInfo"
                        }).text("Semester: " + storyboards[i].semester)
                    )
                );

            $(".content").append(storyboardHTML);

        }

    }
    
    $("body").on("click", ".StoryboardInfo", function(e){
        e.preventDefault();
        
        localStorage.setItem("HuidigStoryboard", $(this).attr("id"));
        
        window.location = "storyboard.html";
        
    });
    
});
