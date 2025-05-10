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

    // New Tab Navigation Functionality
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the corresponding tab pane
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.classList.add('loading-overlay');
    loadingOverlay.innerHTML = `
        <div class="loading-container">
            <div class="emoji-witch">
                🧙‍♀️
                <span class="magic-wand">✨</span>
            </div>
            <p>Working some magic...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    // Function to show loading overlay
    function showLoading() {
        loadingOverlay.style.display = 'flex';
        document.querySelectorAll(".action-button").forEach(btn => {
            btn.disabled = true;
        });
    }

    // Function to hide loading overlay
    function hideLoading() {
        loadingOverlay.style.display = 'none';
        document.querySelectorAll(".action-button").forEach(btn => {
            const action = btn.getAttribute("data-action");
            btn.disabled = false;
        });
    }

    // Check if user is logged in
    const authToken = localStorage.getItem("authToken");
    if (!authToken && !window.location.pathname.includes("login")) {
        // Redirect to login if not logged in
        window.location.href = "/login";
        return;
    }

    // Process text function with authentication
    function processText(button, action) {
        let text = document.getElementById("inputText").value;
        if (!text.trim()) {
            alert("Please enter some text.");
            return;
        }
        showLoading();
        fetch("/process", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            },
            body: JSON.stringify({ text: text, action: action })
        })
        .then(async response => {
            const data = await response.json();
            
            if (response.status === 401) {
                localStorage.removeItem("authToken");
                window.location.href = "/login";
                throw new Error("Authentication required");
            }
            
            if (response.status === 429) {
                throw new Error(`rate-limit:${data.retry_after}`);
            }
            
            if (!response.ok) {
                throw new Error(data.error || "An error occurred");
            }
            
            return data;
        })
        .then(data => {
            if (data.result) {
                let processedText = data.result;
                try {
                    processedText = shortify(processedText);
                } catch (err) {
                    console.error("Error in text replacement:", err);
                }
                document.getElementById("outputText").value = processedText;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            if (error.message.startsWith("rate-limit:")) {
                const retrySeconds = error.message.split(":")[1];
                alert(`Service is busy. Please try again in ${retrySeconds} seconds.`);
            } else if (error.message === "Authentication required") {
                // Already handled by redirect
                return;
            } else {
                alert("An error occurred while processing your request. Please try again.");
            }
        })
        .finally(() => {
            hideLoading();
        });
    }

    // Add event listeners to action buttons
    const actionButtons = document.querySelectorAll(".action-button");
    if (actionButtons.length > 0) {
        actionButtons.forEach(button => {
            button.addEventListener("click", function() {
                processText(this, this.getAttribute("data-action"));
            });
        });
    }
});