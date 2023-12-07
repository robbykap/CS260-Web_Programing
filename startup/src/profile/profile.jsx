import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

import { useNavigate } from 'react-router-dom';

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-bs4'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../app.css';

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

function sortLiftsByDate(userLifts) {
    return userLifts.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function Profile() {
    const [userLifts, setUserLifts] = useState({});
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const username = localStorage.getItem('username');

    useEffect(() => { //Redirection
        if (!user) {
            navigate('/');
        }

        const addLift = document.getElementById('addLift');
        const signOut = document.getElementById('logout');

        const handleAddLift = (event) => {
            event.preventDefault();
            navigate('/lift');
        };
        
        const handleSignOut = (event) => {
            event.preventDefault();
            localStorage.clear();
            navigate('/');
        }

        addLift.addEventListener('click', handleAddLift);
        signOut.addEventListener('click', handleSignOut);

        return () => {
            addLift.removeEventListener('click', handleAddLift);
            signOut.removeEventListener('click', handleSignOut);
        }
    });

    useEffect(() => { //Fetch data from db
        fetch("/api/lifts")
            .then((response) => response.json())
            .then((info) => {

            const userData = info.filter((entry) => entry.user === username);
            
            if (userData.length > 0) {
                const lifts = sortLiftsByDate(userData[0].lifts);
                setUserLifts(lifts);
            }

        });
    }, []);

    useEffect(() => { //Render data
        const profileTable = $("#profile").DataTable({
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
            order: [[0, "asc"]],
            buttons: [
                "csv",
                {
                extend: "pdfHtml5",
                orientation: "landscape",
                pageSize: "LEGAL",
                },
            ],
        });


        if (userLifts.length > 0) {
            userLifts.forEach((entry) => {
                const { date, lifts } = entry;
                const { squat, bench, deadlift } = lifts;
                const total = squat + bench + deadlift;

                profileTable.row.add([convertDateToReadableFormat(date), squat, bench, deadlift, total]).draw();
            });
        }
        
        const dates = [];
        const squatValues = [];
        const benchValues = [];
        const deadliftValues = [];

        if (userLifts.length > 0) {
            const lifts = userLifts;
            dates.push(...lifts.map((entry) => convertDateToReadableFormat(entry.date)));
            squatValues.push(...lifts.map((entry) => entry.lifts.squat));
            benchValues.push(...lifts.map((entry) => entry.lifts.bench));
            deadliftValues.push(...lifts.map((entry) => entry.lifts.deadlift));
        }

        const ctx = document.getElementById("progressGraph").getContext("2d");

        const progressGraph = new Chart(ctx, {
            type: "line",
            data: {
            labels: dates,
            datasets: [
                {
                label: "Squat",
                data: squatValues,
                borderColor: "#d4c2be",
                backgroundColor: "#d4c2be",
                borderWidth: 6,
                fill: false,
                },
                {
                label: "Bench",
                data: benchValues,
                borderColor: "#91736e",
                backgroundColor: "#91736e",
                borderWidth: 6,
                fill: false,
                },
                {
                label: "Deadlift",
                data: deadliftValues,
                borderColor: "#755651",
                backgroundColor: "#755651",
                borderWidth: 6,
                fill: false,
                },
            ],
            },
            options: {
            plugins: {
                tooltip: {
                displayColors: false,
                backgroundColor: "#2b3035",
                titleColor: "#B5B5B0",
                titelAlign: "center",
                titleFont: {
                    size: 18,
                    weight: "bold",
                    family: "Inter, sans-serif",
                },
                bodyColor: "#B5B5B0",
                bodyAlign: "center",
                bodyFont: {
                    size: 18,
                    family: "Inter, sans-serif",
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
                        visibility.push("#B5B5B0");
                        } else {
                        visibility.push("#636360");
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
                    family: "Inter, sans-serif",
                    },
                },
                },
            },
            scales: {
                x: {
                ticks: {
                    color: "#B5B5B0",
                    font: {
                    // weight: "bold",
                    size: 18,
                    family: "Inter, sans-serif",
                    },
                },
                grid: {
                    display: false,
                },
                },
                y: {
                beginAtZero: true,
                ticks: {
                    color: "#B5B5B0",
                    font: {
                    // weight: "bold",
                    size: 18,
                    family: "Inter, sans-serif",
                    },
                },
                grid: {
                    display: false,
                },
                },
            },
            },
        });

        return () => {
            profileTable.destroy(), 
            progressGraph.destroy();
        };
    }, [userLifts]);

    return (
        <main className="d-flex">
            <div className="d-grid bg-dark p-5 m-3 mt-0 rounded-3">
                <h1 className="text-center" id="username" style={{ fontWeight: 'bold' }}>
                {username}

                </h1>
                <br />
                <table id="profile" className="table table-striped hover" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Squat</th>
                            <th>Bench</th>
                            <th>Deadlift</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* db data */}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Date</th>
                            <th>Squat</th>
                            <th>Bench</th>
                            <th>Deadlift</th>
                            <th>Total</th>
                        </tr>
                    </tfoot>
                </table>
                <br />
                <button id='addLift' className="btn m-2" style={{ backgroundColor: '#645856', color: '#B5B5B0' }}>                        
                    Add Lift
                </button>
                <br />
                <h1 className="text-center" style={{ fontWeight: 'bold' }}>
                    Progress
                </h1>
                <br />
                <canvas id="progressGraph">
                    {/* db data */}
                </canvas>
                <br />
                <button className="btn m-2 justify-content-end align-content-end" id="logout" style={{ backgroundColor: '#645856' }}>
                    <a style={{ color: '#B5B5B0' }}>
                        Sign Out
                    </a>
                </button>
            </div>
        </main>
    )
}
