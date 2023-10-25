import { ProfileLift } from '../class.js';

document.addEventListener('DOMContentLoaded', function() {
    const liftForm = document.querySelector('#liftForm');
    const liftSubmit = document.querySelector('#submit');

    liftSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        if (liftForm.querySelector("#date").value === "" || liftForm.querySelector("#squat").value === "" || liftForm.querySelector("#bench").value === "" || liftForm.querySelector("#deadlift").value === "") {
            alert("Please fill out all fields");

            liftForm.querySelector("#date").value = "";
            liftForm.querySelector("#squat").value = "";
            liftForm.querySelector("#bench").value = "";
            liftForm.querySelector("#deadlift").value = "";
    
            return;
        }

        const date = liftForm.querySelector("#date").value;
        const squat = liftForm.querySelector("#squat").value;
        const bench = liftForm.querySelector("#bench").value;
        const deadlift = liftForm.querySelector("#deadlift").value;

        const lift = new ProfileLift(date, squat, bench, deadlift);
        console.log(lift);
        
        window.location.href = "profile.html";
    });
});
