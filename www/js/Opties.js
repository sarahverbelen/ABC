$(document).ready(function(){
    
    console.log("ready");
    $("#opties").hide();

    
    $("#triangle-bottomleft").click(function () {
        
        $("#opties").toggle(); 
        $(".terug").toggle();
        $(".bolletjes").toggle();
        
    });

}); 