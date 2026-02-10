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

	// Form Validation
	const contactForm = document.getElementById("contact-form");
	if (contactForm) {
		contactForm.addEventListener("submit", (e) => {
			e.preventDefault();

			let isValid = true;
			const name = document.getElementById("name");
			const email = document.getElementById("email");
			const message = document.getElementById("message");

			const nameError = document.getElementById("name-error");
			const emailError = document.getElementById("email-error");
			const messageError = document.getElementById("message-error");

			// Helper to reset error status
			const resetError = (input, errorEl) => {
				input.classList.remove("border-red-600");
				errorEl.classList.add("hidden");
			};

			// Helper to set error status
			const setError = (input, errorEl) => {
				input.classList.add("border-red-600");
				errorEl.classList.remove("hidden");
				isValid = false;
			};

			resetError(name, nameError);
			resetError(email, emailError);
			resetError(message, messageError);

			// Validate Name
			if (name.value.trim() === "") {
				setError(name, nameError);
			}

			// Validate Email
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email.value.trim())) {
				setError(email, emailError);
			}

			// Validate Message
			if (message.value.trim() === "") {
				setError(message, messageError);
			}



			if (isValid) {
				const submitBtn = contactForm.querySelector("button[type='submit']");
				const originalBtnText = submitBtn.innerHTML;

				submitBtn.disabled = true;
				submitBtn.innerHTML = 'Gönderiliyor...';

				grecaptcha.ready(function() {
					grecaptcha.execute('6LdIoWIsAAAAAERS_bmzsnSb8U99u88DBGOWb1py', {action: 'submit'}).then(function(token) {
						// Prepare Data
						const formData = {
							name: name.value.trim(),
							email: email.value.trim(),
							message: message.value.trim(),
							recaptcha: token
						};

						fetch('gonder.php', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(formData)
						})
						.then(response => {
                             if (!response.ok) {
                                 throw new Error('Sunucu Hatası');
                             }
                             return response.json();
                        })
						.then(data => {
							const successMsg = document.getElementById("form-success");
							const errorMsg = document.getElementById("form-error");

							if (data.success) {
								// Show Success Message
								if (successMsg) {
									successMsg.classList.remove("hidden");
									if (errorMsg) errorMsg.classList.add("hidden"); 
									successMsg.innerText = data.message;
									submitBtn.classList.add("hidden");
								}
								contactForm.reset();
							} else {
								// Show Error Message (Business Logic Error)
								if (errorMsg) {
									errorMsg.classList.remove("hidden");
									if (successMsg) successMsg.classList.add("hidden");
									errorMsg.innerText = data.message || 'Bir hata oluştu. Lütfen bilgilerinizi kontrol ediniz.';
								}
								submitBtn.innerHTML = originalBtnText;
								submitBtn.disabled = false;
							}
						})
						.catch(() => {
							// Show Error Message (Network/Server Error)
							const successMsg = document.getElementById("form-success");
							const errorMsg = document.getElementById("form-error");
							
							if (errorMsg) {
								errorMsg.classList.remove("hidden");
								if (successMsg) successMsg.classList.add("hidden");
								errorMsg.innerText = 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyiniz.';
							}
							submitBtn.innerHTML = originalBtnText;
							submitBtn.disabled = false;
						});
					});
				});
			}
		});
	}
});
