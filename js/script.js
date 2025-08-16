// Toggle mobile menu visibility and body scroll
function toggleMenu(toggle, navLinks) {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = toggle.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu and restore body scroll
function closeMenu(toggle, navLinks) {
    toggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
}

// Validate individual fields
function validateInputs(name, email, dob, message, genderSelected) {
    let isValid = true;

    if (!name.value.trim()) {
        alert('Name is required');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        alert('Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        alert('Please enter a valid email');
        isValid = false;
    }

    if (!dob.value.trim()) {
        alert('Date of birth is required');
        isValid = false;
    }

    if (!message.value.trim()) {
        alert('Message is required');
        isValid = false;
    }

    if (!genderSelected) {
        alert('Please select a gender');
        isValid = false;
    }

    return isValid;
}

// Show inputted data in a modal
function showDataInputs(name, email, dob, message, genderSelected) {
    const modal = document.createElement('div');
    modal.className = 'form-modal';

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const escapeHTML = (str) => {
        if (!str) return;

        return str.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const safeName = escapeHTML(name.value.trim());
    const safeEmail = escapeHTML(email.value.trim());
    const safeDob = escapeHTML(dob.value.trim());
    const safeMessage = escapeHTML(message.value.trim());
    const safeGender = genderSelected ? escapeHTML(genderSelected.value) : 'Not selected';

    const content = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = 'Your Form Submission';

    const namePara = document.createElement('p');
    namePara.textContent = `Name: ${safeName}`;
    
    const emailPara = document.createElement('p');
    emailPara.textContent = `Email: ${safeEmail}`;
    
    const dobPara = document.createElement('p');
    dobPara.textContent = `Date of Birth: ${safeDob}`;
    
    const genderPara = document.createElement('p');
    genderPara.textContent = `Gender: ${safeGender}`;
    
    const messagePara = document.createElement('p');
    messagePara.textContent = `Message: ${safeMessage}`;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.className = 'modal-close-btn';

    content.appendChild(title);
    content.appendChild(namePara);
    content.appendChild(emailPara);
    content.appendChild(dobPara);
    content.appendChild(genderPara);
    content.appendChild(messagePara);
    content.appendChild(closeBtn);

    modal.appendChild(content);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(modal, document.body.firstChild);

    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.removeChild(overlay);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

// Initialize mobile navigation menu
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', () => toggleMenu(toggleBtn, nav));

    links.forEach(link => {
        link.addEventListener('click', () => closeMenu(toggleBtn, nav));
    });
}

// Initialize flatpickr (calendar: date input) with mobile tweak
function initDatePicker() {
    const dateInput = document.querySelectorAll('.date-input');
    if (dateInput.length === 0) return;

    dateInput.forEach(input => {
        flatpickr(input, {
            dateFormat: "m/d/Y",
            disableMobile: true,
            onOpen: function() {
                if (window.innerWidth < 768) {
                    this.calendarContainer.style.transform = "scale(1.3)";
                    this.calendarContainer.style.transformOrigin = "top center";
                }
            }
        });
    });
}

// Initialize form
function initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const dob = document.getElementById('dob');
    const message = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const genderSelected = document.querySelector('input[name="gender"]:checked');

        if (validateInputs(name, email, dob, message, genderSelected)) {
            showDataInputs(name, email, dob, message, genderSelected);
        }
    });
}

// Initialize footer
function initFooter() {
    document.querySelector('.current-year').textContent = new Date().getFullYear();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDatePicker();
    initForm();
    initFooter();
});
