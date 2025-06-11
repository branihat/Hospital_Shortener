document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('agreement-modal');
    const modalTitle = document.getElementById('modal-title');
    const agreementText = document.getElementById('agreement-text');
    const progressIndicator = document.getElementById('progress-indicator');
    const progressText = document.getElementById('progress-text');
    const confirmButton = document.getElementById('confirm-read');
    const closeModal = document.querySelector('.close-modal');
    
    let agreements = {
        eula: {
            read: false,
            checkbox: document.getElementById('eula-checkbox')
        },
        baa: {
            read: false,
            checkbox: document.getElementById('baa-checkbox')
        }
    };

    // Load agreement content
    async function loadAgreement(type) {
        try {
            const response = await fetch(`/api/agreements/${type}`);
            const data = await response.json();
            return data.content;
        } catch (error) {
            console.error('Error loading agreement:', error);
            return 'Error loading agreement content.';
        }
    }

    // Track scrolling progress
    function updateProgress(element) {
        const scrollPercent = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
        progressIndicator.style.width = `${scrollPercent}%`;
        progressText.textContent = `${Math.round(scrollPercent)}% read`;
        
        if (scrollPercent >= 90) {
            confirmButton.classList.add('active');
            confirmButton.disabled = false;
        }
    }

    // Handle agreement link clicks
    document.querySelectorAll('.agreement-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const agreementType = e.target.dataset.agreement;
            modalTitle.textContent = agreementType.toUpperCase() + ' Agreement';
            agreementText.innerHTML = await loadAgreement(agreementType);
            
            // Reset progress
            progressIndicator.style.width = '0%';
            progressText.textContent = '0% read';
            confirmButton.classList.remove('active');
            confirmButton.disabled = true;
            
            modal.style.display = 'block';
            
            // Store current agreement type
            confirmButton.dataset.agreement = agreementType;
        });
    });

    // Track scrolling in agreement text
    agreementText.addEventListener('scroll', () => {
        updateProgress(agreementText);
    });

    // Handle confirmation
    confirmButton.addEventListener('click', () => {
        const agreementType = confirmButton.dataset.agreement;
        agreements[agreementType].read = true;
        agreements[agreementType].checkbox.disabled = false;
        agreements[agreementType].checkbox.checked = true;
        modal.style.display = 'none';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});