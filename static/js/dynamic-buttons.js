async function loadDynamicButtons() {
    try {
        const response = await fetch('/api/buttons');
        const buttons = await response.json();
        console.log('Loaded buttons:', buttons); // Debug log

        const buttonContainer = document.getElementById('dynamic-buttons');
        if (!buttonContainer) {
            console.error('Button container not found');
            return;
        }

        buttonContainer.innerHTML = ''; // Clear existing buttons

        buttons.forEach(button => {
            const btnElement = document.createElement('button');
            btnElement.className = 'action-button';
            btnElement.dataset.action = button.prompt_key;
            btnElement.dataset.tooltip = button.label;
            
            btnElement.innerHTML = `
                <i class="${button.icon}"></i>
                ${button.label}
            `;

            // Add click handler
            btnElement.addEventListener('click', async () => {
                const inputText = document.getElementById('inputText').value;
                if (!inputText) {
                    alert('Please enter some text to process');
                    return;
                }

                try {
                    const response = await fetch('/process', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            text: inputText,
                            action: button.prompt_key
                        })
                    });

                    const data = await response.json();
                    if (data.error) {
                        alert(data.error);
                        return;
                    }

                    document.getElementById('outputText').value = data.result;
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to process text');
                }
            });

            buttonContainer.appendChild(btnElement);
        });
    } catch (error) {
        console.error('Error loading dynamic buttons:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // Make custom tools tab visible by default
    const customToolsTab = document.querySelector('[data-target="custom-tools-container"]');
    const customToolsContainer = document.getElementById('custom-tools-container');
    
    try {
        const response = await fetch('/api/buttons');
        const buttons = await response.json();
        console.log('Loaded buttons:', buttons); // Debug log
        
        const container = document.getElementById('custom-tools');
        if (!container) {
            console.error('Custom tools container not found');
            return;
        }
        
        // Clear existing buttons
        container.innerHTML = '';
        
        if (buttons && buttons.length > 0) {
            buttons.forEach(button => {
                const buttonElement = document.createElement('button');
                buttonElement.className = 'action-button';
                buttonElement.setAttribute('data-action', button.prompt_key);
                buttonElement.setAttribute('data-tooltip', button.label);
                
                buttonElement.innerHTML = `
                    <i class="${button.icon || 'fas fa-magic'}"></i>
                    <span>${button.label}</span>
                `;
                
                // Use the same click handler as other buttons
                buttonElement.addEventListener('click', function() {
                    const inputText = document.getElementById('inputText').value;
                    processText(this, button.prompt_key);
                });
                
                container.appendChild(buttonElement);
            });
            
            // Show custom tools tab if we have buttons
            if (customToolsContainer) {
                customToolsContainer.style.display = 'block';
            }
        } else {
            container.innerHTML = '<p class="no-tools-message">No custom tools available yet</p>';
        }
        
    } catch (error) {
        console.error('Error loading dynamic buttons:', error);
        container.innerHTML = '<p class="no-tools-message">Failed to load custom tools</p>';
    }
});