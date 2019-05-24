$(document).ready(function () {

    var kaartjeNummer = 0;

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    // DOELSTELLINGEN/INHOUD
    $(".doelstellingenInhoudOpen").hide();
    $("main").on("click", '.doelstellingen, .doelstellingDropdown', function () {
        $('.doelstellingenInhoudOpen').slideToggle();
    });


    //STORYBOARDS OPHALEN
    $.ajax({
        'url': 'http://10.3.50.56:3015/getData',
        'method': 'POST',
        'data': {
            'uuid': localStorage.getItem('uuid')
        }
    }).done(function (data) {
        console.log(isEmpty(data));

        if (!isEmpty(data)) {
            console.log(JSON.parse(data["storyboards"]));
            var storyboards = JSON.parse(data["storyboards"]);
        } else {
            var storyboards = [];
        }


        var plaatsStoryboard = localStorage.getItem('HuidigStoryboard');
        console.log(storyboards == "");

        if (plaatsStoryboard == "-1" || storyboards == "") { //NIEUW STORYBOARD MAKEN: alleen deze sectie bij een nieuw storyboard! (of als er nog geen storyboards gemaakt zijn)
            var lesfasen = [];
            var doelstellingen = [];
            var nieuwStoryboard = new Storyboard("nieuwStoryboard", lesfasen, "", "", "", doelstellingen);
            var kaartjes = [];
            var eersteLesfase = new Lesfase("Lesfase 1", "", "", kaartjes);
            lesfasen.push(eersteLesfase);
            storyboards.push(nieuwStoryboard);
            console.log(storyboards);
            plaatsStoryboard = storyboards.length - 1;
            localStorage.setItem('HuidigStoryboard', plaatsStoryboard);
        } else {
            for (var i = 1; i < storyboards[plaatsStoryboard].lesfasen.length; i++) {
                console.log(storyboards[plaatsStoryboard].lesfasen[i]);

                //MAAK LESFASE
                $('main').prepend('<div class="heleLesfase" id="' + i + '" style="display: none"><div class="verzamelbalkBovenKaartjes"><a href="overview.html" class="uitzoomen"></a><div class="lesfase"><h6>' + storyboards[plaatsStoryboard].lesfasen[i].naam /* hier komt var naar Lesfase titel */ + '</h6><h3 class="fontRegular doelstellingen">Doelstellingen / inhoud</h3><div class="doelstellingDropdown"></div></div></div><div class="doelstellingenInhoudOpen"><h6>Doelstellingen</h6><label class="containerDoelstellingen">D1: Lorem ipsum sit amett<input type="checkbox" checked="checked"><span class="checkmarkDoelstellingen"></span></label><h6>Inhoud</h6><form><textarea></textarea></form><button><img src="../img/icons/vink.svg"></button></div><div class="kaartjes"></div></div>');

            }

            for (var i = 0; i < storyboards[plaatsStoryboard].lesfasen.length; i++) {
                //MAAK KAARTJES PER LESFASE
                for (var j = 0; j < storyboards[plaatsStoryboard].lesfasen[i].kaartjes.length; j++) {
                    console.log(storyboards[plaatsStoryboard].lesfasen[i].kaartjes[j]);
                    displayKaartje(storyboards[plaatsStoryboard].lesfasen[i].kaartjes[j], i, j);
                }
            }



            $(".heleLesfase#0").show();
        }


        // SWIPE
        var huidigeLesfase = 0; // teller huidige lesfase

        function createLesfase() {
            var kaartjes = [];

            var NaamLesfase = "Lesfase " + (huidigeLesfase + 1);
            $('main').prepend('<div class="heleLesfase" id="' + huidigeLesfase + '"><div class="verzamelbalkBovenKaartjes"><a href="overview.html" class="uitzoomen"></a><div class="lesfase"><h6>' + NaamLesfase /* hier komt var naar Lesfase titel */ + '</h6><h3 class="fontRegular doelstellingen">Doelstellingen / inhoud</h3><div class="doelstellingDropdown"></div></div></div><div class="doelstellingenInhoudOpen"><h6>Doelstellingen</h6><label class="containerDoelstellingen">D1: Lorem ipsum sit amett<input type="checkbox" checked="checked"><span class="checkmarkDoelstellingen"></span></label><h6>Inhoud</h6><form><textarea></textarea></form><button><img src="../img/icons/vink.svg"></button></div><div class="kaartjes"></div></div>');
            var extraLesfase = new Lesfase(NaamLesfase, "", "", kaartjes);
            storyboards[plaatsStoryboard].lesfasen.push(extraLesfase);
            console.log("aantal Lesfasen: " + storyboards[plaatsStoryboard].lesfasen.length);
        }


        $('body').on('swipeleft', function () {
            $('.heleLesfase#' + huidigeLesfase).hide();
            huidigeLesfase += 1;
            console.log("huidigeLesfase: " + huidigeLesfase);
            //if statement checkt als huidigeLesfase al bestaat:
            if ($('main').find('.heleLesfase#' + huidigeLesfase).size() == 0) {
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
                console.log("huidigeLesfase: " + huidigeLesfase);
            }
        });

        //PLUSKNOP OPEN/TOE-KLAPPEN
        $(".plusKaartjes").hide();

        $("#plusSymbool").on("click", function () {
            $(".plusKaartjes").slideToggle();
        });

        //BEWERKKNOP KAARTJES
        function editKaartje(dit, e) {
            e.preventDefault();
            var ditKaartje = $(dit).parent(".kaartje");
            ditKaartje.children("form").slideToggle();
            ditKaartje.children("button").slideToggle();
            $(dit).toggleClass("editKaartje");
            $(dit).toggleClass("sluitKaartje");
        }

        $("body").on("click", ".bevestigKaartje", function (e) {
            
            var ditKaartje = $(this).siblings(".sluitKaartje").attr("data-nummer");
            console.log(ditKaartje)
            
            //notitie
            var dezeNota = $(this).siblings("form").children(".kaartjeNota").val();
            storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].kaartjes[ditKaartje].nota = dezeNota;

            $(this).siblings("p.storyboardKaart").text(dezeNota);
            
            
            //kaartje weer toeklappen
            editKaartje(this, e);

            save();
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
        function displayKaartje(kaartje, huidigelesfase, kaartjeNummer) {
            $.ajax({
                "url": "../json/kaartjes.json"
            }).done(function (data) {
                var contact = data[kaartje.kleur].contactmethoden;
                var digitaal = data[kaartje.kleur].digitaalmethoden;  
                       
                var id = huidigelesfase + kaartjeNummer + Math.round(Math.random());
                var nummer = kaartjeNummer;

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
                            "href": "#",
                            "ID": id,
                            "data-nummer": nummer
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
                        .append(
                            $("<h6>").text("Notities")
                        )
                        .append(
                            $("<textarea>", {
                                "class": "kaartjeNota"
                            }).val(kaartje.nota)
                        )
                    )
                    .append(
                        $("<button>", {
                            "class": "bevestigKaartje plus" + kaartje.kleur.charAt(0).toUpperCase() + kaartje.kleur.slice(1),
                            "style": "display: none"
                        })
                        .append(
                            $("<div>", {
                                "class": "confirm"
                            })
                        )
                    )
                    .append(
                        $("<button>", {
                            "class": "verwijderKaartje plus" + kaartje.kleur.charAt(0).toUpperCase() + kaartje.kleur.slice(1),
                            "style": "display: none"
                        })
                        .append(
                            $("<div>", {
                                "class": "verwijder"
                            })
                        )
                    )
                $('.heleLesfase#' + huidigelesfase + " .kaartjes").append(kaartjeHTML);

                $(".editKaartje[ID=" + id + " ]").on("click", function (e) {
                    editKaartje(this, e);
                });

            });
        }



        $(".plusKaartjes a").on("click", function (e) {
            e.preventDefault();
            console.log("klik");
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
                console.log(plaatsStoryboard);
                storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].kaartjes.push(kaartje);
                
                var nummerKaartje = storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].kaartjes.length - 1;
                
                displayKaartje(kaartje, huidigeLesfase, nummerKaartje);
                console.log(storyboards[plaatsStoryboard]);
                $(".plusKaartjes").slideToggle();


            }).error(function (een, twee, drie) {
                console.log(een);
                console.log(twee);
                console.log(drie);
            });

        });

        function save() {
            var saveObj = {
                uuid: localStorage.getItem("uuid"),
                storyboards: JSON.stringify(storyboards)
            }

            $.ajax({
                "url": "http://10.3.50.56:3015/insertData",
                "method": "POST",
                "data": saveObj

            }).done(function () {
                console.log("saved");
            });
        }

        setTimeout(save(), 3000); // autosave

        $('.save').on('click', function () { // manual save
            save();
            alert('opgeslagen!')
        });

    });

});
