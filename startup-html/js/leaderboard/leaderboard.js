document.addEventListener('DOMContentLoaded', function() {

    fetch("json/leaderboard.json")

    .then((response) => response.json())
    .then((data) => {
        
        // Add total column to data
        data.forEach((row) => row.total = row.squat + row.bench + row.deadlift);

        // Sort data by total
        data.sort((a, b) => b.total - a.total);

        // Add rank column to data
        data.forEach((row, index) => {
        if (index === 0) {
            row.rank = 1;
        } 
        else if (row.total === data[index - 1].total) {
            row.rank = data[index - 1].rank;
        } 
        else {
            row.rank = data[index - 1].rank + 1;
        }
        });

        // Add data to table
        data.forEach((row) => {
        $("#leaderboard").append(
            "<tr>" +
                "<td>" + row.rank + "</td>" +
                "<td>" + row.name + "</td>" + 
                "<td>" + row.squat + "</td>" + 
                "<td>" + row.bench + "</td>" +
                "<td>" + row.deadlift + "</td>" +
                "<td>" + row.total + "</td>" +
            "</tr>"
        );
        });

        // Add DataTables
        $(document).ready(function () {
        $("#leaderboard").DataTable({
            autoWidth: true,
            scrollY: true,
            scrollX: true,
            dom: '<lf<t>Bip>',
            lengthMenu: [
                [10,20,25,50,-1], 
                [10,20,25,50,"All"]
            ],
            columnDefs: [
                {"width" : "100px", "targets": 0},
                {"width" : "250px", "targets": 1},
                {"width" : "70px", "targets": 2},
                {"width" : "70px", "targets": 3},
                {"width" : "70px", "targets": 4},
            ],
            buttons: [
                'csv', 
                {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL'
                },
            ],
            });
        });
        });
    });