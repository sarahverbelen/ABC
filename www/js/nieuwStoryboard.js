$(document).ready(function(){
    
    $("#nieuwStoryboard").on("click", function(){
        window.localStorage.setItem("nieuwStoryboard", true);
    });
});