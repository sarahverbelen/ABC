$(document).ready(function () {
    google.charts.load("current", {
        packages: ["corechart"]
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Kennisverwerving', 11],
                ['Samenwerking', 10],
                ['Productie', 2],
                ['Onderzoek', 3],
                ['Discussie', 7],
                ['Praktijk', 7]
            ]);

        var options = {
            width: '100%',
            height: '100%',
            pieHole: 0.4,
            colors: ['#F2832E', '#48A5A5', '#FFCC00', '#809332', '#F77E8A', '#6363A3'],
            legend: 'none',
            chartArea:{width:'100%',height:'100%'},
            fontName: 'lato',
            fontSize: 32,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    }
});
