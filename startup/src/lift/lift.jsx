import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../app.css';

export function Lift() {
    const navigate = useNavigate();

    useEffect(() => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.binaryType = "arraybuffer";

        const username = localStorage.getItem('username');

        const liftForm = document.querySelector('#liftForm');
        const liftSubmit = document.querySelector('#submit');

        const handleSubmit = (e) => {
            e.preventDefault();

            if (
                liftForm.querySelector("#date").value === "" ||
                liftForm.querySelector("#squat").value === "" ||
                liftForm.querySelector("#bench").value === "" ||
                liftForm.querySelector("#deadlift").value === ""
            ) {
                alert("Please fill out all fields");

                liftForm.querySelector("#date").value = "";
                liftForm.querySelector("#squat").value = "";
                liftForm.querySelector("#bench").value = "";
                liftForm.querySelector("#deadlift").value = "";

                return;
            }

            const date = liftForm.querySelector("#date").value;
            const squat = parseInt(liftForm.querySelector("#squat").value);
            const bench = parseInt(liftForm.querySelector("#bench").value);
            const deadlift = parseInt(liftForm.querySelector("#deadlift").value);

            const newLift = { date: date, lifts: { squat: squat, bench: bench, deadlift: deadlift } };
            const targetUser = username;

            const newUserLift = JSON.stringify({ user: targetUser, lift: newLift });

            const message = {
                type: 'newLift',
                data: newUserLift,
            };

            socket.send(JSON.stringify(message));

            fetch('/api/lifts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: newUserLift,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    navigate('/profile');
                });
        };

        liftSubmit.addEventListener('click', handleSubmit);

        return () => {
            liftSubmit.removeEventListener('click', handleSubmit);
        };
    }, []);

    return (
        <main className="d-flex">
            <div className="d-grid bg-dark p-5 m-3 mt-0 rounded-3">
                <form id="liftForm">
                    <h1 className="text-start" style={{ fontWeight: 'bold', fontSize: '40px' }}>
                        Date
                    </h1>
                    <input type="date" className="form-control form-control-lg" id="date" name="date" placeholder="Date" />
                    <br />
                    <h1 className="text-start" style={{ fontWeight: 'bold', fontSize: '40px' }}>
                        Squat
                    </h1>
                    <input type="number" className="form-control form-control-lg" id="squat" name="squat" placeholder="Squat" />
                    <br />
                    <h1 className="text-start" style={{ fontWeight: 'bold', fontSize: '40px' }}>
                        Bench
                    </h1>
                    <input type="number" className="form-control form-control-lg" id="bench" name="bench" placeholder="Bench" />
                    <br />
                    <h1 className="text-start" style={{ fontWeight: 'bold', fontSize: '40px' }}>
                        Deadlift
                    </h1>
                    <input type="number" className="form-control form-control-lg" id="deadlift" name="deadlift" placeholder="Deadlift" />
                    <br />
                    <br />
                    <button className="btn btn-lg" id="submit" style={{ backgroundColor: '#645856' }}>
                        <a style={{ color: '#B5B5B0' }}>
                            Submit
                        </a>
                    </button>
                </form>
            </div>
        </main>
    )
}