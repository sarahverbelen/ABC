$(document).ready(function(){
    
    console.log("ready");
    $("#menu").hide();
    
    $("#menuToggle").click(function () {
        
        $("#menu").show();   
        
    });
    
    $("#pijlTerugRood").click(function () {
        
        $("#menu").hide();
    });
    
    //pijlterug// Stackoverflow.com
    
    
    $('.pijlTerug').click(function(){
        parent.history.back();
        return false;
    });

}); 