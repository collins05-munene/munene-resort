document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.getElementById("navMenu");
  
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !expanded);
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    let scrollAmount = 0;

    setInterval(() => {
      scrollAmount += carousel.clientWidth;

      if (scrollAmount >= carousel.scrollWidth) {
        scrollAmount = 0;
      }

      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 4000); // scroll every 4 seconds
  });

//lightbox
  document.querySelectorAll(".lightbox-img").forEach(img => {
    img.addEventListener("click", () => {
      const lightbox = document.createElement("section");
      lightbox.classList.add("lightbox");

      const fullImg = document.createElement("img");
      fullImg.src = img.src;
      lightbox.appendChild(fullImg);

      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      closeBtn.classList.add("close-btn");
      lightbox.appendChild(closeBtn);

      document.body.appendChild(lightbox);

      closeBtn.addEventListener("click", () => {
        lightbox.remove();
      });

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          lightbox.remove();
        }
      });
    });
  });

//Bookings
// Initialize EmailJS
emailjs.init("CcAtz8ydslI-FLsgP"); // Replace with your EmailJS user ID

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const formData = new FormData(this); // Get form data
  const bookingDetails = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
      phone: formData.get("phone"),
    visitors: formData.get("visitors"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    roomType: formData.get("roomType"),
    service: formData.get("service")
  };
  console.log(bookingDetails);

  emailjs.send("service_firlv5m", "template_36rilif", bookingDetails)
    .then(function(response) {
      console.log("Email sent successfully:", response);
      // Show success message
      document.getElementById("bookingMessage").innerText = "Booking details sent successfully!";
    })
    .catch(function(error) {
      console.log("Error sending email:", error);
      // Show error message
      document.getElementById("bookingMessage").innerText = "Oops! Something went wrong.";
    });
});
