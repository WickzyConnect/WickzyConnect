// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger?.contains(e.target) && !navLinks?.contains(e.target)) {
        navLinks?.classList.remove('active');
        const spans = hamburger?.querySelectorAll('span');
        spans?.forEach(span => span.classList.remove('active'));
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Pricing Data (based on national average -5%)
const pricingData = [
    // Online Services
    {
        service: 'Website Development',
        price: 'From €299',
        description: 'Professional business website development'
    },
    {
        service: 'Remote Tech Support',
        price: '€35/hour',
        description: 'Remote technical assistance and troubleshooting'
    },
    {
        service: 'Business Digital Setup',
        price: 'From €149',
        description: 'Complete business digital presence setup'
    },
    {
        service: 'Social Media Setup',
        price: '€99',
        description: 'Professional social media profile setup'
    },
    
    // In-Person Services
    {
        service: 'Phone Software Repair',
        price: '€55',
        description: 'Software issues and system optimization'
    },
    {
        service: 'Ring Camera Installation',
        price: '€75',
        description: 'Professional installation and setup'
    },
    {
        service: 'PC Repair Service',
        price: 'From €65',
        description: 'Hardware and software repairs'
    },
    {
        service: 'Smart Home Setup',
        price: '€85',
        description: 'Complete smart device configuration'
    },
    
    // Hybrid Services
    {
        service: 'Tech Training',
        price: '€45/hour',
        description: 'Personal or group technology training'
    },
    {
        service: 'Cyber Security Training',
        price: '€199',
        description: 'Comprehensive security awareness course'
    },
    {
        service: 'Custom PC Build',
        price: 'From €499',
        description: 'Custom-built PC to your specifications'
    },
    
    // Trade-In & Recycling
    {
        service: 'Computer Trade-In',
        price: 'Up to €200',
        description: 'Cash or credit for your old computer'
    }
];

// Populate Pricing Cards
function populatePricing() {
    const pricingGrid = document.querySelector('.pricing-grid');
    
    pricingData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'service-card pricing-card';
        card.innerHTML = `
            <h3>${item.service}</h3>
            <div class="price">${item.price}</div>
            <p>${item.description}</p>
            <a href="#booking" class="cta-button">Book Now</a>
        `;
        pricingGrid.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populatePricing();
});
