  // Animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const animateElements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            animateElements.forEach(element => {
                observer.observe(element);
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Header scroll effect
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 100) {
                    header.style.padding = '15px 0';
                    header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
                } else {
                    header.style.padding = '20px 0';
                    header.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
                }
                
                // Update active nav link based on scroll position
                const sections = document.querySelectorAll('section');
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 150) {
                        current = section.getAttribute('id');
                    }
                });
                
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });
            
             document.addEventListener('DOMContentLoaded', function() {
            // Add Education link to navigation
            const navLinks = document.querySelector('.nav-links');
            const educationLink = document.createElement('a');
            educationLink.href = '#education';
            educationLink.textContent = 'Education';
            navLinks.insertBefore(educationLink, navLinks.querySelector('a[href="#portfolio"]'));
            
            
            const timelineItems = document.querySelectorAll('.timeline-item');
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            timelineItems.forEach(item => {
                timelineObserver.observe(item);
            });
        });
            // Resume download button
            document.getElementById('downloadResume').addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create a temporary download link
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/file/d/178myCYFgpvhlg5SyN__K9OBvVEeVOD4X/view?usp=drive_link'; // In a real scenario, link to your resume file
                link.download = 'sohamResume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show download confirmation
                this.innerHTML = '<i class="fas fa-check"></i> Resume Downloaded!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-download"></i> My Resume';
                }, 2000);
            });
        });

       document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const result = document.getElementById('result');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let jsonResponse = await response.json();
        if (response.status == 200) {
            // Show success message
            result.innerHTML = `
                <div style="
                    background: #d4edda;
                    color: #155724;
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                ">
                    <i class="fas fa-check-circle" style="font-size: 24px; margin-right: 15px;"></i>
                    <div>
                        <h3 style="margin: 0 0 5px 0;">Message Sent Successfully!</h3>
                        <p style="margin: 0;">Thank you for your message. I'll get back to you soon.</p>
                    </div>
                </div>
            `;
            
            // Reset form
            form.reset();
        } else {
            result.innerHTML = `
                <div style="
                    background: #f8d7da;
                    color: #721c24;
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 20px;
                ">
                    <i class="fas fa-exclamation-circle"></i> Error: ${jsonResponse.message || 'Failed to send message'}
                </div>
            `;
        }
    })
    .catch(error => {
        result.innerHTML = `
            <div style="
                background: #f8d7da;
                color: #721c24;
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
            ">
                <i class="fas fa-exclamation-circle"></i> Network error. Please try again.
            </div>
        `;
    })
    .finally(() => {
        // Re-enable button and restore original text
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        
        // Scroll to result message
        result.scrollIntoView({behavior: 'smooth', block: 'center'});
        
        // Auto-hide message after 8 seconds
        setTimeout(() => {
            result.style.opacity = '1';
            const fadeOut = setInterval(() => {
                if (result.style.opacity > 0) {
                    result.style.opacity -= 0.05;
                } else {
                    clearInterval(fadeOut);
                    result.innerHTML = '';
                    result.style.opacity = '1';
                }
            }, 100);
        }, 8000);
    });
});
    
