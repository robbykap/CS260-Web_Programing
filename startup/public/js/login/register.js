import { User } from '../class.js';

async function create(endpoint, user) {
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
  
      // Redirecting to the profile page
      window.location.href = 'profile.html';
    } else {
      alert('Email already exists');
      localStorage.clear();
    }
  }

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
        
        create(`/api/auth/create`, user);
    });
});
