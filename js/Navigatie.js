$(document).ready(function(){
    
    console.log("ready");
    $("#menu a").hide();
    
    $("div.hamburger").click(function () {
        
        $("#menu a").blindLeftToggle();
    });
}); 