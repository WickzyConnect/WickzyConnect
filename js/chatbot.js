// Chatbot functionality
class Chatbot {
    constructor() {
        this.widget = document.getElementById('chatbot-widget');
        this.body = this.widget.querySelector('.chatbot-body');
        this.options = this.widget.querySelector('.chatbot-options');
        this.isOpen = false;
        this.conversations = {
            start: {
                message: "Hello! How can I help you today?",
                options: [
                    { text: "Tell me about your services", next: "services" },
                    { text: "How do I book a service?", next: "booking" },
                    { text: "What are your prices?", next: "pricing" },
                    { text: "Where are you located?", next: "location" }
                ]
            },
            services: {
                message: "We offer various tech services including:",
                options: [
                    { text: "Smart Home Installation", next: "smart-home" },
                    { text: "Computer Repairs", next: "computer" },
                    { text: "Phone & Network Support", next: "phone-network" },
                    { text: "Go back to main menu", next: "start" }
                ]
            },
            "smart-home": {
                message: "Our smart home services include Ring camera installation, smart device setup, and broadband configuration. Would you like to:",
                options: [
                    { text: "Book a service", next: "booking" },
                    { text: "See pricing", next: "pricing" },
                    { text: "Go back to services", next: "services" }
                ]
            },
            computer: {
                message: "We offer both hardware and software computer repairs. Would you like to:",
                options: [
                    { text: "Book a repair", next: "booking" },
                    { text: "See pricing", next: "pricing" },
                    { text: "Go back to services", next: "services" }
                ]
            },
            "phone-network": {
                message: "We can help with phone software issues and network optimization. Would you like to:",
                options: [
                    { text: "Book a service", next: "booking" },
                    { text: "See pricing", next: "pricing" },
                    { text: "Go back to services", next: "services" }
                ]
            },
            booking: {
                message: "Booking a service is easy! You can:",
                options: [
                    { text: "Use our online booking system", next: "online-booking" },
                    { text: "Contact us directly", next: "contact" },
                    { text: "Go back to main menu", next: "start" }
                ]
            },
            "online-booking": {
                message: "You can book a service using our calendar system above. Just scroll up to the 'Book Now' section and:",
                options: [
                    { text: "1. Select a date", next: "booking-steps" },
                    { text: "Go back to booking options", next: "booking" }
                ]
            },
            "booking-steps": {
                message: "Then:",
                options: [
                    { text: "2. Choose a time slot", next: "booking-final" }
                ]
            },
            "booking-final": {
                message: "Finally:",
                options: [
                    { text: "3. Fill in your details and submit!", next: "start" }
                ]
            },
            pricing: {
                message: "Our prices are competitive (5% below market average). Standard services range from €40-€85. Would you like to:",
                options: [
                    { text: "See detailed pricing", next: "pricing-details" },
                    { text: "Book a service", next: "booking" },
                    { text: "Go back to main menu", next: "start" }
                ]
            },
            "pricing-details": {
                message: "Here are our standard prices:\n- Ring Camera Installation: €75\n- Computer Repair: €65\n- Smart Home Setup: €85\n- Broadband Setup: €45\n- Phone Software Repair: €55\n- General Tech Support: €40/hour",
                options: [
                    { text: "Book a service", next: "booking" },
                    { text: "Go back to pricing", next: "pricing" }
                ]
            },
            location: {
                message: "We're based in Waterford City, Ireland. We provide services throughout the city and surrounding areas.",
                options: [
                    { text: "Book a service", next: "booking" },
                    { text: "Go back to main menu", next: "start" }
                ]
            },
            contact: {
                message: "You can reach us through:\n- Our booking system above\n- Phone: [Your Phone Number]\n- Email: [Your Email]",
                options: [
                    { text: "Go back to main menu", next: "start" }
                ]
            }
        };

        this.init();
    }

    init() {
        // Add chat toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'chat-toggle';
        toggleButton.innerHTML = '<i class="fas fa-comments"></i>';
        document.body.appendChild(toggleButton);

        // Event listeners
        toggleButton.addEventListener('click', () => {
            this.toggleChat();
            if (this.isOpen) {
                toggleButton.classList.add('hidden');
            } else {
                toggleButton.classList.remove('hidden');
            }
        });

        document.getElementById('close-chat').addEventListener('click', () => {
            this.toggleChat();
            setTimeout(() => {
                toggleButton.classList.remove('hidden');
            }, 100);
        });

        // Show initial message
        this.showConversation('start');
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.widget.style.display = 'block';
            setTimeout(() => {
                this.widget.style.opacity = '1';
                this.widget.style.transform = 'translateY(0)';
            }, 10);
        } else {
            this.widget.style.opacity = '0';
            this.widget.style.transform = 'translateY(20px)';
            setTimeout(() => {
                this.widget.style.display = 'none';
            }, 300);
        }
    }

    handleAction(action) {
        switch (action) {
            case 'booking':
                window.location.href = 'booking.html';
                break;
            case 'online-booking':
                window.location.href = 'booking.html#calendar-booking';
                break;
            case 'pricing':
                window.location.href = 'services.html#pricing';
                break;
            case 'contact':
                window.location.href = 'contact.html';
                break;
            default:
                return false;
        }
        return true;
    }

    showConversation(conversationId, isUserMessage = false) {
        const conversation = this.conversations[conversationId];
        if (!conversation) return;

        if (isUserMessage) {
            // Add user's selection as a message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'chat-option';
            userMessageDiv.textContent = conversation.userSelection || 'Selected option';
            this.body.appendChild(userMessageDiv);
        }

        // Add bot message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        messageDiv.textContent = conversation.message;
        this.body.appendChild(messageDiv);

        // Scroll to bottom with smooth animation
        this.body.scrollTo({
            top: this.body.scrollHeight,
            behavior: 'smooth'
        });

        // Clear and add new options
        this.options.innerHTML = '';
        conversation.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'chat-option';
            button.textContent = option.text;
            button.addEventListener('click', () => {
                conversation.userSelection = option.text;
                
                // Check if we need to handle a redirect
                if (this.handleAction(option.next)) {
                    // Add a delay to show the user's selection before redirecting
                    const userMessageDiv = document.createElement('div');
                    userMessageDiv.className = 'chat-option';
                    userMessageDiv.textContent = option.text;
                    this.body.appendChild(userMessageDiv);
                    
                    setTimeout(() => {
                        const redirectMessage = document.createElement('div');
                        redirectMessage.className = 'chat-message';
                        redirectMessage.textContent = 'Redirecting you now...';
                        this.body.appendChild(redirectMessage);
                        
                        this.body.scrollTo({
                            top: this.body.scrollHeight,
                            behavior: 'smooth'
                        });
                    }, 500);
                } else {
                    this.showConversation(option.next, true);
                }
            });
            this.options.appendChild(button);
        });
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
