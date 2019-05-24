$(document).ready(function () {
            var storyboards;
            //GET DATA
            $.ajax({
                'url': 'http://10.3.50.56:3015/getData',
                'method': 'POST',
                'data': {
                    'uuid': localStorage.getItem('uuid')
                }
            }).done(function (data) {
                storyboards = JSON.parse(data["storyboards"]);
                console.log(storyboards);
            // variables an functions for pdf
                // info
                var storyboard = storyboards[localStorage.getItem('HuidigStoryboard')];
                var lesfasen = storyboard.lesfasen;
                var numberOfLesfasen = lesfasen.length;
                var numberOfPages = Math.ceil(numberOfLesfasen/3);
                console.log("number of pages: " + numberOfPages)
                // building blocks
                var header = {
                    colSpan: 3,
                    border: [false, false, false, true],
                    fillColor: '#eeeeee',
                    alignment: 'center',
                    text: storyboard.naam
                }
                var borderAB = [false, false, true, false];
                var borderC = [false, false,false, false];
                var kolomLesfaseAB = {
                    border: borderAB,
                    text: 'Lesfase', // HERE
                    bold: true,
                    alignment: 'center'
                }
                var kolomLesfaseC = {
                    border: borderC,
                    text: 'Lesfase', // HERE
                    bold: true,
                    alignment: 'center'
                }
                var kolomDoelstellingenAB = {
                    border: borderAB,
                    text: 'Doelstellingen: ', // HERE
                    alignment: 'left'
                }
                var kolomDoelstellingenC = {
                    border: borderC,
                    text: 'Doelstellingen: ', // HERE
                    alignment: 'left'
                }
                var kolomInhoudAB = {
                    border: borderAB,
                    text: 'Inhoud: ', // HERE
                    alignment: 'left'
                }
                 var kolomInhoudC = {
                    border: borderC,
                    text: 'Inhoud: ', // HERE
                    alignment: 'left'
                }
                var rij = [];
                var tableObj = {
                    widths: "*",
                    heights: "*",
                    body: []
                }
                var page = {table: tableObj};
                
            // CREATE PDF
                $("button").on("click", function () {
                    // define content PDF
                    var docDefinition = {
                        pageSize: 'A4',
                        pageOrientation: 'landscape',
                        pageMargins: [40, 20, 20, 40],
                        content: []
                    };
            //ADD CONTENT TO PDF
                    for(var i = 0; i < numberOfPages; i++){
                    docDefinition.content.push(page); 
                        
                    }
                    
            // DOWNLOAD PDF
 pdfMake.createPdf(docDefinition).download(storyboard.naam);
                });
                });
                
});
   
