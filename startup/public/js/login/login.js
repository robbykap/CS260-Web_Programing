import { User } from '../class.js';

async function login(endpoint, user) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
      // Extracting username and email from the userData
      const { username, email } = userData;
  
      // Storing the user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);

      console.log(localStorage.getItem('user'));
  
      // Redirecting to the profile page
      window.location.href = 'profile.html';
    } else {
      alert("Incorrect email or password")
      localStorage.clear();
    }
  }

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    const loginSubmit = document.querySelector('#loginSubmit');

    loginSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        if (loginForm.querySelector("#loginEmail").value == "" || loginForm.querySelector("#password").value == "") {
            alert("Please fill in your username and password");
            return;
        }

        const email = loginForm.querySelector("#loginEmail").value;
        const password = loginForm.querySelector("#password").value;

        const user = {email: email, password: password};
        
        login(`/api/auth/login`, user);
    });
});