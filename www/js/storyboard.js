$(document).ready(function(){
    
    //DISPLAY KAARTJE - VOORBEELD   
    kaartjeGroen = new Kaartje("oranje", "Kennisverwerving", "Peer", "Hi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis diam sapien.")

    var kaartjeHTML = $("<div>", {"class": "kaartje " + kaartjeGroen.kleur})
                      .append(
                        $("<div>", {"class": "triangle" + kaartjeGroen.kleur + " triangle"})
                      )
                      .append(
                        $("<a>", {"class": "editKaartje", "href": "#"}).text("edit kaartje")
                      )
                      .append(
                        $("<h2>", {"class": "storyboardKaart"}).text(kaartjeGroen.activiteit)
                      )
                      .append(
                        $("<h3>", {"class": "fontRegular storyboardKaart"}).text(kaartjeGroen.methodiek)
                      )
                      .append(
                        $("<p>", {"class": "storyboardKaart"}).text(kaartjeGroen.nota)
                      );
    
    //PLUSKNOP OPEN/TOE-KLAPPEN
    $(".plusKaartjes").hide();
    
    $("#plus").on("click", function(){
        $(".plusKaartjes").slideToggle();
    });
    
    //NIEUW STORYBOARD MAKEN
    var nieuwStoryboard = window.localStorage.getItem("nieuwStoryboard");
    if(nieuwStoryboard == "true"){

        window.localStorage.setItem("nieuwStoryboard", false);

        $(".kaartjes").remove();
        
        var lesfasen = [];
        
        var storyboard = new Storyboard("nieuw Storyboard", lesfasen, "", "", "", "")
        
    }
    
    
});