console.log("JEEVANA_CATALYSTLAB Platform Loaded");

// HERO BUTTON

const enterBtn = document.querySelector(".primary-btn");

enterBtn.addEventListener("click", () => {

  document.querySelector("#projects")
  .scrollIntoView({
    behavior: "smooth"
  });

});

// PROJECT BUTTONS

const projectButtons =
document.querySelectorAll(".project-card button");

projectButtons.forEach((button) => {

  button.addEventListener("click", () => {

    alert(
      "Detailed project ecosystems and research publications coming soon."
    );

  });

});

// COMMUNITY POSTS

const communityData = [

  {
    title: "Biomedical Research Collaboration",
    description:
      "Seeking interdisciplinary collaborators for healthcare innovation and translational research systems."
  },

  {
    title: "Engineering & Innovation Network",
    description:
      "Connecting engineers, developers, and researchers building future-focused intelligent systems."
  },

  {
    title: "Future of Learning Initiative",
    description:
      "Collaborative ecosystem for educators, innovators, and strategic thinkers transforming human learning."
  },

  {
    title: "Psychology & Cognitive Science Research",
    description:
      "Open collaborations for behavioral science, cognition, and human intelligence research."
  },

  {
    title: "Innovation & Entrepreneurship Network",
    description:
      "Connecting founders, researchers, creators, and innovators building meaningful systems."
  }

];

// LOAD FEED

const feedGrid =
document.querySelector(".feed-grid");

communityData.forEach((item) => {

  const card = document.createElement("div");

  card.classList.add("feed-card");

  card.innerHTML = `

    <h4>${item.title}</h4>

    <p>${item.description}</p>

  `;

  feedGrid.appendChild(card);

});

// SCROLL REVEAL

const sections =
document.querySelectorAll("section");

sections.forEach((section) => {

  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "all 1s ease";

});

window.addEventListener("scroll", () => {

  sections.forEach((section) => {

    const top = window.scrollY;

    const offset =
    section.offsetTop - 300;

    const height =
    section.offsetHeight;

    if(top > offset &&
       top < offset + height){

      section.style.opacity = "1";

      section.style.transform =
      "translateY(0px)";

    }

  });

});

// SHOW HERO

document.querySelector(".hero")
.style.opacity = "1";

document.querySelector(".hero")
.style.transform = "translateY(0px)";