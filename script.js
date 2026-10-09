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