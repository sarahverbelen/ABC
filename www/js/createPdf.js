$(document).ready(function(){
$("button").on("click",function() {
    var test = {
        content: [
        'test', 'test2', 'HelloWorld! :D'
    ]
    };
    console.log('hi');
    pdfMake.createPdf(test).download();
});
});
