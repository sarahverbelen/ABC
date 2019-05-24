$(document).ready(function(){
    console.log("ready");
     //Previous page stack overflow.com//
     $('.pijlTerug').click(function(){
        parent.history.back();
        return false;
    });
    $('.overlay').hide();
    
    //menuanimation//
    $('.open').click(function(){
        $('.overlay').fadeIn();
       $('#menu').animate({ "left": "-=80%" } ); 
    });
    
    $('.terug').click(function(){
        $('.overlay').fadeOut();
       $('#menu').animate({ "left": "+=80%" } ); 
    });
    
}); 