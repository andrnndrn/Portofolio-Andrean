document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const formData = {
      to: "andreannrdn@gmail.com",
      name: name,
      subject: subject,
      text: message,
    };

    function showAlert(title) {
      Swal.fire({
        title: title,
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
        background: "crimson",
        color: "white",
        confirmButtonText: "Okay",
      });
    }

    fetch("https://lumoshive-academy-email-api.vercel.app/send-email", {
      method: "POST",
      headers: {
        "x-api-key": "RJS1-202402",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            let errorMessage;

            switch (response.status) {
              case 400:
                errorMessage = "Bad Request. Please check your input.";
                break;
              case 500:
                errorMessage = "Internal Server Error. Please try again later.";
                break;
              default:
                errorMessage = `Error: ${errorData.message}`;
            }
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then(() => {
        document.getElementById("contact-form").reset();
        showAlert("Message Sent Successfully!");
      })
      .catch((error) => {
        // console.error("Error:", error);
        showAlert(error.message);
      });
  });


// untuk slider testimonial
document.addEventListener("DOMContentLoaded", function () {
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
