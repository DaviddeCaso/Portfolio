/* =====================================================
   ELEMENTOS DEL DOM
===================================================== */

const nameElement = document.getElementById("myName");
const easterToast = document.getElementById("easter-toast");
const contactToast = document.getElementById("contact-toast");
const contactForm = document.querySelector(".contact-form");
const projectImages = document.querySelectorAll(
    ".project-card:not(.in-progress) .project-img-wrapper"
);

/* =====================================================
   CONFIGURACIÓN
===================================================== */

const TOAST_DURATION = 4000;
let easterCounter = Number(sessionStorage.getItem("easterEggCount")) || 0;

/* =====================================================
   MENSAJES
===================================================== */

const easterMessages = [
    "Este programador funciona con café ☕",
    "Código limpio, mente sana 🧠",
    "Si algo funciona, no lo toques 😌",
    "Deploy en viernes: mala idea 🚨",
    "Has encontrado un easter egg 🥚"
];

/* =====================================================
   UTILIDADES
===================================================== */

function getRandomPosition() {
    const positions = [
        { bottom: "30px", right: "30px", top: "auto", left: "auto" },
        { bottom: "30px", left: "30px", top: "auto", right: "auto" },
        { top: "30px", right: "30px", bottom: "auto", left: "auto" },
        { top: "30px", left: "30px", bottom: "auto", right: "auto" }
    ];

    return positions[Math.floor(Math.random() * positions.length)];
}

function showToast(toastEl, message, randomizePosition = false) {
    if (!toastEl) return;

    if (randomizePosition) {
        Object.assign(toastEl.style, getRandomPosition());
    }

    toastEl.textContent = message;
    toastEl.classList.add("show");
    toastEl.classList.remove("hidden");

    clearTimeout(toastEl._timeout);

    toastEl._timeout = setTimeout(() => {
        toastEl.classList.remove("show");
        toastEl.classList.add("hidden");
    }, TOAST_DURATION);
}

/* =====================================================
   EASTER EGG
===================================================== */

function triggerEasterEgg(origin = "click") {
    easterCounter++;
    sessionStorage.setItem("easterEggCount", easterCounter);

    const message =
        easterMessages[Math.floor(Math.random() * easterMessages.length)];

    showToast(easterToast, message, true);

    console.log(
        `%c🥚 Easter Egg activado (${origin})`,
        "color:#00ffcc; font-size:14px; font-weight:bold;"
    );
    console.log(
        `%cVeces encontrado en esta sesión: ${easterCounter}`,
        "color:#888;"
    );
}

/* Eventos */
nameElement?.addEventListener("click", () => triggerEasterEgg("click"));

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
        triggerEasterEgg("keyboard");
    }
});
/* =========================
   HERO ANIMATION ON LOAD
========================= */

window.addEventListener("load", () => {
    const hero = document.querySelector(".hero");
    hero?.classList.add("animate");
});

/* =====================================================
   PROJECTS (IMÁGENES CLICABLES)
===================================================== */

projectImages.forEach(wrapper => {
    wrapper.addEventListener("click", () => {
        const card = wrapper.closest(".project-card");
        const url = card?.dataset.url;

        if (url) {
            window.open(url, "_blank", "noopener");
        }
    });
});

/* =====================================================
   CONTACT FORM
===================================================== */

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const { name, email, message } = contactForm;

    if (!name.value || !email.value || !message.value) {
        showToast(contactToast, "Por favor completa todos los campos ⚠️");
        return;
    }

    if (!isValidEmail(email.value)) {
        showToast(contactToast, "Introduce un email válido 📧");
        return;
    }

    showToast(contactToast, "Mensaje enviado con éxito 🚀");
    contactForm.reset();
});

/* =====================================================
   FADE-IN ON SCROLL
===================================================== */

const faders = document.querySelectorAll(".fade-in-section");

const appearObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.2 }
);

faders.forEach(el => appearObserver.observe(el));

/* =========================
   NAV ACTIVA SEGÚN SECCIÓN
========================= */

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav a");

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;

            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );
            });
        });
    },
    {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0
    }
);

sections.forEach(section => navObserver.observe(section));

