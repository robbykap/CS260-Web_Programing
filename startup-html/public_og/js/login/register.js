import { User } from '../class.js';

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('#registerForm');
    const registerSubmit = document.querySelector('#registerSubmit');

    registerSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        if (registerForm.querySelector("#registerUsername").value == "" || registerForm.querySelector("#registerEmail").value == "" || registerForm.querySelector("#registerPassword").value == "") {
            alert("Please fill in email and password");
            return;
        }

        const username = registerForm.querySelector("#registerUsername").value;
        const email = registerForm.querySelector("#registerEmail").value;
        const password = registerForm.querySelector("#registerPassword").value;

        const user = new User(username, email, password);
        console.log(user)

        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "profile.html";
        
    });
});
