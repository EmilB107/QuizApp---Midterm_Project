document.addEventListener("DOMContentLoaded", function () {
    const questPathLinks = document.querySelectorAll(".paths ul li a");
    const bannerItems = document.querySelectorAll(".paths ul li");
    const bannerList = document.querySelector(".paths ul"); // Parent container for banners
    let hasSelection = false; // Track if a banner is selected

    // Handle Quest Paths overlay activation
    questPathLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const questPathsSection = document.querySelector(".quest-paths");
            if (questPathsSection) {
                questPathsSection.classList.add("active");
            }
        });
    });

    // Handle Quest Path banner selection
    bannerItems.forEach(item => {
        item.addEventListener("click", () => {
            hasSelection = true; // A banner is selected

            // Add 'has-selection' to the parent container
            bannerList.classList.add("has-selection");

            // Remove 'select' class from all banners
            bannerItems.forEach(banner => banner.classList.remove("select"));

            // Add 'select' class to the clicked banner
            item.classList.add("select");
        });
    });

    // Reset banners when clicking outside
    document.addEventListener("click", (e) => {
        const clickedBanner = e.target.closest(".paths ul li"); // Check if a banner was clicked

        if (!clickedBanner) {
            if (hasSelection) {
                hasSelection = false; // Reset selection state
                bannerList.classList.remove("has-selection"); // Remove 'has-selection' class
                bannerItems.forEach(banner => banner.classList.remove("select")); // Reset all banners
            }
        }
    });
});
