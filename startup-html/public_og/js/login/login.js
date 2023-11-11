import { User } from '../class.js';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    const loginSubmit = document.querySelector('#loginSubmit');

    loginSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        if (loginForm.querySelector("#loginEmail").value == "" || loginForm.querySelector("#loginPassword").value == "") {
            alert("Please fill in email and password");
            return;
        }

        const email = loginForm.querySelector("#loginEmail").value;
        const password = loginForm.querySelector("#loginPassword").value;

        const user = new User("username", email, password);

        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "profile.html";
    });
});