document.addEventListener('DOMContentLoaded', function() {

	const signUpButton = document.getElementById('signUp');
	const signInButton = document.getElementById('signIn');
	const container = document.getElementById('container');

	signUpButton.addEventListener('click', () => {
		container.classList.add("right-panel-active");
	});

	signInButton.addEventListener('click', () => {
		container.classList.remove("right-panel-active");
	});
});

async function getUser(email) {
	let scores = [];
	// See if we have a user with the given email.
	const response = await fetch(`/api/user/${email}`);
	if (response.status === 200) {
	  return response.json();
	}
  
	return null;
  }