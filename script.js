/* =========================
   VARIABLES GLOBALES
========================= */
const nameElement = document.getElementById("myName");
const easterToast = document.getElementById("easter-toast");
const contactToast = document.getElementById("contact-toast");
const contactForm = document.querySelector(".contact-form");
const projectCards = document.querySelectorAll(".project-card");

let counter = Number(sessionStorage.getItem("easterEggCount")) || 0;

/* =========================
   MENSAJES
========================= */
const easterMessages = [
    "Este programador funciona con café ☕",
    "Código limpio, mente sana 🧠",
    "Si algo funciona, no lo toques 😌",
    "Deploy en viernes: mala idea 🚨",
    "Has encontrado un easter egg 🥚"
];

/* =========================
   UTILIDADES
========================= */
function randomPosition() {
    const positions = [
        { bottom: "30px", right: "30px", top: "auto", left: "auto" },
        { bottom: "30px", left: "30px", top: "auto", right: "auto" },
        { top: "30px", right: "30px", bottom: "auto", left: "auto" },
        { top: "30px", left: "30px", bottom: "auto", right: "auto" }
    ];
    return positions[Math.floor(Math.random() * positions.length)];
}

function showToast(toastEl, message, randomizePosition = false) {
    if (randomizePosition) {
        Object.assign(toastEl.style, randomPosition());
    }

    toastEl.textContent = message;
    toastEl.classList.add("show");
    toastEl.classList.remove("hidden");

    setTimeout(() => {
        toastEl.classList.remove("show");
        toastEl.classList.add("hidden");
    }, 4000);
}

/* =========================
   EASTER EGG
========================= */
function triggerEasterEgg(origin = "click") {
    counter++;
    sessionStorage.setItem("easterEggCount", counter);

    const message =
        easterMessages[Math.floor(Math.random() * easterMessages.length)];

    showToast(easterToast, message, true);

    console.log(
        `%c🥚 Easter Egg activado (${origin})`,
        "color:#00ffcc; font-size:14px; font-weight:bold;"
    );
    console.log(
        `%cVeces encontrado en esta sesión: ${counter}`,
        "color:#888;"
    );
}

/* Eventos Easter Egg */
nameElement?.addEventListener("click", () => triggerEasterEgg("click"));

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
        triggerEasterEgg("keyboard");
    }
});

/* =========================
   PROJECTS (CARDS CLICABLES)
========================= */
projectCards.forEach(card => {
    card.addEventListener("click", () => {
        const url = card.dataset.url;
        if (url) {
            window.open(url, "_blank");
        }
    });
});

/* =========================
   CONTACT FORM
========================= */
contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const { name, email, message } = contactForm;

    if (!name.value || !email.value || !message.value) {
        showToast(contactToast, "Por favor completa todos los campos ⚠️");
        return;
    }

    showToast(contactToast, "Mensaje enviado con éxito 🚀");
    contactForm.reset();
});

/* =========================
   FADE-IN ON SCROLL
========================= */
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
