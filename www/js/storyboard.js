$(document).ready(function () {

    var storyboards = [];

    //PLUSKNOP OPEN/TOE-KLAPPEN
    $(".plusKaartjes").hide();

    $("#plus").on("click", function () {
        $(".plusKaartjes").slideToggle();
    });

    //DOELSTELLINGEN OPEN/TOE-KLAPPEN  
    $(".doelstellingenInhoudOpen").hide();

    $("#doelstellingen, #doelstellingDropdown").on("click", function () {
        $(".doelstellingenInhoudOpen").slideToggle();
    });

    //BEWERKKNOP KAARTJES
    function editKaartje(dit, e) {
        e.preventDefault();
        var ditKaartje = $(dit).parent(".kaartje");
        ditKaartje.children("form").slideToggle();
        $(dit).toggleClass("editKaartje");
        $(dit).toggleClass("sluitKaartje");
    }

    $(".editKaartje").on("click", function (e) {
        editKaartje(this, e);
    });

    //DISPLAY METHODE RADIOBUTTON - FUNCTIE
    function displayMethode(methodenLijst) {
        var methodenHTML = $("<div>");
        for (var i = 0; i < methodenLijst.length; i++) {
            var methode = $("<label>", {
                    "class": "containerMethoden"
                }).text(methodenLijst[i])
                .append(
                    $("<input>", {
                        "type": "radio",
                        "name": "radio",
                    })
                )
                .append(
                    $("<span>", {
                        "class": "checkmarkMethoden"
                    })
                );

            methodenHTML.append(methode);
        }
        return methodenHTML;
    }


    //DISPLAY KAARTJE - FUNCTIE
    function displayKaartje(kaartje) {

        $.ajax({
            "url": "../json/kaartjes.json"
        }).done(function (data) {
            var contact = data[kaartje.kleur].contactmethoden;
            var digitaal = data[kaartje.kleur].digitaalmethoden;

            var contactHTML = displayMethode(contact);
            var digitaalHTML = displayMethode(digitaal);

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
                    }).text(kaartje.activiteit.charAt(0).toUpperCase() + kaartje.activiteit.slice(1))
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
                )
                .append(
                    $("<form>", {
                        "class": "methodieken",
                        "style": "display: none"
                    })
                    .append(
                        $("<h6>").text("Contactmethoden")
                    )
                    .append(contactHTML)
                    .append(
                        $("<h6>").text("Digitale methoden")
                    )
                    .append(digitaalHTML)
                )
            $(".kaartjes").append(kaartjeHTML);

            $(".editKaartje").on("click", function (e) {
        editKaartje(this, e);
    });
            
        });
    }

    //NIEUW STORYBOARD MAKEN
    var nieuwStoryboard = window.localStorage.getItem("nieuwStoryboard");
    if (nieuwStoryboard == "true") {
        $(".kaartjes .kaartje").remove();
        window.localStorage.setItem("nieuwStoryboard", false);

        var kaartjes = [];

        var lesfase1 = new Lesfase("lesfase 1", "", "", kaartjes)

        var lesfasen = [lesfase1];

        var storyboard = new Storyboard("nieuw Storyboard", lesfasen, "", "", "", "")



        $(".plusKaartjes a").on("click", function (e) {
            e.preventDefault();

            var kleur, activiteit;
            kleur = $(this).attr("class");

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

            $.ajax({
                "url": "../json/kaartjes.json"
            }).done(function (data) {
                console.log(data);
                activiteit = data[kleur].activiteit;

                var kaartje = new Kaartje(kleur, "", "", activiteit);

                kaartjes.push(kaartje);
                displayKaartje(kaartje);
                storyboards.push(storyboard);

                var jsonStoryboards = JSON.stringify(storyboards);
                window.localStorage.setItem("storyboards", jsonStoryboards);
                console.log(storyboard);


            }).error(function (een, twee, drie) {
                console.log(een);
                console.log(twee);
                console.log(drie);
            });

        });



    };
});
