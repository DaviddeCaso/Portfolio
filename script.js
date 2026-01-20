const nameElement = document.getElementById("myName");
const toast = document.getElementById("easter-toast");

let counter = sessionStorage.getItem("easterEggCount") || 0;

const messages = [
    "Este programador parece funciona con café ☕",
    "Código limpio, mente sana 🧠",
    "Si algo funciona, no lo toques 😌",
    "Deploy en viernes: mala idea 🚨",
    "Has encontrado un easter egg 🥚"
];

function showToast(message) {
    const position = randomPosition();

    Object.assign(toast.style, position);

    toast.textContent = message;
    toast.classList.add("show");
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hidden");
    }, 3000);
}

function triggerEasterEgg(origin = "click") {
    counter++;
    sessionStorage.setItem("easterEggCount", counter);

    const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

    showToast(randomMessage);

    console.log(
    `%c🥚 Easter Egg activado (${origin})`,
    "color:#00ffcc; font-size:14px; font-weight:bold;"
    );
    console.log(
    `%cVeces encontrado en esta sesión: ${counter}`,
    "color:#888;"
    );

}

/* CLICK */
nameElement.addEventListener("click", () => {
    triggerEasterEgg("click");
});

/* TECLAS SECRETAS → CTRL + SHIFT + E */
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
        triggerEasterEgg("keyboard");
    }
});

function randomPosition() {
    const positions = [
        { bottom: "30px", right: "30px", top: "auto", left: "auto" },
        { bottom: "30px", left: "30px", top: "auto", right: "auto" },
        { top: "30px", right: "30px", bottom: "auto", left: "auto" },
        { top: "30px", left: "30px", bottom: "auto", right: "auto" }
    ];

    return positions[Math.floor(Math.random() * positions.length)];
}


/* Validación de contacto */

const faders = document.querySelectorAll('.fade-in-section');

const appearOptions = {
    threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

/* Toast de contacto */

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!contactForm.name.value || !contactForm.email.value || !contactForm.message.value) {
        contactToast.textContent = "Por favor completa todos los campos ⚠️";
        contactToast.classList.add('show');
        contactToast.classList.remove('hidden');
        setTimeout(() => {
            contactToast.classList.remove('show');
            contactToast.classList.add('hidden');
        }, 3000);
        return;
    }

    contactToast.textContent = "Mensaje enviado con éxito 🚀";
    contactToast.classList.add('show');
    contactToast.classList.remove('hidden');

    setTimeout(() => {
        contactToast.classList.remove('show');
        contactToast.classList.add('hidden');
    }, 3000);

    contactForm.reset();
});