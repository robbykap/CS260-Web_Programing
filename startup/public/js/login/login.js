import { User } from '../class.js';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    const loginSubmit = document.querySelector('#loginSubmit');

    loginSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        if (loginForm.querySelector("#username").value == "" || loginForm.querySelector("#password").value == "") {
            alert("Please fill in your username and password");
            return;
        }

        const username = loginForm.querySelector("#username").value;
        const password = loginForm.querySelector("#password").value;

        const user = new User(username, "", password);

        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "profile.html";
    });
});