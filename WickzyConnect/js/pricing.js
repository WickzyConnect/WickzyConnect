const pricingPlans = [
    {
        name: "Basic Support",
        monthlyPrice: 49,
        annualPrice: 39,
        description: "Perfect for home users",
        features: [
            "Remote PC Support",
            "Basic Virus Protection",
            "Monthly System Checkup",
            "Email Support",
            "2 Hours On-Site Support/Month"
        ],
        isPopular: false
    },
    {
        name: "Professional",
        monthlyPrice: 99,
        annualPrice: 79,
        description: "Ideal for small businesses",
        features: [
            "Everything in Basic",
            "Priority Remote Support",
            "Network Management",
            "Weekly System Checkup",
            "5 Hours On-Site Support/Month",
            "24/7 Phone Support"
        ],
        isPopular: true
    },
    {
        name: "Enterprise",
        monthlyPrice: 199,
        annualPrice: 159,
        description: "For growing businesses",
        features: [
            "Everything in Professional",
            "Dedicated Support Team",
            "Custom Solutions",
            "Daily System Monitoring",
            "15 Hours On-Site Support/Month",
            "Hardware Procurement",
            "Security Audits"
        ],
        isPopular: false
    }
];

function createPricingCard(plan) {
    const card = document.createElement('div');
    card.className = `pricing-card${plan.isPopular ? ' popular' : ''}`;

    if (plan.isPopular) {
        const popularBadge = document.createElement('div');
        popularBadge.className = 'popular-badge';
        popularBadge.textContent = 'Most Popular';
        card.appendChild(popularBadge);
    }

    const header = document.createElement('div');
    header.className = 'pricing-header';
    header.innerHTML = `
        <h3>${plan.name}</h3>
        <div class="price">
            <span class="currency">€</span>
            <span class="amount monthly">${plan.monthlyPrice}</span>
            <span class="amount annual">${plan.annualPrice}</span>
            <span class="period">/month</span>
        </div>
        <p>${plan.description}</p>
    `;

    const features = document.createElement('div');
    features.className = 'pricing-features';
    features.innerHTML = `
        <ul>
            ${plan.features.map(feature => `
                <li><i class="fas fa-check"></i> ${feature}</li>
            `).join('')}
        </ul>
    `;

    const cta = document.createElement('div');
    cta.className = 'pricing-cta';
    cta.innerHTML = `
        <a href="booking.html" class="cta-button">Get Started</a>
    `;

    card.appendChild(header);
    card.appendChild(features);
    card.appendChild(cta);

    return card;
}

function initializePricing() {
    const pricingGrid = document.querySelector('.pricing-grid');
    pricingPlans.forEach(plan => {
        const card = createPricingCard(plan);
        pricingGrid.appendChild(card);
    });

    // Initialize monthly/annual toggle
    const billingToggle = document.createElement('div');
    billingToggle.className = 'pricing-toggle';
    billingToggle.innerHTML = `
        <span>Monthly</span>
        <label class="switch">
            <input type="checkbox" id="billing-toggle">
            <span class="slider round"></span>
        </label>
        <span>Annual</span>
        <div class="save-badge">Save 20%</div>
    `;
    pricingGrid.parentElement.insertBefore(billingToggle, pricingGrid);

    // Add toggle functionality
    const toggle = document.getElementById('billing-toggle');
    toggle.addEventListener('change', function() {
        document.body.classList.toggle('annual-billing', this.checked);
    });
}

document.addEventListener('DOMContentLoaded', initializePricing);
