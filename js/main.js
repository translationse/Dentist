// Main Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Hide loader
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);

    // Load data
    loadWebsiteData();

    // Initialize event listeners
    initEventListeners();
});

function loadWebsiteData() {
    const data = DataManager.get();

    // Update clinic info
    document.getElementById('clinic-name').textContent = data.clinic.name;
    document.getElementById('clinic-tagline').textContent = data.clinic.tagline;
    document.getElementById('doctor-name').textContent = data.clinic.doctorName;
    document.getElementById('footer-name').textContent = data.clinic.name;
    document.getElementById('copyright-name').textContent = data.clinic.name;
    document.getElementById('experience-badge').textContent = data.clinic.experience + '+ Years of Excellence';
    document.getElementById('exp-years').textContent = data.clinic.experience;
    document.getElementById('hero-description').textContent = data.clinic.heroDescription;
    document.getElementById('about-text').textContent = data.clinic.about;
    document.getElementById('contact-phone').textContent = data.clinic.phone;
    document.getElementById('contact-address').textContent = data.clinic.address.split(',')[0];
    document.getElementById('contact-timing').textContent = data.clinic.timing;
    document.getElementById('footer-address').textContent = data.clinic.address;
    document.getElementById('footer-phone').textContent = data.clinic.phone;
    document.getElementById('footer-email').textContent = data.clinic.email;
    document.getElementById('footer-desc').textContent = 'Providing exceptional dental care with ' + data.clinic.experience + '+ years of experience.';

    // Update phone links
    document.getElementById('header-whatsapp').href = 'https://wa.me/' + data.clinic.whatsapp;
    document.getElementById('hero-whatsapp').href = 'https://wa.me/' + data.clinic.whatsapp;
    document.getElementById('hero-phone').href = 'tel:' + data.clinic.phone;
    document.getElementById('float-whatsapp').href = 'https://wa.me/' + data.clinic.whatsapp;

    // Apply colors
    document.documentElement.style.setProperty('--primary', data.appearance.primaryColor);
    document.documentElement.style.setProperty('--secondary', data.appearance.secondaryColor);
    document.documentElement.style.setProperty('--accent', data.appearance.accentColor);

    // Load images
    if (data.images.hero) {
        document.getElementById('hero-img').src = data.images.hero;
    }
    if (data.images.doctor) {
        document.getElementById('doctor-img').src = data.images.doctor;
    }
    if (data.images.logo) {
        document.getElementById('logo-img').src = data.images.logo;
        document.querySelector('.logo-fallback').style.display = 'none';
    }

    // Load services
    renderServices(data.services);

    // Load reviews
    renderReviews(data.reviews);

    // Load social links
    loadSocialLinks(data.social);
}

function renderServices(services) {
    const container = document.getElementById('services-container');
    container.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon" style="background-color: ${service.color}">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.name}</h3>
            <p>${service.desc}</p>
            <a href="https://wa.me/${DataManager.get().clinic.whatsapp}?text=Hi, I want to know about ${service.name}" class="service-link" target="_blank">
                Enquire <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

function renderReviews(reviews) {
    const container = document.getElementById('reviews-container');
    container.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            <p class="review-text">"${review.text}"</p>
            <div class="review-author">
                <div class="author-avatar">
                    ${review.photo ? `<img src="${review.photo}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : review.name.charAt(0)}
                </div>
                <div class="author-info">
                    <h4>${review.name}</h4>
                    <span>Verified Patient</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadSocialLinks(social) {
    // WhatsApp always visible
    document.getElementById('social-whatsapp').href = 'https://wa.me/' + social.whatsapp;
    
    // Others conditional
    if (social.facebook) {
        document.getElementById('social-facebook').href = social.facebook;
        document.getElementById('social-facebook').style.display = 'flex';
    }
    if (social.instagram) {
        document.getElementById('social-instagram').href = social.instagram;
        document.getElementById('social-instagram').style.display = 'flex';
    }
    if (social.linkedin) {
        document.getElementById('social-linkedin').href = social.linkedin;
        document.getElementById('social-linkedin').style.display = 'flex';
    }
    if (social.justdial) {
        document.getElementById('social-justdial').href = social.justdial;
        document.getElementById('social-justdial').style.display = 'flex';
    }

    // Footer social
    const footerSocial = document.getElementById('footer-social');
    let html = '';
    if (social.whatsapp) html += `<a href="https://wa.me/${social.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>`;
    if (social.facebook) html += `<a href="${social.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>`;
    if (social.instagram) html += `<a href="${social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`;
    if (social.linkedin) html += `<a href="${social.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>`;
    if (social.youtube) html += `<a href="${social.youtube}" target="_blank"><i class="fab fa-youtube"></i></a>`;
    footerSocial.innerHTML = html;
}

function initEventListeners() {
    // Mobile menu
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    document.getElementById('close-menu').addEventListener('click', toggleMobileMenu);

    // Appointment form
    document.getElementById('appointment-form').addEventListener('submit', handleAppointmentSubmit);

    // Quick inquiry form
    document.getElementById('quick-inquiry-form').addEventListener('submit', handleInquirySubmit);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.getElementById('mobile-menu').classList.remove('active');
            }
        });
    });

    // Set min date for appointment
    const dateInput = document.getElementById('appointment-date');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('active');
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const appointment = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        date: formData.get('date'),
        time: formData.get('time'),
        service: formData.get('service'),
        message: formData.get('message')
    };

    // Save to database
    DataManager.addAppointment(appointment);

    // Show success
    document.getElementById('appointment-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';

    // Send WhatsApp notification (simulate)
    sendWhatsAppNotification(appointment);
}

function handleInquirySubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inquiry = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        service: formData.get('service')
    };

    DataManager.addInquiry(inquiry);
    closeInquiry();
    alert('Thank you! We will contact you shortly.');
    e.target.reset();
}

function resetForm() {
    document.getElementById('appointment-form').reset();
    document.getElementById('appointment-form').style.display = 'block';
    document.getElementById('form-success').style.display = 'none';
}

function toggleInquiry() {
    document.getElementById('inquiry-modal').classList.toggle('active');
}

function closeInquiry() {
    document.getElementById('inquiry-modal').classList.remove('active');
}

function sendWhatsAppNotification(appointment) {
    // In real implementation, this would connect to WhatsApp Business API
    console.log('WhatsApp notification would be sent for:', appointment);
}

// Close modal on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}
