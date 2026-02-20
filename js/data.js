// Data Management System
const DataManager = {
    // Default data structure
    defaults: {
        clinic: {
            name: "Dr. Snehal Shah",
            tagline: "Dental Clinic",
            doctorName: "Dr. Snehal Shah",
            experience: "16",
            phone: "+91 94035 15585",
            whatsapp: "919403515585",
            email: "info@drsnehalshah.com",
            address: "Anand Health Care, Shop No. 5, Near Zaveri Gas Co., Siddharth Nagar, Road No. 1, Goregaon (West), Mumbai - 400104",
            about: "With over 16 years of clinical experience, Dr. Snehal Shah combines extensive expertise with genuine compassion to deliver exceptional dental care.",
            heroDescription: "At Dr. Snehal Shah's Dental Clinic, we combine expertise with a caring approach to ensure your dental journey is as comfortable and painless as possible.",
            timing: "Mon-Sat: 10 AM - 1 PM"
        },
        appearance: {
            primaryColor: "#0891B2",
            secondaryColor: "#0D9488",
            accentColor: "#EA580C"
        },
        services: [
            { id: 1, name: "Routine Check-ups", icon: "fa-stethoscope", color: "#3B82F6", desc: "Regular examinations and preventive care", image: null },
            { id: 2, name: "Dental Implants", icon: "fa-tooth", color: "#8B5CF6", desc: "Permanent tooth replacement solutions", image: null },
            { id: 3, name: "Cosmetic Dentistry", icon: "fa-magic", color: "#EC4899", desc: "Smile makeovers and whitening", image: null },
            { id: 4, name: "Root Canal", icon: "fa-procedures", color: "#EF4444", desc: "Painless single-sitting RCT", image: null },
            { id: 5, name: "Braces & Aligners", icon: "fa-teeth", color: "#F59E0B", desc: "Straighten your teeth", image: null },
            { id: 6, name: "General Dentistry", icon: "fa-syringe", color: "#10B981", desc: "Fillings, extractions, gum care", image: null }
        ],
        reviews: [
            { id: 1, name: "Priya Sharma", rating: 5, text: "Best dental experience ever! Dr. Snehal is so gentle and caring.", photo: null, date: "2024-01-15" },
            { id: 2, name: "Rahul Mehta", rating: 5, text: "Got my implants done here. Very professional and painless procedure.", photo: null, date: "2024-01-10" }
        ],
        social: {
            whatsapp: "919403515585",
            facebook: "",
            instagram: "",
            linkedin: "",
            youtube: "",
            justdial: "",
            google: ""
        },
        appointments: [],
        inquiries: [],
        images: {
            logo: null,
            favicon: null,
            hero: null,
            doctor: null,
            gallery: []
        }
    },

    // Initialize data
    init() {
        if (!localStorage.getItem('dentalData')) {
            this.save(this.defaults);
        }
    },

    // Get all data
    get() {
        return JSON.parse(localStorage.getItem('dentalData')) || this.defaults;
    },

    // Save all data
    save(data) {
        localStorage.setItem('dentalData', JSON.stringify(data));
    },

    // Update specific section
    update(section, data) {
        const current = this.get();
        current[section] = data;
        this.save(current);
    },

    // Add appointment
    addAppointment(appointment) {
        const data = this.get();
        appointment.id = Date.now();
        appointment.date = new Date().toISOString();
        appointment.status = 'pending';
        data.appointments.push(appointment);
        this.save(data);
        return appointment;
    },

    // Add inquiry
    addInquiry(inquiry) {
        const data = this.get();
        inquiry.id = Date.now();
        inquiry.date = new Date().toISOString();
        data.inquiries.push(inquiry);
        this.save(data);
        return inquiry;
    },

    // Export data as JSON file
    export() {
        const data = this.get();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dental-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    },

    // Import data from JSON
    import(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            this.save(data);
            return true;
        } catch (e) {
            return false;
        }
    },

    // Reset to defaults
    reset() {
        localStorage.removeItem('dentalData');
        this.init();
    }
};

// Initialize on load
DataManager.init();
