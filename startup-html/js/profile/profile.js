document.addEventListener('DOMContentLoaded', function() {

    // Gets user from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // Checks if user is logged in
    if (!user) window.location.href = "index.html";
    
    // Displays username
    document.querySelector('#username').innerHTML = user.email;

    // Logout
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Removes user from local storage
        localStorage.removeItem('user');

        // Redirects to login page
        window.location.href = "index.html";
    });
  
    
    fetch("json/profile.json")
    
    .then((response) => response.json())
    .then((data) => {
        
    // Add total column to data
    data.forEach((row) => row.total = row.squat + row.bench + row.deadlift);

    // Add data to table
    data.forEach((row) => {
        $("#profile").append(
            "<tr>" +
                "<td>" + row.date + "</td>" +
                "<td>" + row.squat + "</td>" + 
                "<td>" + row.bench + "</td>" +
                "<td>" + row.deadlift + "</td>" +
                "<td>" + row.total + "</td>" +
            "</tr>"
        );
        });

    // Add DataTables
    $(document).ready(function () {
        $("#profile").DataTable({
        autoWidth: true,
        scrollY: true,
        scrollX: true,
        dom: "<lf<t>Bip>",
        lengthMenu: [
            [10, 20, 25, 50, -1],
            [10, 20, 25, 50, "All"],
        ],
        columnDefs: [
            { width: "175px", targets: 0 },
            { width: "70px", targets: 1 },
            { width: "70px", targets: 2 },
            { width: "70px", targets: 3 },
            { width: "70px", targets: 4 },
        ],
        buttons: [
            "csv",
            {
            extend: "pdfHtml5",
            orientation: "landscape",
            pageSize: "LEGAL",
            },
        ],
        });
    });

    // Create graph data
    const dates = data.map((entry) => entry.date);
    const squatValues = data.map((entry) => entry.squat);
    const benchValues = data.map((entry) => entry.bench);
    const deadliftValues = data.map((entry) => entry.deadlift);

    const ctx = document
        .getElementById("progressGraph")
        .getContext("2d");

    // Create graph
    new Chart(ctx, {
        type: "line",
        data: {
        labels: dates,
        datasets: [
            {
            label: "Squat",
            data: squatValues,
            borderColor: "#4c6171",
            backgroundColor: "#4c6171",
            borderWidth: 6,
            fill: false,
            },
            {
            label: "Bench",
            data: benchValues,
            borderColor: "#3c6280",
            backgroundColor: "#3c6280",
            borderWidth: 6,
            fill: false,
            },
            {
            label: "Deadlift",
            data: deadliftValues,
            borderColor: "#1b4463",
            backgroundColor: "#1b4463",
            borderWidth: 6,
            fill: false,
            },
        ],
        },
        options: {
        plugins: {
            tooltip: {
            displayColors: false,
            backgroundColor: "#373c44",
            titleColor: "#9aa9ad",
            titelAlign: "center",
            titleFont: {
                size: 18,
                weight: "bold",
                family: "OCR A Std, monospace",
            },
            bodyColor: "#9aa9ad",
            bodyAlign: "center",
            bodyFont: {
                size: 18,
                family: "OCR A Std, monospace",
            },
            },
            legend: {
            position: "top",
            onClick: (click, legendItem, legend) => {
                const datasets = legend.legendItems.map(
                (dataset, index) => {
                    return dataset.text;
                }
                );
                const index = datasets.indexOf(legendItem.text);
                if (legend.chart.isDatasetVisible(index) === true) {
                legend.chart.hide(index);
                } else {
                legend.chart.show(index);
                }
            },
            labels: {
                generateLabels: (chart) => {
                let visibility = [];
                for (let i = 0; i < chart.data.datasets.length; i++) {
                    if (chart.isDatasetVisible(i) === true) {
                    visibility.push("#373c44");
                    } else {
                    visibility.push("#666c75");
                    }
                }
                return chart.data.datasets.map((dataset, index) => ({
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    strokeStyle: dataset.borderColor,
                    fontColor: visibility[index],
                }));
                },
                padding: 20,
                boxWidth: 30,
                font: {
                weight: "bold",
                size: 20,
                family: "OCR A Std, monospace",
                },
            },
            },
        },
        scales: {
            x: {
            ticks: {
                color: "#373c44",
                font: {
                weight: "bold",
                size: 18,
                family: "OCR A Std, monospace",
                },
            },
            grid: {
                display: false,
            },
            },
            y: {
            beginAtZero: true,
            ticks: {
                color: "#373c44",
                font: {
                weight: "bold",
                size: 18,
                family: "OCR A Std, monospace",
                },
            },
            grid: {
                display: false,
            },
            },
        },
        },
    });
    });
});