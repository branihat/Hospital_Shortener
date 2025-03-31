document.addEventListener("DOMContentLoaded", function () {
    // Check if user is logged in
    const authToken = localStorage.getItem("authToken");
    if (!authToken && !window.location.pathname.includes("login")) {
        // Redirect to login if not logged in
        window.location.href = "/login";
        return;
    }
    // Process text function with authentication
    function processText(action) {
        let text = document.getElementById("inputText").value;
        if (!text.trim()) {
            alert("Please enter some text.");
            return;
        }
        fetch("/process", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            },
            body: JSON.stringify({ text: text, action: action })
        })
        .then(response => {
            if (response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem("authToken");
                window.location.href = "/login";
                throw new Error("Authentication required");
            }
            return response.json();
        })
        .then(data => {
            if (data.result) {
                document.getElementById("outputText").value = data.result;
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => console.error("Error:", error));
    }

    // Add event listeners to buttons if they exist
    const actionButtons = document.querySelectorAll(".action-button");
    if (actionButtons.length > 0) {
        actionButtons.forEach(button => {
            button.addEventListener("click", function () {
                processText(this.getAttribute("data-action"));
            });
        });
    }

    // Add logout functionality if the logout button exists
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            localStorage.removeItem("authToken");
            window.location.href = "/login";
        });
    }
});
