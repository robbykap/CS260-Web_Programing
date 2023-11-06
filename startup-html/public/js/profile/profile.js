function convertDateToReadableFormat(inputDate) {
    const dateParts = inputDate.match(/(\d{4})-(\d{2})-(\d{2})/);
  
    if (dateParts) {
      const year = dateParts[1];
      const month = dateParts[2];
      const day = dateParts[3];
  
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
  
      const monthName = months[parseInt(month, 10) - 1];
  
      return `${monthName} ${parseInt(day, 10)}, ${year}`;
    }
  }

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
  
    
    fetch('/api/lifts')
    
    .then((response) => response.json())
    .then((data) => {

    // Filter data by user
    const userLifts = data.filter((row) => row.user === user.email);
    
    if (userLifts.length > 0) {
    // Add data to table
    userLifts[0].lifts.forEach((row) => {

        // Add total column to data
        row.lifts.total = row.lifts.squat + row.lifts.bench + row.lifts.deadlift;

        $("#profile").append(
            "<tr>" +
                "<td>" + convertDateToReadableFormat(row.date) + "</td>" +
                "<td>" + row.lifts.squat + "</td>" + 
                "<td>" + row.lifts.bench + "</td>" +
                "<td>" + row.lifts.deadlift + "</td>" +
                "<td>" + row.lifts.total + "</td>" +
            "</tr>"
        );
        });
    }

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

    const dates = [];
    const squatValues = [];
    const benchValues = [];
    const deadliftValues = [];
    
    if (userLifts.length > 0) {
      const lifts = userLifts[0].lifts;
      dates.push(...lifts.map((entry) => convertDateToReadableFormat(entry.date)));
      squatValues.push(...lifts.map((entry) => entry.lifts.squat));
      benchValues.push(...lifts.map((entry) => entry.lifts.bench));
      deadliftValues.push(...lifts.map((entry) => entry.lifts.deadlift));
    }
   
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