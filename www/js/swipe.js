$(document).ready(function () {
     // doelstelling/ inhoud
    $(".doelstellingenInhoudOpen").hide();

    $("main").on("click",'.doelstellingen, .doelstellingDropdown' ,function () {
        var thisDropdown = $(this).find($('.doelstellingenInhoudOpen')).first();
        console.log(thisDropdown)
        thisDropdown.slideToggle();
    });

    var huidigeLesfase = 0; // teller huidige lesfase
    
    function createLesfase() {
        $('main').prepend('<div class="heleLesfase" id="' + huidigeLesfase + '"><div class="verzamelbalkBovenKaartjes"><a href="overview.html" class="uitzoomen"></a><div class="lesfase"><h6>' + huidigeLesfase /* hier komt var naar Lesfase titel */ + '</h6><h3 class="fontRegular doelstellingen">Doelstellingen / inhoud</h3><div class="doelstellingDropdown"></div></div></div><div class="doelstellingenInhoudOpen"><h6>Doelstellingen</h6><label class="containerDoelstellingen">D1: Lorem ipsum sit amett<input type="checkbox" checked="checked"><span class="checkmarkDoelstellingen"></span></label><h6>Inhoud</h6><form><textarea></textarea></form><button><img src="../img/icons/vink.svg"></button></div></div>');
    }


    $('body').on('swipeleft', $('.heleLesfase'), function () {
        console.log(huidigeLesfase);
        $('.heleLesfase#' + huidigeLesfase).hide();
        huidigeLesfase += 1;
        //if statement checkt als huidigeLesfase al bestaat:
        if ($('main').find('#' + huidigeLesfase).size() == 0)  {
            createLesfase();
        } else {
            $('.heleLesfase#' + huidigeLesfase).show();
        }
    });
    $('body').on('swiperight', $('.heleLesfase'), function () {
        if (huidigeLesfase > 0) {
            $('.heleLesfase#' + huidigeLesfase).hide();
            huidigeLesfase -= 1;
            $('.heleLesfase#' + huidigeLesfase).show();
            console.log(huidigeLesfase);
        }
    });
});
