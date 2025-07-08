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

    // // Download PDF functionality
    // const downloadPdfButton = document.getElementById("download-pdf");
    
    // downloadPdfButton.addEventListener("click", function() {
    //     if (outputText.value.trim() === "") {
    //         alert("No text to download.");
    //         return;
    //     }

    //     const { jsPDF } = window.jspdf;
    //     const doc = new jsPDF();
        
    //     // Set font and size
    //     doc.setFont('helvetica');
    //     doc.setFontSize(12);

    //     // Split text into lines that fit the page
    //     const splitText = doc.splitTextToSize(outputText.value, 180);
        
    //     // Add text to PDF
    //     doc.text(splitText, 15, 20);

    //     // Save PDF with current timestamp
    //     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    //     doc.save(`ChartWitch_Output_${timestamp}.pdf`);
    // });

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
            
            // Load all tools when any tab is activated (in case new tools were added)
            loadAllTools();
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
    const authToken = localStorage.getItem("authToken") || localStorage.getItem("token");
    if (!authToken && !window.location.pathname.includes("login")) {
        // Redirect to login if not logged in
        window.location.href = "/login";
        return;
    }

    // Load all tools on page initialization
    loadAllTools();

    // Load user greeting
    loadUserGreeting();



    // Add test mode for debugging
    const TEST_MODE = localStorage.getItem('test_mode') === 'true';
    
    // Update the processText function to use showLoading and hideLoading
    async function processText(action, customPrompt) {
        // In test mode, skip authentication
        if (!TEST_MODE) {
            const authToken = localStorage.getItem('authToken') || localStorage.getItem('token');
            if (!authToken) {
                window.location.href = '/login';
                return;
            }
        }

        const inputText = document.getElementById('inputText').value;
        const outputText = document.getElementById('outputText');

        if (!inputText) {
            alert('Please enter some text first');
            return;
        }

        try {
            showLoading(); // Show the loading overlay instead of "Processing..."
            
            // Use test endpoint in test mode
            const endpoint = TEST_MODE ? '/test-button' : '/process';
            const authToken = TEST_MODE ? null : (localStorage.getItem('authToken') || localStorage.getItem('token'));
            
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (!TEST_MODE && authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    text: inputText,
                    action: action,
                    prompt: customPrompt
                })
            });

            if (response.status === 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('token');
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


        } catch (error) {
            console.error('Error:', error);
            outputText.value = 'Error processing text: ' + error.message;
        } finally {
            hideLoading(); // Hide the loading overlay when done
        }
    }

    // Add event listeners to action buttons (including static ones)
    function attachButtonListeners() {
        const actionButtons = document.querySelectorAll(".action-button");
        actionButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            button.removeEventListener("click", buttonClickHandler);
            button.addEventListener("click", buttonClickHandler);
        });
    }
    
    function buttonClickHandler(event) {
        const action = this.getAttribute("data-action");
        const customPrompt = this.getAttribute("data-text");
        console.log('Button clicked:', action); // Debug log
        processText(action, customPrompt);
    }
    
    // Initial attachment
    attachButtonListeners();

    // Tab switching functionality (using the existing switchTab function)
    tabItems.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // Load tools for all tabs dynamically
    function loadAllTools() {
        fetch('/api/all-tools')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.tools) {
                    loadToolsIntoTabs(data.tools);
                }
            })
            .catch(error => {
                console.error('Error loading tools:', error);
            });
    }

    function loadToolsIntoTabs(tools) {
        // Group tools by tab
        const toolsByTab = {
            'documentation': [],
            'diagnostics': [],
            'analytics': [],
            'misc': []
        };

        tools.forEach(tool => {
            const tab = tool.tab || 'misc';
            if (toolsByTab[tab]) {
                toolsByTab[tab].push(tool);
            }
        });

        // Load tools into each tab
        Object.keys(toolsByTab).forEach(tabName => {
            const containerId = `${tabName}-tools-container`;
            const container = document.getElementById(containerId);
            if (!container) return;

            // Clear existing custom tools from this container
            const existingCustomTools = container.querySelectorAll('.custom-tool');
            existingCustomTools.forEach(tool => tool.remove());

            // Add new tools
            toolsByTab[tabName].forEach(tool => {
                const button = document.createElement('button');
                button.className = 'action-button custom-tool';
                button.textContent = tool.button_label;
                button.setAttribute('data-action', tool.key);
                button.setAttribute('data-tooltip', tool.button_tooltip);
                button.setAttribute('data-text', tool.text);
                
                button.addEventListener('click', () => {
                    console.log('Dynamic button clicked:', tool.key); // Debug log
                    processText(tool.key, tool.text);
                });
                
                container.appendChild(button);
            });
        });
        
        // Reattach listeners to all buttons after loading tools
        setTimeout(() => {
            attachButtonListeners();
        }, 100);
    }

    // Load custom tools function (for backward compatibility)
    function loadCustomTools() {
        const container = document.getElementById('misc-tools-container');
        if (!container) return;

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
                    container.innerHTML = '<p class="no-tools">No miscellaneous tools available</p>';
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
                container.innerHTML = '<p class="error">Failed to load miscellaneous tools</p>';
            })
            .finally(() => {
                hideLoading(); // Hide loading overlay when done
            });
    }

    // Profile modal logic
    document.getElementById('profile-btn').addEventListener('click', function() {
        // Fetch profile info from backend
        fetch('/api/profile', {
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem('authToken') || '')
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                document.getElementById('profile-details').innerHTML = `<p style="color:red;">${data.error}</p>`;
            } else {
                document.getElementById('profile-name').textContent = data.name || '';
                document.getElementById('profile-email').textContent = data.email || '';
                document.getElementById('profile-profession').textContent = data.profession || '';
                document.getElementById('profile-institution').textContent = data.institution || '';
                document.getElementById('profile-status').textContent = data.status || 'Active';
                
                // Show/hide buttons based on subscription status
                const cancelBtn = document.getElementById('cancel-subscription-btn');
                const reactivateBtn = document.getElementById('reactivate-subscription-btn');
                
                if (data.status && data.status.includes('Cancelled')) {
                    cancelBtn.style.display = 'none';
                    reactivateBtn.style.display = 'flex';
                } else {
                    cancelBtn.style.display = 'flex';
                    reactivateBtn.style.display = 'none';
                }
            }
            document.getElementById('profile-modal').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            document.getElementById('profile-details').innerHTML = `<p style="color:red;">Error loading profile</p>`;
            document.getElementById('profile-modal').style.display = 'block';
        });
    });

    // Profile modal close handlers
    document.getElementById('close-profile-modal').onclick = function() {
        document.getElementById('profile-modal').style.display = 'none';
    };

    // Change Password Modal handlers
    document.getElementById('change-password-btn').addEventListener('click', function() {
        document.getElementById('profile-modal').style.display = 'none';
        document.getElementById('change-password-modal').style.display = 'block';
        // Clear form
        document.getElementById('change-password-form').reset();
        document.getElementById('password-change-message').style.display = 'none';
    });

    document.getElementById('close-change-password-modal').onclick = function() {
        document.getElementById('change-password-modal').style.display = 'none';
    };

    document.getElementById('cancel-password-change').onclick = function() {
        document.getElementById('change-password-modal').style.display = 'none';
    };

    // Cancel Subscription Modal handlers
    document.getElementById('cancel-subscription-btn').addEventListener('click', function() {
        document.getElementById('profile-modal').style.display = 'none';
        document.getElementById('cancel-subscription-modal').style.display = 'block';
        document.getElementById('cancellation-message').style.display = 'none';
    });

    document.getElementById('close-cancel-subscription-modal').onclick = function() {
        document.getElementById('cancel-subscription-modal').style.display = 'none';
    };

    document.getElementById('keep-subscription').onclick = function() {
        document.getElementById('cancel-subscription-modal').style.display = 'none';
    };

    // Reactivate Subscription handler
    document.getElementById('reactivate-subscription-btn').addEventListener('click', function() {
        if (confirm('Are you sure you want to reactivate your subscription? You will be charged according to your current plan.')) {
            const reactivateBtn = this;
            const originalText = reactivateBtn.textContent;
            
            // Show loading state
            reactivateBtn.textContent = 'Reactivating...';
            reactivateBtn.disabled = true;
            
            // Send request to backend
            fetch('/api/reactivate-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error);
                } else {
                    alert(data.message);
                    // Refresh profile to update status
                    document.getElementById('profile-modal').style.display = 'none';
                    setTimeout(() => {
                        document.getElementById('profile-btn').click();
                    }, 500);
                }
            })
            .catch(error => {
                console.error('Error reactivating subscription:', error);
                alert('An error occurred. Please try again.');
            })
            .finally(() => {
                reactivateBtn.textContent = originalText;
                reactivateBtn.disabled = false;
            });
        }
    });

    // Universal modal close on outside click
    window.onclick = function(event) {
        const modals = ['profile-modal', 'change-password-modal', 'cancel-subscription-modal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };

    // Change Password Form Handler
    document.getElementById('change-password-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const messageDiv = document.getElementById('password-change-message');
        
        // Client-side validation
        if (newPassword !== confirmPassword) {
            showPasswordMessage('Passwords do not match.', 'error');
            return;
        }
        
        if (!validatePassword(newPassword)) {
            showPasswordMessage('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = document.getElementById('submit-password-change');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Changing...';
        submitBtn.disabled = true;
        
        // Send request to backend
        fetch('/api/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                showPasswordMessage(data.error, 'error');
            } else {
                showPasswordMessage('Password changed successfully!', 'success');
                document.getElementById('change-password-form').reset();
                setTimeout(() => {
                    document.getElementById('change-password-modal').style.display = 'none';
                }, 2000);
            }
        })
        .catch(error => {
            console.error('Error changing password:', error);
            showPasswordMessage('An error occurred. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });

    // Cancel Subscription Handler
    document.getElementById('confirm-cancellation').addEventListener('click', function() {
        const reason = document.getElementById('cancellation-reason').value;
        const messageDiv = document.getElementById('cancellation-message');
        const confirmBtn = this;
        
        // Show loading state
        const originalText = confirmBtn.textContent;
        confirmBtn.textContent = 'Cancelling...';
        confirmBtn.disabled = true;
        
        // Send request to backend
        fetch('/api/cancel-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                reason: reason
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                showCancellationMessage(data.error, 'error');
            } else {
                showCancellationMessage('Subscription cancelled successfully. You will retain access until the end of your billing period.', 'success');
                setTimeout(() => {
                    document.getElementById('cancel-subscription-modal').style.display = 'none';
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Error cancelling subscription:', error);
            showCancellationMessage('An error occurred. Please try again.', 'error');
        })
        .finally(() => {
            confirmBtn.textContent = originalText;
            confirmBtn.disabled = false;
        });
    });

    // Helper Functions
    function validatePassword(password) {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
    }
    
    function showPasswordMessage(message, type) {
        const messageDiv = document.getElementById('password-change-message');
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }
    
    function showCancellationMessage(message, type) {
        const messageDiv = document.getElementById('cancellation-message');
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }

    // Load user greeting function
    function loadUserGreeting() {
        const greetingElement = document.getElementById('user-greeting');
        const authToken = localStorage.getItem('authToken') || localStorage.getItem('token');
        
        if (!authToken) {
            greetingElement.textContent = 'Hello! 😀';
            return;
        }
        
        // Fetch user profile to get first name
        fetch('/api/profile', {
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                greetingElement.textContent = 'Hello! 😀';
            } else {
                // Extract first name from the full name
                const fullName = data.name || '';
                const firstName = fullName.split(' ')[0] || 'User';
                greetingElement.textContent = `Hello ${firstName}! 😀`;
            }
        })
        .catch(error => {
            console.error('Error loading user greeting:', error);
            greetingElement.textContent = 'Hello! 😀';
        });
    }

    // Clear output functionality
    const clearButton = document.getElementById("clear-output");
    clearButton.addEventListener("click", function() {
        document.getElementById("outputText").value = "";
    });
});