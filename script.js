// NAVIGATION
document.querySelector(".menu-toggle").addEventListener("click", function () {
  const menuContainer = document.querySelector(".menu-container");
  const isOpen = menuContainer.classList.toggle("open");

  // Set aria-expanded based on the menu state
  this.setAttribute("aria-expanded", isOpen);

  // Toggle between the burger and X icon
  if (isOpen) {
    this.innerHTML = "&#10006;"; // X icon when the menu is open
  } else {
    this.innerHTML = "&#9776;"; // Burger icon when the menu is closed
  }
});

// SLIDESHOW
let slideIndex = 0;
showSlides(slideIndex);

function changeSlide(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");

  if (n >= slides.length) {
    slideIndex = 0;
  } else if (n < 0) {
    slideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

// REVIEWS SLIDE
const carousel = document.getElementById("carousel");
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
let itemsToShow = 3;
let index = 0;

function updateItemsToShow() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    itemsToShow = 1;
  } else if (screenWidth <= 1200) {
    itemsToShow = 2;
  } else {
    itemsToShow = 3;
  }
}

function updateCarousel() {
  items.forEach((item, i) => {
    item.classList.remove("center");
    if (i >= index && i < index + itemsToShow) {
      if (i === index + Math.floor(itemsToShow / 2)) {
        item.classList.add("center");
      }
    }
  });
  carousel.style.transform = `translateX(-${index * (100 / itemsToShow)}%)`;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (index < totalItems - itemsToShow) {
    index++;
  } else {
    carousel.style.transition = "none";
    index = 0;
    carousel.style.transform = `translateX(0%)`;
    carousel.offsetHeight;
    carousel.style.transition = "transform 0.5s ease-in-out";
    index++;
  }
  updateCarousel();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    carousel.style.transition = "none";
    index = totalItems - itemsToShow;
    carousel.style.transform = `translateX(-${index * (100 / itemsToShow)}%)`;
    carousel.offsetHeight;
    carousel.style.transition = "transform 0.5s ease-in-out";
    index--;
  }
  updateCarousel();
});

window.addEventListener("resize", () => {
  updateItemsToShow();
  updateCarousel();
});

// Inicijalno postavljanje
updateItemsToShow();
updateCarousel();

// FLATPICKR
document.addEventListener("DOMContentLoaded", function () {
  // Funkcija za prilagođavanje broja prikazanih mjeseci ovisno o širini ekrana
  const adjustCalendarDisplay = () => {
    let monthsToShow = 4; // Zadano četiri mjeseca za velike ekrane

    if (window.innerWidth <= 1024) {
      monthsToShow = 2; // Dva mjeseca za tablete
    }

    if (window.innerWidth <= 768) {
      monthsToShow = 1; // Jedan mjesec za mobitele
    }

    flatpickr("#flatpickr", {
      enableTime: false,
      dateFormat: "Y-m-d",
      minDate: "today",
      mode: "range",
      showMonths: monthsToShow, // Broj mjeseci prilagođen veličini ekrana
      inline: true,
      locale: {
        firstDayOfWeek: 1, // Tjedan počinje ponedjeljkom
      },
    });
  };

  adjustCalendarDisplay(); // Pokreni funkciju prilikom učitavanja

  // Prilagodi broj mjeseci pri promjeni veličine prozora
  window.addEventListener("resize", adjustCalendarDisplay);
});
