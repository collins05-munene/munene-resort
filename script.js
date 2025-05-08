
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });


  const testimonials = document.querySelectorAll('.testimonial');
  let current = 0;

  function showNextTestimonial() {
    testimonials[current].classList.remove('active');
    current = (current + 1) % testimonials.length;
    testimonials[current].classList.add('active');
  }

  setInterval(showNextTestimonial, 4000); // 4 seconds

