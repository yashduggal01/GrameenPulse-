document.addEventListener('DOMContentLoaded', function() {
    // Handle form submissions for Gramin Samadhan
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
        complaintForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Collect form data
            const formData = new FormData(complaintForm);
            // Submit the form data via AJAX or Fetch API
            fetch('/api/complaints', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('Complaint submitted successfully!');
                // Optionally, reset the form or update the UI
                complaintForm.reset();
            })
            .catch(error => {
                console.error('Error submitting complaint:', error);
            });
        });
    }

    // Real-time progress tracker for submitted complaints
    function fetchComplaintProgress() {
        fetch('/api/complaints/progress')
        .then(response => response.json())
        .then(data => {
            // Update the UI with the progress data
            const progressContainer = document.getElementById('progressContainer');
            if (progressContainer) {
                progressContainer.innerHTML = ''; // Clear previous data
                data.forEach(complaint => {
                    const complaintElement = document.createElement('div');
                    complaintElement.textContent = `Complaint ID: ${complaint.id}, Status: ${complaint.status}`;
                    progressContainer.appendChild(complaintElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching complaint progress:', error);
        });
    }

    // Call the function to fetch complaint progress on page load
    fetchComplaintProgress();

    // One-tap SOS button functionality
    const sosButton = document.getElementById('sosButton');
    if (sosButton) {
        sosButton.addEventListener('click', function() {
            // Send SOS alert to local authorities
            fetch('/api/sos', {
                method: 'POST',
                body: JSON.stringify({ alert: 'SOS triggered!' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                alert('Emergency alert sent!');
            })
            .catch(error => {
                console.error('Error sending SOS alert:', error);
            });
        });
    }

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let index = 0;

    function showItem(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    prev.addEventListener('click', function() {
        index = (index > 0) ? index - 1 : items.length - 1;
        showItem(index);
    });

    next.addEventListener('click', function() {
        index = (index < items.length - 1) ? index + 1 : 0;
        showItem(index);
    });

    setInterval(function() {
        index = (index < items.length - 1) ? index + 1 : 0;
        showItem(index);
    }, 5000);

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    backToTopButton.addEventListener('click', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});