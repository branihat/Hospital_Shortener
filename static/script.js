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
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Tab switching function
    function switchTab(targetId) {
        // Hide all panes and deactivate all tabs
        tabPanes.forEach(pane => pane.classList.remove('active'));
        tabItems.forEach(item => item.classList.remove('active'));
        
        // Show selected pane and activate tab
        const selectedTab = document.querySelector(`[data-target="${targetId}"]`);
        const selectedPane = document.getElementById(targetId);
        
        if (selectedTab && selectedPane) {
            selectedTab.classList.add('active');
            selectedPane.classList.add('active');
            
            // Only load custom tools when that tab is activated
            if (targetId === 'custom-tools-container') {
                loadCustomTools();
            }
        }
    }

    // Add click handlers to tabs
    tabItems.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-target');
            switchTab(targetId);
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

    // Add shortenText function before processText
    function shortenText() {
        const outputText = document.getElementById('outputText');
        if (!outputText || !outputText.value) return;

        let text = outputText.value;

        // Remove extra whitespace and newlines
        text = text.replace(/\s+/g, ' ').trim();

        // Remove common filler words
        const fillerWords = /\b(the|a|an|and|or|but|in|on|at|to|for|of|with)\b/gi;
        text = text.replace(fillerWords, '');

        // Remove redundant punctuation
        text = text.replace(/[.,!?;:]+(?=[.,!?;:])/g, '');

        // Collapse multiple newlines
        text = text.replace(/\n\s*\n/g, '\n');

        // Update the output text
        outputText.value = text.trim();
    }

    // Update the processText function to use showLoading and hideLoading
    async function processText(action, customPrompt) {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            window.location.href = '/login';
            return;
        }

        const inputText = document.getElementById('inputText').value;
        const outputText = document.getElementById('outputText');

        if (!inputText) {
            alert('Please enter some text first');
            return;
        }

        try {
            showLoading(); // Show the loading overlay instead of "Processing..."

            const response = await fetch('/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    text: inputText,
                    action: action,
                    prompt: customPrompt
                })
            });

            if (response.status === 401) {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            outputText.value = data.result;

            if (data.shouldShorten) {
                shortenText();
            }
        } catch (error) {
            console.error('Error:', error);
            outputText.value = 'Error processing text: ' + error.message;
        } finally {
            hideLoading(); // Hide the loading overlay when done
        }
    }

    // Add event listeners to action buttons
    const actionButtons = document.querySelectorAll("#default-tools-container .action-button, #suggested-tools-container .action-button, #custom-tools-container .action-button");
    if (actionButtons.length > 0) {
        actionButtons.forEach(button => {
            button.addEventListener("click", function() {
                const action = this.getAttribute("data-action");
                const customPrompt = this.getAttribute("data-text");
                processText(action, customPrompt);
            });
        });
    }

    // Tab switching functionality (using the existing switchTab function)
    tabItems.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // Load custom tools function with loading state management
    function loadCustomTools() {
        const container = document.getElementById('custom-tools-container');
        if (!container) return;

        showLoading(); // Use existing loading overlay
        container.innerHTML = '<div class="loading">Loading custom tools...</div>';

        fetch('/api/custom-tools')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                container.innerHTML = ''; // Clear loading message
                
                if (!data.tools || !data.tools.length) {
                    container.innerHTML = '<p class="no-tools">No custom tools available</p>';
                    return;
                }

                data.tools.forEach(tool => {
                    const button = document.createElement('button');
                    button.className = 'action-button custom-tool';
                    button.textContent = tool.button_label;
                    button.setAttribute('data-action', tool.key);
                    button.setAttribute('data-tooltip', tool.button_tooltip);
                    button.setAttribute('data-text', tool.text);
                    
                    button.addEventListener('click', () => {
                        processText(tool.key, tool.text);
                    });
                    
                    container.appendChild(button);
                });
            })
            .catch(error => {
                console.error('Error loading custom tools:', error);
                container.innerHTML = '<p class="error">Failed to load custom tools</p>';
            })
            .finally(() => {
                hideLoading(); // Hide loading overlay when done
            });
    }

});