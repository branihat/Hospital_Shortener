document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const errorContainer = document.getElementById('error-container');

    if (!signupForm || !errorContainer) {
        console.error('Required form elements not found');
        return;
    }

    // Add input validation for institution
    const institutionInput = document.querySelector('input[name="institution"]');
    if (institutionInput) {
        institutionInput.addEventListener('input', function() {
            validateInput(this, 'Institution name is required');
        });
    }

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorContainer.style.display = 'none';

        try {
            const formElements = {
                firstName: document.querySelector('input[name="firstName"]'),
                lastName: document.querySelector('input[name="lastName"]'),
                email: document.querySelector('input[name="email"]'),
                password: document.querySelector('input[name="password"]'),
                confirmPassword: document.querySelector('input[name="confirmPassword"]'),
                degree: document.querySelector('select[name="degree"]'),
                profession: document.querySelector('select[name="profession"]'),
                institution: document.querySelector('input[name="institution"]'), // Add this line
                agreeToEula: document.getElementById('eula-checkbox'),
                agreeToBaa: document.getElementById('baa-checkbox')
            };

            // Validate form elements exist
            for (const [key, element] of Object.entries(formElements)) {
                if (!element) {
                    throw new Error(`Form field ${key} not found`);
                }
            }

            const formData = {
                firstName: formElements.firstName.value.trim(),
                lastName: formElements.lastName.value.trim(),
                email: formElements.email.value.trim(),
                password: formElements.password.value,
                confirmPassword: formElements.confirmPassword.value,
                degree: formElements.degree.value,
                profession: formElements.profession.value,
                institution: formElements.institution.value.trim(), // Add this line
                agreeToEula: formElements.agreeToEula.checked,
                agreeToBaa: formElements.agreeToBaa.checked
            };

            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                errorContainer.textContent = "Passwords do not match";
                errorContainer.style.display = 'block';
                return;
            }

            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to payment page after successful registration
                window.location.href = `/payment?user_id=${data.userId}`;
            } else {
                throw new Error(data.error || 'Registration failed');
            }

        } catch (error) {
            console.error('Registration error:', error);
            errorContainer.textContent = error.message;
            errorContainer.style.display = 'block';
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

    function validateInput(input, message) {
        const errorDiv = input.parentElement.querySelector('.input-error');
        if (!input.value.trim()) {
            errorDiv.textContent = message;
            input.classList.add('error');
            return false;
        } else {
            errorDiv.textContent = '';
            input.classList.remove('error');
            return true;
        }
    }
});