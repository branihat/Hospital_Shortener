document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const errorContainer = document.getElementById('error-container');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            email: signupForm.email.value,
            password: signupForm.password.value,
            firstName: signupForm.firstName.value,
            lastName: signupForm.lastName.value,
            degree: signupForm.degree.value,
            profession: signupForm.profession.value,
            agreeToEula: signupForm.agreeToEula.checked
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful! Please check your email to verify your account.');
                window.location.href = '/login';
            } else {
                errorContainer.textContent = data.error || 'Registration failed';
            }
        } catch (error) {
            console.error('Registration error:', error);
            errorContainer.textContent = 'Registration failed. Please try again.';
        }
    });

    const eulaLink = document.querySelector('[data-agreement="eula"]');
    const baaLink = document.querySelector('[data-agreement="baa"]');
    const eulaCheckbox = document.getElementById('eula-checkbox');
    const baaCheckbox = document.getElementById('baa-checkbox');
    const modal = document.getElementById('agreement-modal');
    const agreementText = document.getElementById('agreement-text');
    const progressIndicator = document.getElementById('progress-indicator');
    const confirmButton = document.getElementById('confirm-read');

    let agreements = {
        eula: { read: false },
        baa: { read: false }
    };

    async function showAgreement(type) {
        try {
            const response = await fetch(`/api/agreements/${type}`);
            const data = await response.json();
            
            agreementText.innerHTML = data.content;
            modal.style.display = 'block';
            progressIndicator.style.width = '0%';
            confirmButton.disabled = true;
            confirmButton.dataset.agreement = type;
            
            // Reset scroll position
            agreementText.scrollTop = 0;
        } catch (error) {
            console.error('Error loading agreement:', error);
        }
    }

    agreementText.addEventListener('scroll', () => {
        const scrollPercent = (agreementText.scrollTop / 
            (agreementText.scrollHeight - agreementText.clientHeight)) * 100;
        progressIndicator.style.width = `${scrollPercent}%`;
        
        if (scrollPercent >= 90) {
            confirmButton.disabled = false;
        }
    });

    confirmButton.addEventListener('click', () => {
        const type = confirmButton.dataset.agreement;
        agreements[type].read = true;
        
        if (type === 'eula') {
            eulaCheckbox.disabled = false;
        } else if (type === 'baa') {
            baaCheckbox.disabled = false;
        }
        
        modal.style.display = 'none';
    });

    eulaLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAgreement('eula');
    });

    baaLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAgreement('baa');
    });
});