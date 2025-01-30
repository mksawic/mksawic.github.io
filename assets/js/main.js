const sections = {
  home: "home",
  about: "about",
  experience: "experience",
  projects: "projects",
  contact: "contact",
};

const { home, about, experience, projects, contact } = sections;
const anchors = [home, about, experience, projects, contact];

function loadParticles() {
  particlesJS.load("particles-js", "assets/js/particles.json");
}

function loadContactForm() {
  const form = document.getElementById("form");
  const result = document.getElementById("result");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const data = await response.json();

      if (response.status == 200) {
        form.reset();
        result.innerHTML = data.message;
      } else {
        result.innerHTML = data.message;
      }
    } catch (e) {
      result.innerHTML = "Something went wrong!";
    }
  });
}

function loadFullpage() {
  new fullpage("#fullpage", {
    anchors,
    scrollOverflow: true,
    scrollOverflowMacStyle: true,
    licenseKey: "X5NE8-X4I0J-JH956-JAT86-OKVCN",
    controlArrowsHTML: [
      '<div class="slide-arrow"></div>',
      '<div class="slide-arrow"></div>',
    ],
    credits: {
      enabled: false,
    },
    onLeave: function (_, destination) {
      const preventAnimationItems =
        destination.item.querySelectorAll(".animate__prevent");

      if (preventAnimationItems.length) {
        preventAnimationItems.forEach((item) => {
          item.classList.remove("animate__prevent");
        });
      }

      if (destination.anchor === experience) {
        const techsCards =
          destination.item.querySelectorAll(".experience__card");
        if (techsCards.length) {
          techsCards.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add("animate__fadeInRight");
            }, i * 50);
          });
        }
      }

      if (destination.anchor === contact) {
        loadContactForm();
      }
    },
  });
}

document
  .getElementById("fullpage-script")
  .addEventListener("load", loadFullpage);
document
  .getElementById("particles-script")
  .addEventListener("load", loadParticles);
