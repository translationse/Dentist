// Admin Panel JavaScript
let currentData = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check login
    if (!sessionStorage.getItem('adminLoggedIn')) {
        showLogin();
    } else {
        showDashboard();
    }

    // Login form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === 'admin' && password === 'admin123') {
            sessionStorage.setItem('adminLoggedIn', 'true');
            showDashboard();
        } else {
            alert('Invalid credentials!');
        }
    });
});

function showLogin() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'flex';
    currentData = DataManager.get();
    loadDashboardData();
    setupEventListeners();
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    showLogin();
}

function loadDashboardData() {
    // Update stats
    document.getElementById('stat-appointments').textContent = currentData.appointments.length;
    document.getElementById('stat-inquiries').textContent = currentData.inquiries.length;
    document.getElementById('stat-services').textContent = currentData.services.length;
    document.getElementById('stat-reviews').textContent = currentData.reviews.length;
    
    // Update badges
    document.getElementById('appointment-count').textContent = currentData.appointments.filter(a => a.status === 'pending').length;
    document.getElementById('inquiry-count').textContent = currentData.inquiries.length;

    // Load forms
    loadGeneralSettings();
    loadServices();
    loadReviews();
    loadAppointments();
    loadInquiries();
    loadGallery();
}

function setupEventListeners() {
    // Color pickers
    document.getElementById('set-primary-color').addEventListener('input', function(e) {
        document.getElementById('primary-hex').textContent = e.target.value;
    });
    
    // Save buttons
    document.getElementById('set-clinic-name').addEventListener('change', updateData);
    // ... more listeners
}

function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    // Show selected
    document.getElementById('section-' + section).classList.add('active');
    event.target.classList.add('active');
    
    // Update title
    const titles = {
        'dashboard': 'Dashboard',
        'general': 'General Settings',
        'appearance': 'Appearance',
        'services': 'Services Manager',
        'reviews': 'Reviews Manager',
        'social': 'Social Links',
        'appointments': 'Appointments',
        'inquiries': 'Inquiries',
        'media': 'Media Manager'
    };
    document.getElementById('section-title').textContent = titles[section];
}

function loadGeneralSettings() {
    document.getElementById('set-clinic-name').value = currentData.clinic.name;
    document.getElementById('set-tagline').value = currentData.clinic.tagline;
    document.getElementById('set-doctor-name').value = currentData.clinic.doctorName;
    document.getElementById('set-experience').value = currentData.clinic.experience;
    document.getElementById('set-phone').value = currentData.clinic.phone;
    document.getElementById('set-email').value = currentData.clinic.email;
    document.getElementById('set-address').value = currentData.clinic.address;
    document.getElementById('set-about').value = currentData.clinic.about;
    document.getElementById('set-hero-desc').value = currentData.clinic.heroDescription;
}

function loadServices() {
    const container = document.getElementById('services-list');
    container.innerHTML = currentData.services.map(service => `
        <div class="item-card">
            <div class="item-icon" style="background-color: ${service.color}">
                <i class="fas ${service.icon}"></i>
            </div>
            <div class="item-info">
                <h4>${service.name}</h4>
                <p>${service.desc}</p>
            </div>
            <div class="item-actions">
                <button class="btn-icon edit" onclick="editService(${service.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete" onclick="deleteService(${service.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function openServiceModal() {
    document.getElementById('service-modal').classList.add('active');
    document.getElementById('service-form').reset();
    document.getElementById('service-id').value = '';
}

function saveService(e) {
    e.preventDefault();
    const id = document.getElementById('service-id').value;
    const service = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('service-name').value,
        icon: document.getElementById('service-icon').value,
        color: document.getElementById('service-color').value,
        desc: document.getElementById('service-desc').value
    };

    if (id) {
        const index = currentData.services.findIndex(s => s.id === parseInt(id));
        currentData.services[index] = service;
    } else {
        currentData.services.push(service);
    }

    DataManager.save(currentData);
    loadServices();
    closeModal('service-modal');
    showToast('Service saved successfully!');
}

function deleteService(id) {
    if (confirm('Delete this service?')) {
        currentData.services = currentData.services.filter(s => s.id !== id);
        DataManager.save(currentData);
        loadServices();
        showToast('Service deleted!');
    }
}

function loadAppointments() {
    const tbody = document.getElementById('appointments-tbody');
    const appointments = currentData.appointments.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    tbody.innerHTML = appointments.map(apt => `
        <tr>
            <td>${new Date(apt.date).toLocaleDateString()}</td>
            <td>${apt.name}</td>
            <td>${apt.phone}</td>
            <td>${apt.service}</td>
            <td>${apt.date} ${apt.time}</td>
            <td><span class="status ${apt.status}">${apt.status}</span></td>
            <td>
                <button onclick="viewAppointment(${apt.id})" class="btn-icon edit">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function saveAllChanges() {
    // Update all data from forms
    currentData.clinic.name = document.getElementById('set-clinic-name').value;
    currentData.clinic.tagline = document.getElementById('set-tagline').value;
    currentData.clinic.doctorName = document.getElementById('set-doctor-name').value;
    currentData.clinic.experience = document.getElementById('set-experience').value;
    currentData.clinic.phone = document.getElementById('set-phone').value;
    currentData.clinic.email = document.getElementById('set-email').value;
    currentData.clinic.address = document.getElementById('set-address').value;
    currentData.clinic.about = document.getElementById('set-about').value;
    currentData.clinic.heroDescription = document.getElementById('set-hero-desc').value;
    
    currentData.appearance.primaryColor = document.getElementById('set-primary-color').value;
    currentData.appearance.secondaryColor = document.getElementById('set-secondary-color').value;
    
    // Social
    currentData.social.whatsapp = document.getElementById('social-whatsapp').value;
    currentData.social.facebook = document.getElementById('social-facebook').value;
    currentData.social.instagram = document.getElementById('social-instagram').value;
    currentData.social.linkedin = document.getElementById('social-linkedin').value;
    currentData.social.youtube = document.getElementById('social-youtube').value;
    currentData.social.justdial = document.getElementById('social-justdial').value;
    currentData.social.google = document.getElementById('social-google').value;
    
    DataManager.save(currentData);
    showToast('All changes saved successfully!');
}

function previewWebsite() {
    window.open('index.html', '_blank');
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas fa-check-circle"></i>${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Image handling functions
function triggerUpload(inputId) {
    document.getElementById(inputId).click();
}

function handleImageUpload(input, type) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (type === 'logo') {
                document.getElementById('preview-logo').src = e.target.result;
                document.getElementById('preview-logo').style.display = 'block';
                document.getElementById('logo-placeholder').style.display = 'none';
                currentData.images.logo = e.target.result;
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function exportAppointments() {
    const csv = convertToCSV(currentData.appointments);
    downloadFile(csv, 'appointments.csv', 'text/csv');
}

function convertToCSV(data) {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => headers.map(h => `"${obj[h]}"`).join(','));
    return [headers.join(','), ...rows].join('\n');
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}
