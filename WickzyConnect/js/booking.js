// Initialize EmailJS when the script loads
(function() {
    emailjs.init("gMpIlO-TtutA5J-pI"); // Your public API key
})();

window.onload = function() {
    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = {
            service: document.getElementById('service-type').value,
            description: document.getElementById('issue-description').value,
            name: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            preferredDate: document.getElementById('preferred-date').value,
            preferredTime: document.getElementById('preferred-time').value
        };

        // Send email using EmailJS
        emailjs.send('service_l27vh5b', 'template_sv412ad', {
            to_email: 'riowickham@icloud.com', // Replace with your email
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            service: formData.service,
            description: formData.description,
            address: formData.address,
            preferred_date: formData.preferredDate,
            preferred_time: formData.preferredTime
        })
        .then(function(response) {
            alert('Thank you for your booking request! We will contact you within 12 hours to discuss pricing and confirm your appointment.');
            document.getElementById('booking-form').reset();
        })
        .catch(function(error) {
            alert('Oops! Something went wrong. Please try again or contact us directly.');
            console.error('Error:', error);
        });
    });

    // Initialize flatpickr for date/time inputs
    flatpickr("#preferred-date", {
        minDate: "today",
        dateFormat: "Y-m-d"
    });

    flatpickr("#preferred-time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        minTime: "09:00",
        maxTime: "18:00"
    });
};
