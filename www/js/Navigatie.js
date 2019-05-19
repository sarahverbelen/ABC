$(document).ready(function(){
    
    console.log("ready");
    $("#menu").hide();
    
    $("div#menuToggle").click(function () {
        
        $("#menu").fadeToggle();
        
        
    });
}); 