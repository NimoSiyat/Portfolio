document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

         {   const selectedCategory = button.dataset.filter;

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach(function (card) {

                const category = card.dataset.category;

                if (
                    selectedCategory === "all" ||
                    category === selectedCategory
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });


    const detailButtons = document.querySelectorAll(".details-btn");

    detailButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card = button.closest(".project-card");
            const details = card.querySelector(".project-details");

            details.hidden = !details.hidden;

            button.textContent = details.hidden
                ? "More Details"
                : "Hide Details";

            button.setAttribute(
                "aria-expanded",
                String(!details.hidden)
            );

        });

    })

    const contactForm = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            feedback.textContent = "Please fill in all fields.";
            feedback.style.color = "red";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            feedback.textContent = "Please enter a valid email address.";
            feedback.style.color = "red";
            return;
        }

        feedback.textContent =
            "Form validated successfully! This demo has not sent your message.";
        feedback.style.color = "green";

        contactForm.reset();

    });

});

const username = "NimoSiyat";

const statusMessage = document.getElementById("api-status");
const reposContainer = document.getElementById("github-repos");

async function loadGitHubProjects() {
  statusMessage.textContent = "Loading projects...";

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`
    );

    // Check whether the API request succeeded
    if (!response.ok) {
      throw new Error("Could not load GitHub projects.");
    }

    // Convert the response into JavaScript data
    const repositories = await response.json();

    // Handle an empty repository list
    if (repositories.length === 0) {
      statusMessage.textContent =
        "No public repositories were found.";
      return;
    }

    // Clear the loading message
    statusMessage.textContent = "";
    reposContainer.replaceChildren();

    // Create a card for every repository
    repositories.forEach((repo) => {
      const card = document.createElement("article");
      card.className = "repo-card";

      const title = document.createElement("h3");
      title.textContent = repo.name;

      const description = document.createElement("p");
      description.textContent =
        repo.description || "No description provided.";

      const link = document.createElement("a");
      link.textContent = "View on GitHub";
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      card.append(title, description, link);
      reposContainer.appendChild(card);
    });
  } catch (error) {
    console.error("GitHub API error:", error);

    statusMessage.textContent =
      "Sorry, projects could not be loaded. Please try again later.";
  }
}

// Run the function when the page loads
loadGitHubProjects();