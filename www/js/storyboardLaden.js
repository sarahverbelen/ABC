$(document).ready(function () {

    var storyboardsJson = window.localStorage.getItem("storyboards");
    var storyboards = JSON.parse(storyboardsJson);
    
    $(".StoryboardInfo").remove();

    function displayStoryboard(storyboard){
        var storyboardHTML = $("<div>", {"class": "StoryboardInfo"})
        .append(
            $("<a>", {"href": "storyboard.html"})
            .append(
                $("<h6>").text(storyboard.naam)
            )
            .append(
                $("<p>", {"class": "fontRegular extraInfo"}).text("Deeltraject: " + storyboard.deeltraject)
            )
            .append(
                $("<p>", {"class": "fontRegular extraInfo"}).text("Semester: " + storyboard.semester)
            )
        );
        
        $(".content").append(storyboardHTML);
    }
    
    
    for(var i = 0; i < storyboards.length; i++){
        displayStoryboard(storyboards[i]);
    }
    
    
    $(".StoryboardInfo a").on("click", function (e) {
        e.preventDefault();
        console.log(storyboards);

    });


});
