// js/register.js

document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Optionally show a loading state
    const registerButton = event.target.querySelector('button[type="submit"]');
    registerButton.disabled = true;
    registerButton.textContent = 'Registering...';

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullname, username, email, password }),
        });

        if (response.ok) {
            document.getElementById('success-message').style.display = 'block'; // Show success message
            document.getElementById('register-form').reset(); // Reset form
            // Optionally redirect to the login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000); // Redirect after 2 seconds
        } else {
            const errorData = await response.json();
            document.getElementById('error-message').textContent = `Error: ${errorData.message}`;
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    } finally {
        registerButton.disabled = false;
        registerButton.textContent = 'Sign Up'; // Reset button text
    }
});