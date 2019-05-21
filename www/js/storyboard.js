$(document).ready(function () {

    //DISPLAY KAARTJE - FUNCTIE
    function displayKaartje(kaartje){
        var kaartjeHTML = $("<div>", {
            "class": "kaartje " + kaartje.kleur
        })
        .append(
            $("<div>", {
                "class": "triangle" + kaartje.kleur + " triangle"
            })
        )
        .append(
            $("<a>", {
                "class": "editKaartje",
                "href": "#"
            }).text("edit kaartje")
        )
        .append(
            $("<h2>", {
                "class": "storyboardKaart"
            }).text(kaartje.activiteit)
        )
        .append(
            $("<h3>", {
                "class": "fontRegular storyboardKaart"
            }).text(kaartje.methodiek)
        )
        .append(
            $("<p>", {
                "class": "storyboardKaart"
            }).text(kaartje.nota)
        );
        
        $(".kaartjes").append(kaartjeHTML);
    }

    //PLUSKNOP OPEN/TOE-KLAPPEN
    $(".plusKaartjes").hide();

    $("#plus").on("click", function () {
        $(".plusKaartjes").slideToggle();
    });

    //NIEUW STORYBOARD MAKEN
    var nieuwStoryboard = window.localStorage.getItem("nieuwStoryboard");
    if (nieuwStoryboard == "true") {
        $(".kaartjes").remove();
        window.localStorage.setItem("nieuwStoryboard", false);
        
        var lesfasen = [];

        var storyboard = new Storyboard("nieuw Storyboard", lesfasen, "", "", "", "")

        $(".plusKaartjes a").on("click", function (e) {
            e.preventDefault();
            var kleur = $(this).attr("class");

            switch (kleur) {
                case "plusOranje":
                    kleur = "oranje";
                    break;
                case "plusGeel":
                    kleur = "geel";
                    break;
                case "plusPaars":
                    kleur = "paars";
                    break;
                case "plusGroen":
                    kleur = "groen";
                    break;
                case "plusAqua":
                    kleur = "aqua";
                    break;
                case "plusRoze":
                    kleur = "roze";
                    break;
            }

            var kaartje = new Kaartje(kleur, "", "");
            console.log(kaartje);
            displayKaartje(kaartje);
        });

    }


});
