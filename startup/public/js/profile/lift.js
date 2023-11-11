document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));

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
        const squat = parseInt(liftForm.querySelector("#squat").value);
        const bench = parseInt(liftForm.querySelector("#bench").value);
        const deadlift = parseInt(liftForm.querySelector("#deadlift").value);

        const newLift = {date: date, lifts: {squat: squat, bench: bench, deadlift: deadlift}};
        const targetUser = user.username;
        
        fetch('/api/lifts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: targetUser, lift: newLift}),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.href = "profile.html";
        });
    });
});

