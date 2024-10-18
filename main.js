document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const formData = {
      to: "andreannrdn@gmail.com", // Ganti dengan email Anda
      name: name,
      subject: subject,
      text: message,
    };

    fetch("https://lumoshive-academy-email-api.vercel.app/send-email", {
      method: "POST",
      headers: {
        "x-api-key": "RJS1-202402", // Ganti dengan x-api-key Anda yang valid
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json()) // Hanya mengembalikan respons sebagai JSON
      .then((data) => {
        document.getElementById("contact-form").reset();
        Swal.fire({
          title: "Message Sent Successfully!",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
          background: "crimson", // Ganti dengan warna latar belakang pop-up
          color: "white",
          confirmButtonText: "Okay",
        });
        // alert("Message sent successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Failed to Send Message. Please Try Again Later.",
          showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
          },
          hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
          },
        });
        // alert("Failed to Send Message. Please Try Again Later.");
      });
  });

document.addEventListener("DOMContentLoaded", function () {
  // Mengambil elemen yang diperlukan
  const slides = document.querySelectorAll('input[name="slider"]');
  let currentSlide = 0;
  let slideInterval;

  // Fungsi untuk pindah ke slide berikutnya
  function nextSlide() {
    slides[currentSlide].checked = false;
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].checked = true;
  }

  // Fungsi untuk memulai autoplay
  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 6000); // Ganti slide setiap 6 detik
  }

  // Fungsi untuk menghentikan autoplay
  function stopAutoplay() {
    clearInterval(slideInterval);
  }

  // Event listener untuk hover
  const testimonialContainer = document.querySelector(".testimonial-container");
  testimonialContainer.addEventListener("mouseenter", stopAutoplay);
  testimonialContainer.addEventListener("mouseleave", startAutoplay);

  // Event listener untuk radio buttons
  slides.forEach((slide, index) => {
    slide.addEventListener("change", () => {
      currentSlide = index;
      stopAutoplay();
      startAutoplay();
    });
  });

  // Event listener untuk label navigasi
  const navigationLabels = document.querySelectorAll(".navigation label");
  navigationLabels.forEach((label, index) => {
    label.addEventListener("click", () => {
      currentSlide = index;
      slides[currentSlide].checked = true;
      stopAutoplay();
      startAutoplay();
    });
  });

  // Mulai autoplay saat halaman dimuat
  startAutoplay();
});
