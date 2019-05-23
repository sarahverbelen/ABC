$(document).ready(function () {
    $("button").on("click", function () {
        //////////////////////////////

        var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [40,20,20, 40],
        content: [
            {
                style: 'custom',
                table: {
                    widths: ['*','*','*'],
                    Heights: ['*','*','*','*'],
                    body: [
                        // rij 1
                            [
                                {
                                colSpan: 3,
                                border: [false, false, false, true],
                                fillColor: '#eeeeee',
                                alignment: 'center',
                                text: 'storyboard titel', // HERE
						},
                                {
                                    
                                },{
                                    
                                },
					],
                        
                    // rij 2
                        [
                            {border: [false, false, true, false],
                            text: 'Lesfase', // HERE
                            bold: true,
                            alignment: 'center'},
                            {border: [false, false, true, false],
                            text: 'Lesfase', // HERE
                            bold: true,
                            alignment: 'center'},
                            {border: [false, false, false, false],
                            text: 'Lesfase', // HERE
                            bold: true,
                            alignment: 'center'},
                        ],
                    // rij 3
                        [
                            {border: [false, false, true, false],
                            text: 'Doelstellingen: ', // HERE
                            alignment: 'left'},
                            {border: [false, false, true, false],
                            text: 'Doelstellingen: ', // HERE
                            alignment: 'left'},
                            {border: [false, false, false, false],
                            text: 'Doelstellingen: ', // HERE
                            alignment: 'left'},
                        ],
                    // rij 4
                        [
                            {border: [false, false, true, false],
                            text: 'Inhoud: ', // HERE
                            alignment: 'left'},
                            {border: [false, false, true, false],
                            text: 'Inhoud: ', // HERE
                            alignment: 'left'},
                            {border: [false, false, false, false],
                            text: 'Inhoud: ', // HERE
                            alignment: 'left'},
                        ],
                    ]
                    }
            }   
        ]
        };
        //////////////////////////////

        pdfMake.createPdf(docDefinition).download();
    });
});
