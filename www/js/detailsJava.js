$(document).ready(function(){
    
    console.log("ready");
    $(".tuto").hide();
    
    $("h1 img").click(function () {
        
        $(".tuto").fadeToggle().css("display", "inline");   
        
    });
    
}); 