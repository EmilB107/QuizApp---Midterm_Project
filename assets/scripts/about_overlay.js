document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links a");
    const aboutOverlay = document.querySelector(".about-overlay");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            if (href === "#about") {
                e.preventDefault();
                aboutOverlay.classList.add("active");
            } else {
                aboutOverlay.classList.remove("active");
            }
        });
    });
});
