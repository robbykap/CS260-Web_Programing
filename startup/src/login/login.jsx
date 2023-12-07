import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import '../app.css';

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

  } else {
    alert("Incorrect email or password")
    localStorage.clear();
  }
}

async function create(endpoint, user) {
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  console.log(response);

  if (response.ok) {
    const userData = await response.json();
    console.log(userData);
    // Extracting username and email from the userData
    const { username, email } = userData;

    // Storing the user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

  } else {
    alert('Email already exists');
    localStorage.clear();
  }
}

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('registerForm');

    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');

    const loginSubmit = document.getElementById('loginSubmit');
    const signupSubmit = document.getElementById('registerSubmit');

    const handleLoginClick = (event) => {
      event.preventDefault();
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';

      setTimeout(() => {
        signupForm.style.opacity = 0;
        loginForm.style.opacity = 1;
      }, 10);
    };

    const handleSignupClick = (event) => {
      event.preventDefault();
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';

      setTimeout(() => {
        loginForm.style.opacity = 0;
        signupForm.style.opacity = 1;
      }, 10);
    };

    const handleLoginSubmit = async (event) => {
      event.preventDefault();

      if (loginForm.querySelector('#loginEmail').value === '' || loginForm.querySelector('#loginPassword').value === '') {
        alert('Please fill in your username and password');
        return;
      }

      const email = document.querySelector('#loginEmail').value;
      const password = document.querySelector('#loginPassword').value;

      const user = { email: email, password: password };

      try {
        await login(`/api/auth/login`, user);
        navigate('/profile');
      } catch (err) {
        console.log(err);
      }
    };

    const handleSignupSubmit = async (event) => {
      event.preventDefault();

      if (signupForm.querySelector('#newUsername').value === '' || signupForm.querySelector('#newEmail').value === '' || signupForm.querySelector('#newPassword').value === '') {
        alert('Please fill in all fields');
        return;
      }

      const username = document.querySelector('#newUsername').value;
      const email = document.querySelector('#newEmail').value;
      const password = document.querySelector('#newPassword').value;

      const user = { username: username, email: email, password: password };

      try {
        await create(`/api/auth/create`, user);
        navigate('/profile');
      } catch (err) {
        console.log(err);
      }
    };

    loginLink.addEventListener('click', handleLoginClick);
    signupLink.addEventListener('click', handleSignupClick);

    loginSubmit.addEventListener('click', handleLoginSubmit);
    signupSubmit.addEventListener('click', handleSignupSubmit);

    // Cleanup event listeners when the component unmounts
    return () => {
      loginLink.removeEventListener('click', handleLoginClick);
      signupLink.removeEventListener('click', handleSignupClick);

      loginSubmit.removeEventListener('click', handleLoginSubmit);
      signupSubmit.removeEventListener('click', handleSignupSubmit);
    };
  }, []); 

    return (
        <main className="container-fluid">
        <div className="box flex-box">
          <div className="container">
            <div className="form-container" id="loginForm">
              <h1 style={{ marginBottom: '30px', fontSize: '36px', fontWeight: 'bold' }}>Login</h1>
              <form>
                <label htmlFor="login-email">
                  Email
                </label>
                <input type="text" id="loginEmail" name="login-email" autoComplete="username" required />
                <label htmlFor="login-password">
                  Password
                </label>
                <input type="password" id="loginPassword" name="login-password" autoComplete="current-password" required />
                <button type="submit" id="loginSubmit">
                  Login
                </button>
              </form>
              <p>Don't have an account? <a href="#" id="signup-link">Sign up</a></p>
            </div>
            <div className="form-container" id="registerForm" style={{ display: 'none' }}>
              <h1 style={{ marginBottom: '30px', fontSize: '36px', fontWeight: 'bold' }}>
                Sign Up
              </h1>
              <form>
                <label htmlFor="new-username">
                  Username
                </label>
                <input type="username" id="newUsername" name="new-username" required />
                <label htmlFor="new-email">
                  Email
                </label>
                <input type="email" id="newEmail" name="new-email" autoComplete="username" required />
                <label htmlFor="new-password">
                  Password
                </label>
                <input type="password" id="newPassword" name="new-password" autoComplete="new-password" required />
                <button type="create" id="registerSubmit">
                  Sign Up
                </button>
              </form>
              <p>Already have an account? <a href="#" id="login-link">Login</a></p>
            </div>
          </div>
        </div>
      </main>
    )
}
