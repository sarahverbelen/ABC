$(document).ready(function () {
    
    //PLUSKNOP OPEN/TOE-KLAPPEN
    $(".plusKaartjes").hide();

    $("#plus").on("click", function () {
        $(".plusKaartjes").slideToggle();
    });
    
    //DOELSTELLINGEN OPEN/TOE-KLAPPEN  
    $(".doelstellingenInhoudOpen").hide();
    
    $("#doelstellingen, #doelstellingDropdown").on("click", function(){
       $(".doelstellingenInhoudOpen").slideToggle(); 
    });
    
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
        );
        
        $(".kaartjes").append(kaartjeHTML);
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
            var kleur = $(this).attr("class");
            var activiteit;

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
            }).done(function(data){
                activiteit = data[kleur].activiteit; 
                
                var kaartje = new Kaartje(kleur, "", "", activiteit);
            
            kaartjes.push(kaartje);
            displayKaartje(kaartje);
            
            console.log(storyboard);
            });
            
        });

    }


});
