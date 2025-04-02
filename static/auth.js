// To show and hide password
let password = document.getElementById("password");
let check = document.getElementById("check");

if (check) {
    check.addEventListener("click", () => {
        if (check.checked) {
            password.type = "text";
        } else {
            password.type = "password";
        }
    });
}

// Toggle between login and signup forms
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const formTitle = document.getElementById('form-title');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const professionSelect = document.getElementById('profession-select');
    const specializationGroup = document.getElementById('specialization-group');
    const specializationSelect = document.getElementById('specialization-select');
    const errorContainer = document.getElementById('error-container');
    
    // Show signup form
    if (showSignup) {
        showSignup.addEventListener('click', function() {
            // First, fully hide login form and its toggle
            loginForm.classList.remove('active-form');
            loginForm.classList.add('hide-completely');
            loginToggle.style.display = 'none';
            
            // Then show signup form and its toggle
            signupForm.classList.remove('hide-completely');
            signupForm.classList.add('active-form');
            signupToggle.style.display = 'block';
            formTitle.textContent = 'Sign Up';
            
            // Clear any error messages
            errorContainer.textContent = '';
        });
    }
    
    // Show login form
    if (showLogin) {
        showLogin.addEventListener('click', function() {
            // First, fully hide signup form and its toggle
            signupForm.classList.remove('active-form');
            signupForm.classList.add('hide-completely');
            signupToggle.style.display = 'none';
            
            // Then show login form and its toggle
            loginForm.classList.remove('hide-completely');
            loginForm.classList.add('active-form');
            loginToggle.style.display = 'block';
            formTitle.textContent = 'Login';
            
            // Clear any error messages
            errorContainer.textContent = '';
        });
    }
    
    // Show/hide specialization field based on profession selection
    if (professionSelect) {
        professionSelect.addEventListener('change', function() {
            const selectedProfession = this.value;
            // Show specialization field for physicians and residents
            if (selectedProfession === 'physician' || selectedProfession === 'medi_surg_resident' || 
                selectedProfession === 'nurse_practitioner' || selectedProfession === 'med_student' || 
                selectedProfession === 'physician_assistant' || selectedProfession === 'nurse') {
                specializationGroup.style.display = 'flex';
                specializationSelect.setAttribute('required', 'required');
            } else {
                specializationGroup.style.display = 'none';
                specializationSelect.removeAttribute('required');
                // Reset the selection when hiding
                specializationSelect.selectedIndex = 0;
            }
        });
    }
    
    // Login form submission handling
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const email = document.getElementById("emailid1").value;
            const password = document.getElementById("password").value;
            
            // Call the login API
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    // Store token in local storage
                    localStorage.setItem("authToken", data.token);
                    // Redirect to main app page
                    window.location.href = "/dashboard";
                } else {
                    // Display error message
                    alert("Login failed: " + (data.error || "Unknown error"));
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Login failed. Please try again.");
            });
        });
    }
    
    // Registration form handling
    if (signupForm) {
        signupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const email = document.getElementById("emailid2").value;
            const password = document.querySelector('input[name="password"]');
            const confirmPassword = document.querySelector('input[name="confirmPassword"]');
            
            // Check if passwords match
            if (password.value !== confirmPassword.value) {
                alert("Passwords do not match!");
                return;
            }
            
            // Collect all form data
            const userData = {
                email: email,
                password: password.value,
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                degree: formData.get('degree'),
                profession: formData.get('profession'),
                specialization: formData.get('specialization') || null
            };
            
            // Call the register API
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: passwords[0].value
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    // Clear error message
                    errorContainer.textContent = '';
                    
                    // Show success message
                    alert("Registration successful! Please login.");
                    
                    // Switch to login form
                    if (showLogin) {
                        showLogin.click();
                    }
                } else {
                    // Display error message
                    alert("Registration failed: " + (data.error || "Unknown error"));
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Registration failed. Please try again.");
            });
        });
    }
});