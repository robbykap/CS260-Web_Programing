import { User } from '../class.js';

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('#registerForm');
    const registerSubmit = document.querySelector('#registerSubmit');

    registerSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        if (registerForm.querySelector("#newUsername").value == "" || registerForm.querySelector("#newEmail").value == "" || registerForm.querySelector("#newPassword").value == "") {
            alert("Please fill in email and password");
            return;
        }

        const username = registerForm.querySelector("#newUsername").value;
        const email = registerForm.querySelector("#newEmail").value;
        const password = registerForm.querySelector("#newPassword").value;

        const user = new User(username, email, password);
        console.log(user)

        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "profile.html";
        
    });
});
