AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 100, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: "ease-in-out", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: true, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-center", // defines which position of the element regarding to window should trigger the animation
});
/* selecting elements */
const logo = document.getElementById("portfolio_logo");
const navBar = document.querySelector(".navbar");
const typeEl = document.querySelector(".type");

document.addEventListener("DOMContentLoaded", (ev) => {
  const darkModeState = localStorage.getItem("isDarkMode");
  document.getElementById("dark_mode").checked = JSON.parse(darkModeState);
  setDarkMode();
});

/* add classes on starting */
function initialization() {
  logo.setAttribute("src", "./assets/Saikat_dark.png");
  navBar.classList.add(...["bg-light", "navbar-light"]);
}
initialization();

/* Handle dark mode */
function setDarkMode() {
  const checkBox = document.getElementById("dark_mode");
  localStorage.setItem("isDarkMode", checkBox.checked);
  if (checkBox.checked === true) {
    logo.setAttribute("src", "./assets/Saikat_light.png");
    navBar.classList.remove(...["bg-light", "navbar-light"]);
    navBar.classList.add(...["bg-dark", "navbar-dark"]);
    document.body.classList.add("dark_mode");
  } else {
    navBar.classList.remove(...["bg-dark", "navbar-dark"]);
    initialization();
    document.body.classList.remove("dark_mode");
  }
}

/* Typing animation */
const contentArr = ["Developer", "Designer", "Freelancer"];
let textString;
let flag = false;
let index = 0;
let speed = 400;

let i = 0;
const typing = () => {
  if (flag) {
    textString = contentArr[index].substring(0, i);
    typeEl.textContent = textString;
    i--;
    if (textString === "") {
      flag = false;
      speed *= 8;
      if (index >= 0 && index < 2) {
        index++;
      } else if (index === 2) {
        index = 0;
      }
    }
  } else {
    textString = contentArr[index].substring(0, i);
    typeEl.textContent = textString;
    i++;
    if (textString === contentArr[index]) {
      flag = true;
      speed /= 8;
    }
  }
};

var myVar = setInterval(typing, speed);
