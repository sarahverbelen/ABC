$(document).ready(function () {
    var storyboards;

    $.ajax({

        'url': 'http://10.3.50.56:3015/getData',
        'method': 'POST',
        'data': {
            'uuid': localStorage.getItem('uuid')
        }
    }).done(function (data) {
        storyboards = JSON.parse(data["storyboards"]);
        console.log(storyboards);
        // invullen opties dropdown
        for (i = 0; i < storyboards.length; i++) {

            $('.dropdown').append('<option id = "' + i + '">' + storyboards[i].naam + '</option>');

        }

        // select huidig storyboard
        var thisStoryb;

        function selectStoryboard() {
            thisStoryb = localStorage.getItem('HuidigStoryboard');
            if (thisStoryb == '-1') {
                //$('.dropdown').find('option[id = "-1"]').attr('selected', 'selected')
                countAllCards();
            } else {
                //$('.dropdown').find('option[id ="' + thisStoryb + '"]').attr('selected', 'selected');
                console.log(thisStoryb);
                countCards();
            }
        };
        
        selectStoryboard();
        
        var totPraktijk = 0;
        var totOnderzoek = 0;
        var totDiscussie = 0;
        var totProductie = 0;
        var totKennisverwerking = 0;
        var totSamenwerking = 0;
        
        function countCards() {
            console.log('thisStoryb: ' + thisStoryb);
            storyboards[thisStoryb].lesfasen.forEach(function (element) {
                element.kaartjes.forEach(function (e) {
                    if (e.kleur == 'aqua') {
                        totSamenwerking += 1;
                    }
                    if (e.kleur == 'oranje') {
                        totKennisverwerking += 1;
                    }
                    if (e.kleur == 'geel') {
                        totProductie += 1;
                    }
                    if (e.kleur == 'groen') {
                        totOnderzoek += 1;
                    }
                    if (e.kleur == 'roze') {
                        totDiscussie += 1;
                    }
                    if (e.kleur == 'paars') {
                        totPraktijk += 1;
                    }
                });
            });
        };
        
        function countAllCards(){
            console.log(storyboards);
            for(i=0; i< storyboards.length ; i++){
                console.log(storyboards[i].lesfasen)
                storyboards[i].lesfasen.forEach(function (element) {
                element.kaartjes.forEach(function (e) {
                    if (e.kleur == 'aqua') {
                        totSamenwerking += 1;
                    }
                    if (e.kleur == 'oranje') {
                        totKennisverwerking += 1;
                    }
                    if (e.kleur == 'geel') {
                        totProductie += 1;
                    }
                    if (e.kleur == 'groen') {
                        totOnderzoek += 1;
                    }
                    if (e.kleur == 'roze') {
                        totDiscussie += 1;
                    }
                    if (e.kleur == 'paars') {
                        totPraktijk += 1;
                    }
                });
            });
            };
        };
        
        function updateTitel(){
        console.log(thisStoryb)
        if(thisStoryb != -1){
        console.log('if');
        $("#titelGrafiek").text(storyboards[thisStoryb].naam);}
        else{
        console.log('else');
        $("#titelGrafiek").text('Alle storyboards');
        }
        }
        
        if(thisStoryb != -1){
            countCards();
        }
        updateTitel();
        
        $('select').change(function () {
            totPraktijk = 0;
            totOnderzoek = 0;
            totDiscussie = 0;
            totProductie = 0;
            totKennisverwerking = 0;
            totSamenwerking = 0;
            var selected = $('.dropdown option:selected').attr("id");
            console.log(selected);
            if(selected !== -1){
            localStorage.setItem('HuidigStoryboard', selected);}
            selectStoryboard();
            updateTitel();
            drawChart();
        });



        // GOOGLE API CHARTS
        google.charts.load("current", {
            packages: ["corechart"]
        });

        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Leeractiviteit', 'aantal kaartjes'],
                ['Kennisverwerving', totKennisverwerking],
                ['Samenwerking', totSamenwerking],
                ['Productie', totProductie],
                ['Onderzoek', totOnderzoek],
                ['Discussie', totDiscussie],
                ['Praktijk', totPraktijk]
            ]);

            var options = {
                width: '100%',
                height: '100%',
                pieHole: 0.4,
                colors: ['#F2832E', '#48A5A5', '#FFCC00', '#809332', '#F77E8A', '#6363A3'],
                legend: 'none',
                chartArea: {
                    width: '100%',
                    height: '100%'
                },
                fontName: 'lato',
                fontSize: 32,
            };

            var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
            chart.draw(data, options);
        }

    });

});
