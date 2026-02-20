// ============================================
// DENTAL WEBSITE CONFIGURATION
// ============================================
// Sirf yeh file edit karein - Alag dentist ke liye

const SITE_CONFIG = {
    // Basic Info
    clinicName: "Dr. Snehal Shah",
    doctorName: "Dr. Snehal Shah",
    tagline: "Dental Clinic",
    specialty: "Cosmetic & Implant Dentistry",
    
    // Experience & Credentials
    experience: "16",
    qualifications: "BDS, MDS (Periodontics)",
    awards: "Best Dentist 2023, Mumbai",
    
    // Contact
    phone: "+91 94035 15585",
    whatsapp: "919403515585", // 91 ke saath number
    email: "contact@drsnehalshah.com",
    website: "https://yourusername.github.io/dental-website",
    
    // Address
    address: "Anand Health Care, Shop No. 5, Near Zaveri Gas Co.",
    area: "Siddharth Nagar, Road No. 1",
    city: "Goregaon (West)",
    state: "Maharashtra",
    pincode: "400104",
    landmark: "Near Zaveri Gas Company",
    
    // Timings
    timings: {
        monday: "10:00 AM - 1:00 PM",
        tuesday: "10:00 AM - 1:00 PM",
        wednesday: "10:00 AM - 1:00 PM",
        thursday: "10:00 AM - 1:00 PM",
        friday: "10:00 AM - 1:00 PM",
        saturday: "10:00 AM - 1:00 PM",
        sunday: "Closed"
    },
    
    // Social Links (Empty chhod dein agar nahi hai)
    social: {
        facebook: "", // https://facebook.com/yourpage
        instagram: "", // https://instagram.com/yourprofile
        linkedin: "", // https://linkedin.com/in/yourprofile
        youtube: "", // https://youtube.com/channel/...
        justdial: "https://jsdl.in/RSL-CUW1771352556", // Justdial link
        google: "", // Google Business link
        practo: "" // Practo link
    },
    
    // Form Handling (CHOOSE ONE)
    forms: {
        // Option 1: Formspree (Recommended)
        formspreeId: "", // Formspree form ID
        
        // Option 2: Google Forms
        googleFormUrl: "", // Google Form link
        
        // Option 3: WhatsApp Direct (Default)
        useWhatsApp: true,
        whatsappNumber: "919403515585"
    },
    
    // SEO Settings
    seo: {
        title: "Dr. Snehal Shah Dental Clinic | Best Dentist in Goregaon West, Mumbai",
        description: "Best dental clinic in Goregaon West, Mumbai. 16+ years experience. Painless dental implants, root canal, cosmetic dentistry. Book appointment now!",
        keywords: "dentist, dental clinic, Goregaon, Mumbai, dental implants, root canal, teeth whitening, braces, Dr Snehal Shah",
        author: "Dr. Snehal Shah",
        language: "en-IN",
        robots: "index, follow",
        googleAnalytics: "", // GA tracking ID (optional)
        googleSiteVerification: "" // Search console verification (optional)
    },
    
    // Colors (Hex codes)
    colors: {
        primary: "#0891B2",
        secondary: "#0D9488",
        accent: "#EA580C"
    },
    
    // Services (Add/Remove as needed)
    services: [
        {
            id: 1,
            name: "Dental Implants",
            icon: "fa-tooth",
            description: "Permanent tooth replacement with natural look and feel. Single sitting implants available.",
            price: "Starting ₹25,000"
        },
        {
            id: 2,
            name: "Root Canal (RCT)",
            icon: "fa-procedures",
            description: "Painless single-sitting root canal treatment using advanced technology.",
            price: "Starting ₹3,500"
        },
        {
            id: 3,
            name: "Cosmetic Dentistry",
            icon: "fa-magic",
            description: "Smile makeovers, veneers, teeth whitening for your perfect smile.",
            price: "Custom quote"
        },
        {
            id: 4,
            name: "Braces & Aligners",
            icon: "fa-teeth",
            description: "Invisible aligners and ceramic braces for teeth straightening.",
            price: "Starting ₹45,000"
        },
        {
            id: 5,
            name: "Teeth Whitening",
            icon: "fa-sun",
            description: "Professional laser teeth whitening - 8 shades lighter in 45 minutes!",
            price: "Starting ₹5,000"
        },
        {
            id: 6,
            name: "General Dentistry",
            icon: "fa-stethoscope",
            description: "Fillings, extractions, cleaning, and preventive dental care.",
            price: "Starting ₹500"
        }
    ],
    
    // Patient Reviews
    reviews: [
        {
            name: "Priya Sharma",
            rating: 5,
            text: "Best dental experience ever! Dr. Snehal is so gentle and caring. Highly recommended!",
            date: "2024-01-15"
        },
        {
            name: "Rahul Mehta",
            rating: 5,
            text: "Got my implants done here. Very professional and painless procedure. Thank you doctor!",
            date: "2024-01-10"
        },
        {
            name: "Anjali Patel",
            rating: 5,
            text: "My kids actually love coming here! The clinic is very child-friendly.",
            date: "2023-12-20"
        }
    ],
    
    // Images (Path to images folder)
    images: {
        logo: "assets/images/logo.png",
        doctor: "assets/images/doctor.jpg",
        clinic: "assets/images/clinic.jpg",
        favicon: "assets/icons/favicon.png"
    },
    
    // Features Toggle
    features: {
        enableBooking: true,
        enableWhatsApp: true,
        enableCall: true,
        enableReviews: true,
        enableServices: true,
        enableMap: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}
