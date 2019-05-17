$(document).ready(function(){
    
    console.log("ready");
    $("#menu a").hide();
    
    $("div#menuToggle").click(function () {
        
      
//        $("#menu a").toggle( "blind", {direction: "top"}, 1000 );
        $("#menu a").fadeToggle();
        
        
    });
}); 