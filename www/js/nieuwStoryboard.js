$(document).ready(function(){
    
    $("#nieuwStoryboard").on("click", function(e){
        e.preventDefault();
        
        localStorage.setItem("HuidigStoryboard", "-1");
        
        window.location = $(this).attr("href");
        
    });
});