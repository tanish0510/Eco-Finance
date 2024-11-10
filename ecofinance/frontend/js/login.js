// js/login.js

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Optionally show a loading state
    const loginButton = event.target.querySelector('button[type="submit"]');
    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Redirect to dashboard or another page
            window.location.href = 'dashboard.html'; // Update with your actual dashboard page
        } else {
            const errorData = await response.json();
            document.getElementById('error-message').textContent = `Error: ${errorData.message}`;
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    } finally {
        loginButton.disabled = false;
        loginButton.textContent = 'Login'; // Reset button text
    }
});