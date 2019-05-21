$(document).ready(function(){
    console.log("ready");
     //Previous page stack overflow.com//
     $('.pijlTerug').click(function(){
        parent.history.back();
        return false;
    });
    
    //menuanimation//
    $('.open').click(function(){
       $('#menu').animate({ "left": "-=80%" } ); 
    });
    
    $('.terug').click(function(){
       $('#menu').animate({ "left": "+=80%" } ); 
    });
    
}); 