
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

const roomPrices = {
  "Deluxe Ocean View": 1500,
  "Private Villa": 3000,
  "Family Suite": 4000,
  "Penthouse": 5000,
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const roomType = document.getElementById("room-type").value;
  const checkIn = new Date(document.getElementById("check-in").value);
  const checkOut = new Date(document.getElementById("check-out").value);

  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  if (nights <= 0) {
    alert("❌ Check-out must be after check-in.");
    return;
  }

  const amount = roomPrices[roomType] * nights;

  const confirmPay = confirm(`Total payment is KES ${amount}. Proceed with payment?`);
  if (!confirmPay) return;

  try {
    const res = await fetch("https://4efa-154-159-252-58.ngrok-free.app/api/stkpush", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, amount })
    });

    const data = await res.json();

    if (data.data?.ResponseCode === "0") {
      popup.style.display = "block";
      setTimeout(() => popup.style.display = "none", 7000);
      setTimeout(() => form.submit(), 7000); // You can send form to FormSubmit after 7s
    } else {
      alert("❌ Payment failed: " + (data.data?.ResponseDescription || data.message));
    }
  } catch (error) {
    console.error(error);
    alert("❌ Network error. Try again.");
  }
});
