$(document).ready(function(){
    
    console.log("ready");
    
   $('.bolletjes').click(function(){
       $('.bolletjes').hide()
       $('.terug').show();
       $('#opties').animate({ "left": "+=100%" } ); 
    });
    
    $('.terug').click(function(){
        $('.terug').hide();
        $('.bolletjes').show();
       $('#opties').animate({ "left": "-=100%" } ); 
    });
}); 