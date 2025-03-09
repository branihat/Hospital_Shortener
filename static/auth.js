// To show and hide password
let password = document.getElementById("password");
let showpass = document.querySelector(".show_password");
let check = document.getElementById("check");

check.addEventListener("click", () => {
    if (check.checked) {
        password.type = "text";
        showpass.style.opacity = "1";
    }
    else {
        password.type = "password";
        showpass.style.opacity = "0.8";
    }
});

// main animation
let main_container = document.querySelector(".main-container");
let Signinlink = document.querySelector(".Signinlink");
let signuplink = document.querySelector(".signuplink");

signuplink.addEventListener("click", () => {
    main_container.classList.add("animated_signin");
    main_container.classList.remove("animated_signup");
});

Signinlink.addEventListener("click", () => {
    main_container.classList.add("animated_signup");
    main_container.classList.remove("animated_signin");
});

// Form submission handling
document.addEventListener("DOMContentLoaded", function() {
    // Login form handling
    const loginForm = document.querySelector(".Login form");
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
                alert("Login failed: " + (data.error || "Unknown error"));
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Login failed. Please try again.");
        });
    });
    
    // Registration form handling
    const signupForm = document.querySelector(".Sign_Up form");
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const email = document.getElementById("emailid2").value;
        const passwords = document.querySelectorAll(".password");
        
        if (passwords[0].value !== passwords[1].value) {
            alert("Passwords do not match!");
            return;
        }
        
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
                alert("Registration successful! Please login.");
                // Switch to login form
                main_container.classList.add("animated_signup");
                main_container.classList.remove("animated_signin");
            } else {
                alert("Registration failed: " + (data.error || "Unknown error"));
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Registration failed. Please try again.");
        });
    });
});

// gsap animations
let tl = gsap.timeline();
tl.from(".Login", {
    x: "-50vw",
    opacity: 0,
    duration: 0.8
})
tl.from(".Sign_Up", {
    x: "50vw",
    opacity: 0,
    duration: 0.8
})
tl.from(".circle1", {
    opacity: 0,
    duration: 0.5
})
tl.from(".circle2", {
    opacity: 0,
    duration: 0.5
})
tl.from(".circle1_child3", {
    opacity: 0,
    duration: 0.5
})
tl.from(".circle2_child3", {
    opacity: 0,
    duration: 0.5
})
gsap.from(".google", {
    scale: 1.1,
    duration: 0.5,
    stagger: 0.2
})