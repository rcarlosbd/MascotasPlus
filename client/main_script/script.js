document
  .querySelector("button.button-menu-toggle")
  .addEventListener("click", function () {
    const navbar = document.querySelector(".nav-links");
    navbar.classList.toggle("nav-links-responsive");
  });

const menuToggleButton = document.getElementById("menu-toggle");
const navbar = document.querySelector(".nav-links");

menuToggleButton.addEventListener("click", function () {
  this.classList.toggle("open");

  const menuToggleIcons = document.querySelectorAll(".menu-toggle-icon");
  menuToggleIcons.forEach((icon) => {
    if (this.classList.contains("open")) {
      icon.style.borderRadius = "0";
    } else {
      icon.style.borderRadius = "0";
    }
  });
});

const navLinks = document.querySelectorAll(".nav-links li a");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navbar.classList.remove("nav-links-responsive");
    menuToggleButton.classList.remove("open");
  });
});















