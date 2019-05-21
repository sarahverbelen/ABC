$(document).ready(function(){
    console.log("ready");
    
    $('.open').click(function(){
       $('#menu').animate({ "left": "-=80%" } ); 
    });
    
    $('.terug').click(function(){
       $('#menu').animate({ "left": "+=80%" } ); 
    });
    
}); 