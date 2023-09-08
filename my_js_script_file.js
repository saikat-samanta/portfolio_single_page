// https://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx
"use strict";

////////////// # selecting elements //////////////////
const logo = document.getElementById("portfolio_logo");
const navBar = document.querySelector(".navbar");
const typeEl = document.querySelector(".type");
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-item");
const footerYear = document.getElementById("cp-year");
const contactForm = document.getElementById("contact_form");
const formSubmitStatus = document.getElementById("email_response_status");
const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

////////////// # Updating console //////////////

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    console.info(
      `%c

┬ ┬┌─┐┬ ┬  ┌─┐┬─┐┌─┐
└┬┘│ ││ │  ├─┤├┬┘├┤ 
 ┴ └─┘└─┘  ┴ ┴┴└─└─┘
┬  ┬┬┌─┐┬ ┬┬┌┐┌┌─┐  
└┐┌┘│├┤ ││││││││ ┬  
 └┘ ┴└─┘└┴┘┴┘└┘└─┘  
                   
╔═╗┌─┐┬┬┌─┌─┐┌┬┐┌─┐      
╚═╗├─┤│├┴┐├─┤ │ └─┐      
╚═╝┴ ┴┴┴ ┴┴ ┴ ┴ └─┘      
╔═╗┌─┐┬─┐┌┬┐┌─┐┌─┐┬  ┬┌─┐
╠═╝│ │├┬┘ │ ├┤ │ ││  ││ │
╩  └─┘┴└─ ┴ └  └─┘┴─┘┴└─┘
        
%c 🥳 🥳 🥳`,
      "color: blue",
      "font-size: 30px"
    );
  }
});

//////////// # Inserting Footer year ///////////////

footerYear.innerText = new Date().getFullYear();

////////////// # On window load ////////////////

window.onload = (ev) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.location.hash = "";
  document.getElementById("nav_banner").classList.add("active");
};

////////////// # Initialize AOS ////////////////
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 0, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: "ease-in-out", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: true, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-center", // defines which position of the element regarding to window should trigger the animation
});

////////////// # On document load ////////////////

document.addEventListener("DOMContentLoaded", (ev) => {
  const darkModeState = localStorage.getItem("isDarkMode");
  document.getElementById("dark_mode").checked = JSON.parse(darkModeState);
  setDarkMode();
});

////////////// # On window scroll ////////////////

window.onscroll = () => {
  let current = "banner";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 1) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.getAttribute("id") === `nav_${current}`) {
      li.classList.add("active");
    }
  });
};

//////////// # add classes on starting /////////////////

function initialization() {
  logo.setAttribute("src", "./assets/Saikat_dark.png");
  navBar.classList.add(...["bg-light", "navbar-light"]);
  let isDark = localStorage.getItem("isDarkMode");
  if (!isDark) {
    localStorage.setItem("isDarkMode", "true");
  }
}
initialization();

////////////// # Handle dark mode ///////////////////

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

////////////////// # Typing animation ////////////////////

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

//////////// # carousal //////////
nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});

//////////// # Send message ////////////

function sendEmail(data) {
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    formSubmitStatus.setAttribute(
      "style",
      "background-color: red;color: white;width: max-content;padding: 0 5px; margin: 0 5px;"
    );
    formSubmitStatus.innerText = "Please fill all required fields.";
    return;
  }
  fetch("https://formspree.io/f/maykzywj", {
    method: "POST",
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
    }),
  })
    .then(() => {
      formSubmitStatus.setAttribute(
        "style",
        "background-color: green;color: white;width: max-content;padding: 0 5px;margin: 0 5px;"
      );
      formSubmitStatus.innerText = "Submitted successfully.";
      contactForm.reset();
    })
    .catch((error) => {
      formSubmitStatus.setAttribute(
        "style",
        "background-color: red;color: white;width: max-content;padding: 0 5px; margin: 0 5px;"
      );
      formSubmitStatus.innerText = "Form submission failed.";
      console.error(error);
    });
}

//////////// # Form submit ////////////
contactForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const contactDetails = {
    name: `${
      formData.get("first_name") ? formData.get("first_name") + " " : ""
    }${formData.get("last_name")}`,
    email: formData.get("my_email"),
    message: formData.get("message"),
  };
  const hiddenData = formData.get("email");
  if (hiddenData) {
    console.log("Don't spamming mother f**ker.");
    return;
  }
  sendEmail(contactDetails);
  console.log(contactDetails);
});
