$(document).ready(function () {

    var storyboardsJson = window.localStorage.getItem("storyboards");
    var storyboards = JSON.parse(storyboardsJson);

    
    
    
    $(".StoryboardInfo a").on("click", function (e) {
        e.preventDefault();
        console.log(storyboards);

    });


});
