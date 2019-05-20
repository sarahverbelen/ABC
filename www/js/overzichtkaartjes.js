$(document).ready(function () {
    $(".alleMethodes").hide();

    $(".kaartje").on("click", function () {    
        //deze uitklappen
        $(this).children(".alleMethodes").slideToggle();
        if ($(this).children(".fa-angle-down").css("transform") == "matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)" ) {
            //checkt naar welke kant het pijltje staat en draait het naar de andere kant
            $(this).children(".fa-angle-down").css({ 
                "transform": "rotate(-135deg)"
            }).css({
                "-webkit-transform": "rotate(-135deg)"
            }).css({
                "margin-top": "1.9vh"
            });
        } else {
            $(this).children(".fa-angle-down").css({ 
                "transform": "rotate(45deg)"
            }).css({
                "-webkit-transform": "rotate(45deg)"
            }).css({
                "margin-top": "1vh"
            });
        }
         

    })
});
