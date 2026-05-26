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

// CONNECTOR BUTTONS

const connectorButtons =
document.querySelectorAll(".connector-btn");

connectorButtons.forEach((button) => {

  button.addEventListener("click", () => {

    document.querySelector("#collab")
    .scrollIntoView({
      behavior: "smooth"
    });

  });

});

// IDEA BUTTONS

const ideaButtons =
document.querySelectorAll(".idea-btn");

ideaButtons.forEach((button) => {

  button.addEventListener("click", () => {

    document.querySelector("#collab")
    .scrollIntoView({
      behavior: "smooth"
    });

  });

});

// COLLABORATION FORM

const collabForm = document.getElementById("collab-form");
const collabStatus = document.getElementById("collab-status");

collabForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("collab-submit");
  const data = Object.fromEntries(new FormData(collabForm));
  btn.disabled = true;
  btn.textContent = "SENDING...";
  collabStatus.textContent = "";
  collabStatus.className = "collab-status";
  try {
    const res = await fetch("/api/collaborate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      collabStatus.textContent = "Request sent successfully. We'll be in touch.";
      collabStatus.classList.add("status-ok");
      collabForm.reset();
    } else {
      const err = await res.json().catch(() => ({}));
      collabStatus.textContent = err.error || "Something went wrong. Please try again.";
      collabStatus.classList.add("status-err");
    }
  } catch {
    collabStatus.textContent = "Network error. Please try again.";
    collabStatus.classList.add("status-err");
  } finally {
    btn.disabled = false;
    btn.textContent = "SEND REQUEST";
  }
});

// COMMUNITY FEED

const feedGrid = document.getElementById("feed-grid");

function renderPost(post) {
  const card = document.createElement("div");
  card.classList.add("feed-card");
  const date = new Date(post.created_at || post.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });
  card.innerHTML = `
    <div class="feed-meta"><span class="feed-author">${escapeHtml(post.author)}</span><span class="feed-field">${escapeHtml(post.field)}</span><span class="feed-date">${date}</span></div>
    <p>${escapeHtml(post.content)}</p>
  `;
  return card;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function loadFeed() {
  try {
    const res = await fetch("/api/feed");
    const posts = await res.json();
    feedGrid.innerHTML = "";
    if (!posts.length) {
      feedGrid.innerHTML = '<p class="feed-empty">No posts yet. Be the first to share an update.</p>';
      return;
    }
    posts.forEach((post) => feedGrid.appendChild(renderPost(post)));
  } catch {
    feedGrid.innerHTML = '<p class="feed-empty">Could not load feed.</p>';
  }
}

loadFeed();

const feedForm = document.getElementById("feed-form");
feedForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = feedForm.querySelector("button");
  const author = document.getElementById("feed-author").value.trim();
  const field = document.getElementById("feed-field").value.trim();
  const content = document.getElementById("feed-content").value.trim();
  if (!author || !field || !content) return;
  btn.disabled = true;
  btn.textContent = "POSTING...";
  try {
    const res = await fetch("/api/feed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, field, content }),
    });
    if (res.ok) {
      feedForm.reset();
      await loadFeed();
    }
  } finally {
    btn.disabled = false;
    btn.textContent = "POST TO FEED";
  }
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