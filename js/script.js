document.addEventListener("DOMContentLoaded", () => {
	// Reveal animations on scroll
	const reveals = document.querySelectorAll(".reveal");

	const revealOnScroll = () => {
		reveals.forEach((el) => {
			const windowHeight = window.innerHeight;
			const elementTop = el.getBoundingClientRect().top;
			const elementVisible = 150;

			if (elementTop < windowHeight - elementVisible) {
				el.classList.add("active");
			}
		});
	};

	window.addEventListener("scroll", revealOnScroll);

	// Navigation scroll handling
	const mainNav = document.getElementById("main-nav");
	const handleNavScroll = () => {
		if (window.scrollY > 50) {
			mainNav.classList.add("nav-scrolled");
		} else {
			mainNav.classList.remove("nav-scrolled");
		}
	};

	window.addEventListener("scroll", handleNavScroll);

	// Trigger initial check
	revealOnScroll();
	handleNavScroll();

	// Special handling for hero content to reveal immediately
	setTimeout(() => {
		document.getElementById("hero-content").classList.add("active");
	}, 500);
});
