$(document).ready(function(){
    
    function Kaartje(kleur, methodiek, nota) {
        this.kleur = kleur; //string
        this.methodiek = methodiek; //string
        this.nota = nota; //string
    }
    
    function Doelstelling(naam, aangevinkt) {
        this.naam = naam; //string
        this.aangevinkt = aangevinkt; //boolean
    }
    
    function Lesfase (naam, doelstellingen, inhoud, kaartjes) {
        this.naam = naam; //string
        this.doelstellingen = doelstellingen; //array van Doelstelling-objecten OF string
        this.inhoud = inhoud; //string
        this.kaartjes = kaartjes; //array van Kaartje-objecten
    }
    
    function Storyboard (naam, lesfasen, opleidingsonderdeel, semester, deeltraject, doelstellingen) {
        this.naam = naam; //string
        this.lesfasen = lesfasen; //array van Lesfase-objecten
        this.opleidingsonderdeel = opleidingsonderdeel; //string*
        this.semester = semester; //string*
        this.deeltraject = deeltraject; //string*
        this.doelstellingen = doelstellingen; //array van strings (hier hoef je niet te weten of ze aangevinkt zijn) -> indien niet nodig, lege array
        
        //*indien niet ingevuld zijn dit gewoon lege strings
    }
    
});