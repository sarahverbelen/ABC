$(document).ready(function () {
    
    var kaartjeNummer = 0;
    
    function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
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
        
        if(!isEmpty(data)){
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

        }

       
        // SWIPE
        var huidigeLesfase = 0; // teller huidige lesfase

        function createLesfase() {
            var kaartjes = [];
            
            var NaamLesfase = "Lesfase " + (huidigeLesfase + 1);
            $('main').prepend('<div class="heleLesfase" id="' + huidigeLesfase + '"><div class="verzamelbalkBovenKaartjes"><a href="overview.html" class="uitzoomen"></a><div class="lesfase"><h6>' + NaamLesfase /* hier komt var naar Lesfase titel */ + '</h6><h3 class="fontRegular doelstellingen">Doelstellingen / inhoud</h3><div class="doelstellingDropdown"></div></div></div><div class="doelstellingenInhoudOpen"><h6>Doelstellingen</h6><label class="containerDoelstellingen">D1: Lorem ipsum sit amett<input type="checkbox" checked="checked"><span class="checkmarkDoelstellingen"></span></label><h6>Inhoud</h6><form><textarea></textarea></form><button><img src="../img/icons/vink.svg"></button></div></div>');
            var extraLesfase = new Lesfase(NaamLesfase, "", "", kaartjes);
            storyboards[plaatsStoryboard].lesfasen.push(extraLesfase);
            console.log("aantal Lesfasen: " + storyboards[plaatsStoryboard].lesfasen.length);
        }


        $('body').on('swipeleft', function () {
            $('.heleLesfase#' + huidigeLesfase).animate({ "left": "-=100%" } ); 
            huidigeLesfase += 1;
            console.log("huidigeLesfase: " + huidigeLesfase);
            //if statement checkt als huidigeLesfase al bestaat:
            if ($('main').find('#' + huidigeLesfase).size() == 0) {
                createLesfase();
            } else {
                $('.heleLesfase#' + huidigeLesfase).animate({ "left": "-=100%" } ); 
            }
        });
        $('body').on('swiperight', $('.heleLesfase'), function () {
            if (huidigeLesfase > 0) {
                $('.heleLesfase#' + huidigeLesfase).animate({ "left": "+=100%" } ); 
                huidigeLesfase -= 1;
                $('.heleLesfase#' + huidigeLesfase).animate({ "left": "+=100%" } ); 
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

//        $(".editKaartje").on("click", function (e) {
//            editKaartje(this, e);
//        });

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
        function displayKaartje(kaartje, dit) {

            $.ajax({
                "url": "../json/kaartjes.json"
            }).done(function (data) {
                var contact = data[kaartje.kleur].contactmethoden;
                var digitaal = data[kaartje.kleur].digitaalmethoden;

                kaartjeNummer++;
            var id = huidigeLesfase + kaartjeNummer;
                
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
                            "ID": id
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
                $('.heleLesfase#' + huidigeLesfase).append(kaartjeHTML);

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
                displayKaartje(kaartje);
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
