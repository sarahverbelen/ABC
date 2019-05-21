$(document).ready(function(){
    
    $("#nieuwStoryboard").on("click", function(){
        window.localStorage.setItem("nieuwStoryboard", true);
    });
    
    console.log(window.localStorage.getItem("nieuwStoryboard"))
});