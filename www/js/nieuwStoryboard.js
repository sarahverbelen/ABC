$(document).ready(function(){
    
    var nieuwStoryboard = false;
    
    $("#nieuwStoryboard").on("click", function(){
        nieuwStoryboard = true;
    });
    
    window.localStorage.setItem("nieuwStoryboard", nieuwStoryboard);
});