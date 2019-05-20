$(document).ready(function () {
    $(".alleMethodes").hide();

    var arrowUp = false;

    $(".kaartje").on("click", function () {
        //anderen toeklappen
        $(".alleMethodes").slideUp();
        $(".fa-angle-down").css({"transform": "rotate(45deg)"}).css({"-webkit-transform": "rotate(45deg)"});
        arrowUp = false;
        
        //deze uitklappen
        $(this).children(".alleMethodes").slideToggle();

        if (arrowUp) {
            $(this).children(".fa-angle-down").css({ //pijltje naar beneden draaien
                "transform": "rotate(45deg)"
            }).css({
                "-webkit-transform": "rotate(45deg)"
            }).css({
                "margin-top": "1vh"
            });
        } else {
            $(this).children(".fa-angle-down").css({ //pijltje naar boven draaien
                "transform": "rotate(-135deg)"
            }).css({
                "-webkit-transform": "rotate(-135deg)"
            }).css({
                "margin-top": "1.9vh"
            });
        }
        
        arrowUp = !arrowUp;
    })
});
