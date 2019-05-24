$(document).ready(function(){
    
    $(".maakStoryboard").on("click", function(e){
        e.preventDefault();
        
        console.log("zegiheofihzfhi");
        
        localStorage.setItem("HuidigStoryboard", "-1");
        
        window.location = $(this).attr("href");
        
    });
});