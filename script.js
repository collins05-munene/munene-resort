
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





  const form = document.getElementById("booking-form");
  const popup = document.getElementById("confirmation-popup");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    })
      .then(response => {
        if (response.ok) {
          form.reset();
          popup.style.display = "block";
          setTimeout(() => popup.style.display = "none", 7000);
        } else {
          alert("There was an error. Please try again.");
        }
      })
      .catch(() => {
        alert("Network error. Please try again.");
      });
  });

