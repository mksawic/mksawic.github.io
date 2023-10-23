/*!
 * Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // Calculate time period overall
  const firstJobDate = new Date(2020, 8, 1);
  const experiencePeriodElement =
    document.body.querySelector("#experience-period");
  if (experiencePeriodElement) {
    const currentDate = new Date();
    const months = monthDiff(firstJobDate, currentDate);
    const years = Math.floor(months / 12);
    const yearsText = years ? `${years}y ` : "";
    const monthsText = months % 12 ? `${months % 12}m` : "";
    experiencePeriodElement.textContent = `(${yearsText}${monthsText})`;
  }

  // Calculate time period for last job
  const lastJobDate = new Date(2022, 5, 1);
  const timePeriodElement = document.body.querySelector("#time-period");
  if (timePeriodElement) {
    const currentDate = new Date();
    const months = monthDiff(lastJobDate, currentDate);
    const years = Math.floor(months / 12);
    const yearsText = years ? `${years}y ` : "";
    const monthsText = months % 12 ? `${months % 12}m` : "";
    timePeriodElement.textContent = `(${yearsText}${monthsText})`;
  }

  const nameInput = document.body.querySelector("input#name");
  const invalidName = document.body.querySelector("div#invalid-name");
  if (nameInput && invalidName) {
    nameInput.addEventListener("input", (e) => {
      invalidName.style.display = e.target.value === "" ? "block" : "none";
    });
  }

  const emailInput = document.body.querySelector("input#email");
  const requiredEmail = document.body.querySelector("div#required-email");
  const invalidEmail = document.body.querySelector("div#invalid-email");
  if (emailInput && invalidEmail) {
    emailInput.addEventListener("input", (e) => {
      invalidEmail.style.display = "none";
      requiredEmail.style.display = e.target.value === "" ? "block" : "none";
    });
    emailInput.addEventListener("blur", (e) => {
      invalidEmail.style.display = emailInput.validity.typeMismatch
        ? "block"
        : "none";
    });
  }

  const messageInput = document.body.querySelector("textarea#message");
  const invalidMessage = document.body.querySelector("div#invalid-message");
  if (messageInput && invalidMessage) {
    messageInput.addEventListener("input", (e) => {
      invalidMessage.style.display = e.target.value === "" ? "block" : "none";
    });
  }

  const contactForm = document.querySelector("form#form");
  const submitButton = document.querySelector("button#submitButton");
  const spinner = submitButton.firstElementChild;
  const successMessage = document.querySelector("#submitSuccessMessage");
  const errorMessage = document.querySelector("#submitErrorMessage");
  if (contactForm && submitButton) {
    contactForm.addEventListener("input", (e) => {
      if (!contactForm.checkValidity()) {
        submitButton.classList.add("disabled");
        submitButton.setAttribute("disabled", "");
      } else {
        submitButton.classList.remove("disabled");
        submitButton.removeAttribute("disabled");
      }
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      submitButton.classList.add("disabled");
      submitButton.setAttribute("disabled", "");
      spinner.classList.remove("d-none");

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(() => {
          errorMessage.classList.add("d-none");
          successMessage.classList.remove("d-none");
          form.reset();
          submitButton.classList.add("disabled");
          submitButton.setAttribute("disabled", "");
        })
        .catch(() => {
          errorMessage.classList.remove("d-none");
          successMessage.classList.add("d-none");
          submitButton.classList.remove("disabled");
          submitButton.removeAttribute("disabled");
        })
        .finally(() => {
          spinner.classList.add("d-none");
        });
    });
  }
});

function monthDiff(dateFrom, dateTo) {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
}
