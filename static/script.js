document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('chartwitch-theme') || 'dark';
    body.classList.toggle('light-mode', savedTheme === 'light');

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        // Save theme preference
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('chartwitch-theme', currentTheme);
    });

    // Existing logout functionality
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    });

    // Copy output functionality
    const copyButton = document.getElementById("copy-output");
    const outputText = document.getElementById("outputText");
    
    copyButton.addEventListener("click", function() {
        if (outputText.value.trim() === "") {
            alert("No text to copy.");
            return;
        }
        
        outputText.select();
        document.execCommand("copy");
        
        // Temporary visual feedback
        copyButton.textContent = "Copied!";
        setTimeout(() => {
            copyButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
            `;
        }, 1500);
    });

    // Download PDF functionality
    const downloadPdfButton = document.getElementById("download-pdf");
    
    downloadPdfButton.addEventListener("click", function() {
        if (outputText.value.trim() === "") {
            alert("No text to download.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set font and size
        doc.setFont('helvetica');
        doc.setFontSize(12);

        // Split text into lines that fit the page
        const splitText = doc.splitTextToSize(outputText.value, 180);
        
        // Add text to PDF
        doc.text(splitText, 15, 20);

        // Save PDF with current timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        doc.save(`ChartWitch_Output_${timestamp}.pdf`);
    });
});
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
            window.location.href = "/";
        });
    }
});
