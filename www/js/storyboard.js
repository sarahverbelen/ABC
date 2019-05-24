$(document).ready(function () {

    console.log(localStorage.getItem('HuidigStoryboard'));
    
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

        if (!isEmpty(data)) { //als de data leeg is, maak gewoon een lege array (anders wil hij dat niet parsen)
            console.log(JSON.parse(data["storyboards"]));
            var storyboards = JSON.parse(data["storyboards"]);
        } else {
            var storyboards = [];
        }


        var plaatsStoryboard = localStorage.getItem('HuidigStoryboard');

        if (plaatsStoryboard == "-1" || storyboards == "") { //NIEUW STORYBOARD MAKEN: alleen deze sectie bij een nieuw storyboard! (of als er nog geen storyboards gemaakt zijn)
            var lesfasen = [];
            var doelstellingen = [];
            var nieuwStoryboard = new Storyboard("nieuwStoryboard", lesfasen, "", "", "", doelstellingen);
            var kaartjes = [];
            var eersteLesfase = new Lesfase("Lesfase 1", "", [], kaartjes);
            lesfasen.push(eersteLesfase);
            storyboards.push(nieuwStoryboard);
            console.log(storyboards);
            plaatsStoryboard = storyboards.length - 1;
            localStorage.setItem('HuidigStoryboard', plaatsStoryboard);
        } else {
        //OUD STORYBOARD INLADEN
            //pas titel in hoofdbalk aan
                $("header div a h2").text(storyboards[plaatsStoryboard].naam);
            
            $(".heleLesfase").remove();
            
            //lesfasen maken
            for (var i = 0; i < storyboards[plaatsStoryboard].lesfasen.length; i++) {
                
                if(storyboards[plaatsStoryboard].doelstellingen != ""){
                var doelstellingen = "";
                
                //doelstellingen per lesfasen
                 for(var j = 0; j < storyboards[plaatsStoryboard].lesfasen[i].doelstellingen.length; j++){
                     var checked;
                     if(storyboards[plaatsStoryboard].lesfasen[i].doelstellingen[j].aangevinkt){
                         checked = "checked";
                     } else {
                         checked = ""
                     }
                     doelstellingen = doelstellingen + '<label class="containerDoelstellingen">'+ storyboards[plaatsStoryboard].doelstellingen[j] +'<input type="checkbox" ' + checked + ' id=" ' + i + "_" + j + '"><span class="checkmarkDoelstellingen"></span></label>';
                     
                 }    
                
                //MAAK LESFASEN
                $('main').prepend('<div class="heleLesfase" id="' + i + '" style="display: none"><div class="verzamelbalkBovenKaartjes"><a href="overview.html" class="uitzoomen"></a><div class="lesfase"><h6 class="marginh6">' + storyboards[plaatsStoryboard].lesfasen[i].naam /* hier komt var naar Lesfase titel */ + '</h6><h3 class="fontRegular doelstellingen">Doelstellingen / inhoud</h3><div class="doelstellingDropdown"></div></div></div><div class="doelstellingenInhoudOpen"><h6 class="marginh6">Doelstellingen</h6>' + doelstellingen + '<h6>Inhoud</h6><form><textarea class="textareaInhoud"></textarea></form><button class="buttonInhoud"><img src="../img/icons/vink.svg"></button></div><div class="kaartjes"></div></div>'); 
                } else {
                    $('main').prepend('<div class="heleLesfase" id="' + i + '" style="display: none"><div class="verzamelbalkBovenKaartjes"><a href="overview.html" class="uitzoomen"></a><div class="lesfase"><h6 class="marginh6">' + storyboards[plaatsStoryboard].lesfasen[i].naam /* hier komt var naar Lesfase titel */ + '</h6><h3 class="fontRegular doelstellingen">Doelstellingen / inhoud</h3><div class="doelstellingDropdown"></div></div></div><div class="doelstellingenInhoudOpen"><h6 class="marginh6">Doelstellingen</h6><textarea class="textareaInhoud">' + storyboards[plaatsStoryboard].lesfasen[i].doelstellingen + '</textarea><h6>Inhoud</h6><form><textarea class="textareaInhoud"></textarea></form><button class="buttonInhoud"><img src="../img/icons/vink.svg"></button></div><div class="kaartjes"></div></div>'); 
                }
                    
                //MAAK KAARTJES PER LESFASE
                for (var j = 0; j < storyboards[plaatsStoryboard].lesfasen[i].kaartjes.length; j++) {
                    displayKaartje(storyboards[plaatsStoryboard].lesfasen[i].kaartjes[j], i, j);
                }
                
                //pas inhoud van lesfase aan
                $("#" + i).children(".doelstellingenInhoudOpen").children("form").children(".textareaInhoud").val( storyboards[plaatsStoryboard].lesfasen[i].inhoud);
            };

            $(".heleLesfase#0").show();
        }

        // SWIPE
        var huidigeLesfase = 0; // teller huidige lesfase

        //lesfase toevoegen
        function createLesfase() {
            var kaartjes = [];
            
            var doelstellingenArray = [];
            
            var NaamLesfase = "Lesfase " + (huidigeLesfase + 1);
            
            for(var i = 0; i < storyboards[plaatsStoryboard].doelstellingen.length; i++){
                var doelstellingObject = new Doelstelling(i, false);
                doelstellingenArray.push(doelstellingObject);
            }
            
            var extraLesfase = new Lesfase(NaamLesfase, doelstellingenArray, "", kaartjes);
            storyboards[plaatsStoryboard].lesfasen.push(extraLesfase);
            console.log(storyboards[plaatsStoryboard]);
            
            var doelstellingen = "";
                
                //doelstellingen per lesfasen
                 for(var j = 0; j < storyboards[plaatsStoryboard].doelstellingen.length; j++){
                     var checked = "";
                     
                     
                    if(storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].doelstellingen[j].aangevinkt){
                         checked = "checked";
                     }
                     doelstellingen = doelstellingen + '<label class="containerDoelstellingen">'+ storyboards[plaatsStoryboard].doelstellingen[j] +'<input type="checkbox" ' + checked + ' id=" ' + huidigeLesfase + "_" + j + '"><span class="checkmarkDoelstellingen"></span></label>';
                     
                 }  

            if(storyboards[plaatsStoryboard].doelstellingen != ""){
            $('main').prepend('<div class="heleLesfase" id="' + huidigeLesfase + '"><div class="verzamelbalkBovenKaartjes"><a href="overview.html" class="uitzoomen"></a><div class="lesfase"><h6 class="marginh6">' + NaamLesfase /* hier komt var naar Lesfase titel */ + '</h6><h3 class="fontRegular doelstellingen">Doelstellingen / inhoud</h3><div class="doelstellingDropdown"></div></div></div><div class="doelstellingenInhoudOpen"><h6 class="marginh6">Doelstellingen</h6>' + doelstellingen + '<h6>Inhoud</h6><form><textarea class="textareaInhoud"></textarea></form><button class="buttonInhoud"><img src="../img/icons/vink.svg"></button></div><div class="kaartjes"></div></div>');
            } else {
                 $('main').prepend('<div class="heleLesfase" id="' + huidigeLesfase + '" style="display: none"><div class="verzamelbalkBovenKaartjes"><a href="overview.html" class="uitzoomen"></a><div class="lesfase"><h6 class="marginh6">' + NaamLesfase /* hier komt var naar Lesfase titel */ + '</h6><h3 class="fontRegular doelstellingen">Doelstellingen / inhoud</h3><div class="doelstellingDropdown"></div></div></div><div class="doelstellingenInhoudOpen"><h6 class="marginh6">Doelstellingen</h6><textarea class="textareaInhoud"></textarea><h6>Inhoud</h6><form><textarea class="textareaInhoud"></textarea></form><button class="buttonInhoud"><img src="../img/icons/vink.svg"></button></div><div class="kaartjes"></div></div>'); 
            }

        }

        //links swipen
        $('body').on('swipeleft', function () {
            $('.heleLesfase#' + huidigeLesfase).hide();
            huidigeLesfase += 1;
            
            //if statement checkt als huidigeLesfase al bestaat:
            if ($('main').find('.heleLesfase#' + huidigeLesfase).size() == 0) {
                createLesfase();
            } else {
                $('.heleLesfase#' + huidigeLesfase).show();
            }
        });
        
        //rechts swipen
        $('body').on('swiperight', $('.heleLesfase'), function () {
            if (huidigeLesfase > 0) {
                $('.heleLesfase#' + huidigeLesfase).hide();
                huidigeLesfase -= 1;
                $('.heleLesfase#' + huidigeLesfase).show();
            }
        });
        
        //lesfase aanpassen
        $("body").on("click", ".buttonInhoud", function(){
            
            //inhoud
           var inhoud = $("#" + huidigeLesfase).children(".doelstellingenInhoudOpen").children("form").children(".textareaInhoud:last-of-type").val();
            storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].inhoud = inhoud;
            
            
            //doelstellingen
            if(storyboards[plaatsStoryboard].doelstellingen != ""){
            $(this).siblings(".containerDoelstellingen").each(function(index){
                var checked = $(this).children("input").is(":checked");
                var lesfaseDoelstelling = $(this).children("input").attr("id").split("_");
                
                storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].doelstellingen[lesfaseDoelstelling[1]].aangevinkt = checked;
                
            })
            } else {
                
                var doelstellingen = $("#" + huidigeLesfase).children(".doelstellingenInhoudOpen").children("form").children(".textareaInhoud:first-of-type").val();
                storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].doelstellingen = doelstellingen;
            }

            
             $("#" + huidigeLesfase).children(".doelstellingenInhoudOpen").slideUp();
            
            save();
            
        });

        //KAARTJE VERWIJDEREN   
        $("body").on("click", ".verwijderKaartje", function(){
            
            var ditKaartje = $(this).siblings("a").attr("data-nummer");
            
            $(this).parent(".kaartje").remove();
            storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].kaartjes.splice(ditKaartje, 1)
            
            save();
            
        })
        
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
            $(dit).siblings("a").toggleClass("editKaartje");
            $(dit).siblings("a").toggleClass("sluitKaartje");
        }

        //kaartjes bewerken
        $("body").on("click", ".bevestigKaartje", function (e) {
            var dit = this;
            var event = e;

            var ditKaartje = $(this).siblings("a").attr("data-nummer");
            //console.log(ditKaartje)

            var kleur = $(this).parents(".kaartje").attr("class").split(" ")[1];

            //notitie
            var dezeNota = $(this).siblings("form").children(".kaartjeNota").val();
            storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].kaartjes[ditKaartje].nota = dezeNota;

            $(this).siblings("p.storyboardKaart").text(dezeNota);

            //radiobuttons aflezen
            var geselecteerdeMethodiek = -1;
            var soortMethodiek;
            //contactmethoden
            $(this).siblings(".methodieken").children(".contact").children(".containerMethoden").each(function (i) {
                var selected = $(this).children("input").is(":checked");
                if (selected) {
                    geselecteerdeMethodiek = i;
                    soortMethodiek = "contact";
                }
            });

            //digitale methoden
            $(this).siblings(".methodieken").children(".digitaal").children(".containerMethoden").each(function (i) {
                var selected = $(this).children("input").is(":checked");
                if (selected) {
                    geselecteerdeMethodiek = i;
                    soortMethodiek = "digitaal";
                }
            });

            if (geselecteerdeMethodiek != -1) {
                $.ajax({
                    "url": "../json/kaartjes.json"
                }).done(function (data) {
                    
                    var methodiek = data[kleur][soortMethodiek + "methoden"][geselecteerdeMethodiek];
                    $(dit).siblings("h3").text(methodiek);
 storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].kaartjes[ditKaartje].methodiek = methodiek;

                    //kaartje weer toeklappen

                    save();

                }).error(function (een, twee, drie) {
                    console.log(een);
                    console.log(twee);
                    console.log(drie);
                });
            }

            save();

            editKaartje(dit, event);

        });



        //DISPLAY METHODE RADIOBUTTON - FUNCTIE
        function displayMethode(methodenLijst, naam, kaartje) {
            
            var methodenHTML = $("<div>", {
                "class": naam
            });
            for (var i = 0; i < methodenLijst.length; i++) {
                var selected = false;
                
                if(methodenLijst[i] == kaartje.methodiek){
                    selected = true;
                }
                
                var methode = $("<label>", {
                        "class": "containerMethoden"
                    }).text(methodenLijst[i])
                    .append(
                        $("<input>", {
                            "type": "radio",
                            "name": "radio",
                            "checked": selected
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

                var contactHTML = displayMethode(contact, "contact", kaartje);
                var digitaalHTML = displayMethode(digitaal, "digitaal", kaartje);

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


        //KAARTJE TOEVOEGEN
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
                storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].kaartjes.push(kaartje);

                var nummerKaartje = storyboards[plaatsStoryboard].lesfasen[huidigeLesfase].kaartjes.length - 1;

                displayKaartje(kaartje, huidigeLesfase, nummerKaartje);

                $(".plusKaartjes").slideToggle();
                save();

            }).error(function (een, twee, drie) {
                console.log(een);
                console.log(twee);
                console.log(drie);
            });

        });

        
        //SAVE
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
        

        $('.save').on('click', function () { // manual save
            save();
            alert('opgeslagen!')
        });

    });

});
