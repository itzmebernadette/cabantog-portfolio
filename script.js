/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header = document.getElementById("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

}


/* =========================================================
   AI VOICE PORTFOLIO GUIDE
========================================================= */

const aiGuideButton = document.getElementById("aiGuideButton");
const aiGuidePanel = document.getElementById("aiGuidePanel");
const aiClose = document.getElementById("aiClose");
const aiStatus = document.getElementById("aiStatus");
const aiMessage = document.getElementById("aiMessage");
const aiAvatar = document.getElementById("aiAvatar");
const aiTour = document.getElementById("aiTour");
const aiStop = document.getElementById("aiStop");


/* =========================================================
   OPEN / CLOSE AI GUIDE
========================================================= */

if (aiGuideButton && aiGuidePanel) {

    aiGuideButton.addEventListener("click", () => {
        aiGuidePanel.classList.toggle("active");
    });

}

if (aiClose && aiGuidePanel) {

    aiClose.addEventListener("click", () => {

        aiGuidePanel.classList.remove("active");

        stopSpeaking();

    });

}


/* =========================================================
   PORTFOLIO INFORMATION
========================================================= */

const guideContent = {

    intro: {
        title: "Hello! I'm Bernadette's AI Guide.",
        message:
            "Welcome to Bernadette Cabantog's portfolio. " +
            "Bernadette is a Bachelor of Science in Information Technology " +
            "graduate from Pateros Technological College. " +
            "She is interested in web development, software development, " +
            "and IT support."
    },

    about: {
        title: "About Bernadette",
        message:
            "Bernadette is a BS Information Technology graduate " +
            "from Pateros Technological College. " +
            "She enjoys building clean and functional websites " +
            "and continuously improving her technical skills. " +
            "Her interests include web development, software development, " +
            "and technology."
    },

    projects: {
        title: "Bernadette's Projects",
        message:
            "Bernadette has developed several projects. " +
            "Her featured projects include a Wedding Invitation Website " +
            "and the PTC Digital ID and QR Attendance System. " +
            "The wedding invitation website uses HTML, CSS, JavaScript, " +
            "and Vercel. The PTC Digital ID system uses HTML, CSS, " +
            "JavaScript, PHP, MySQL, XAMPP, and InfinityFree."
    },

    skills: {
        title: "Bernadette's Skills",
        message:
            "Bernadette has skills in web development, databases, " +
            "development tools, and IT support. " +
            "Her web development skills include HTML5, CSS3, JavaScript, " +
            "and PHP. She also works with MySQL, XAMPP, Git, GitHub, " +
            "Visual Studio Code, and Vercel."
    },

    experience: {
        title: "Bernadette's Experience",
        message:
            "Bernadette worked as an IT Operations Support Intern at Concentrix " +
            "from March 2026 to June 2026. " +
            "Her responsibilities included managing IT incident tickets " +
            "using BMC Helix, Windows reimaging and workstation deployment, " +
            "hardware and software troubleshooting, and assisting with LAN, " +
            "internet, VPN, and basic network troubleshooting."
    },

    education: {
        title: "Bernadette's Education",
        message:
            "Bernadette earned her Bachelor of Science in Information Technology " +
            "from Pateros Technological College. " +
            "She studied from September 2022 until August 2026."
    },

    certificates: {
        title: "Bernadette's Certificates",
        message:
            "Bernadette's portfolio includes certificates in Data Science " +
            "and Artificial Intelligence, Operating System Basics, " +
            "Network Support and Security, Computer Hardware Basics, " +
            "and Introduction to IoT."
    },

    contact: {
        title: "Contact Bernadette",
        message:
            "If you would like to get in touch with Bernadette, " +
            "you can send her an email, connect with her on LinkedIn, " +
            "or view her resume. " +
            "Her contact links are available in the Contact section."
    }

};


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speak(text) {

    if (!("speechSynthesis" in window)) {

        if (aiStatus) {
            aiStatus.textContent = "Voice guide unavailable";
        }

        if (aiMessage) {
            aiMessage.textContent =
                "Your browser does not support text-to-speech.";
        }

        return;

    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    const voices = speechSynthesis.getVoices();

    const preferredVoice = voices.find(voice =>
        voice.lang && voice.lang.toLowerCase().startsWith("en")
    );

    if (preferredVoice) {
        speech.voice = preferredVoice;
    }

    speech.onstart = () => {

        if (aiAvatar) {
            aiAvatar.classList.add("speaking");
        }

        if (aiStatus) {
            aiStatus.textContent = "Speaking...";
        }

    };

    speech.onend = () => {

        if (aiAvatar) {
            aiAvatar.classList.remove("speaking");
        }

        if (aiStatus) {
            aiStatus.textContent = "Ready to guide you";
        }

    };

    speech.onerror = () => {

        if (aiAvatar) {
            aiAvatar.classList.remove("speaking");
        }

        if (aiStatus) {
            aiStatus.textContent = "Voice error";
        }

    };

    speechSynthesis.speak(speech);

}


/* =========================================================
   STOP SPEECH
========================================================= */

function stopSpeaking() {

    if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
    }

    if (aiAvatar) {
        aiAvatar.classList.remove("speaking");
    }

    if (aiStatus) {
        aiStatus.textContent = "Ready to guide you";
    }

}


/* =========================================================
   GUIDE BUTTONS
========================================================= */

document.querySelectorAll("[data-guide]").forEach(button => {

    button.addEventListener("click", () => {

        const type = button.dataset.guide;
        const guide = guideContent[type];

        if (!guide) return;

        if (aiStatus) {
            aiStatus.textContent = guide.title;
        }

        if (aiMessage) {
            aiMessage.textContent = guide.message;
        }

        const sectionMap = {

            about: "#about",
            projects: "#projects",
            skills: "#skills",
            experience: "#experience",
            education: "#education",
            certificates: "#certificates",
            contact: "#contact"

        };

        if (sectionMap[type]) {

            const section =
                document.querySelector(sectionMap[type]);

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

        speak(guide.message);

    });

});


/* =========================================================
   PORTFOLIO TOUR
========================================================= */

const tour = [

    "Welcome to Bernadette Cabantog's portfolio. Let me give you a quick tour.",

    guideContent.about.message,

    guideContent.projects.message,

    guideContent.skills.message,

    guideContent.experience.message,

    guideContent.education.message,

    guideContent.certificates.message,

    guideContent.contact.message

];

let tourIndex = 0;
let tourRunning = false;


function playTour() {

    if (!tourRunning) return;

    if (tourIndex >= tour.length) {

        tourRunning = false;

        if (aiStatus) {
            aiStatus.textContent = "Tour completed";
        }

        if (aiMessage) {
            aiMessage.textContent =
                "Thanks for visiting Bernadette's portfolio.";
        }

        if (aiAvatar) {
            aiAvatar.classList.remove("speaking");
        }

        return;

    }

    const message = tour[tourIndex];

    if (aiStatus) {
        aiStatus.textContent = "Portfolio Tour";
    }

    if (aiMessage) {
        aiMessage.textContent = message;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    const voices = speechSynthesis.getVoices();

    const preferredVoice = voices.find(voice =>
        voice.lang && voice.lang.toLowerCase().startsWith("en")
    );

    if (preferredVoice) {
        speech.voice = preferredVoice;
    }

    speech.onstart = () => {

        if (aiAvatar) {
            aiAvatar.classList.add("speaking");
        }

    };

    speech.onend = () => {

        if (aiAvatar) {
            aiAvatar.classList.remove("speaking");
        }

        tourIndex++;

        setTimeout(() => {
            playTour();
        }, 700);

    };

    speech.onerror = () => {

        tourRunning = false;

        if (aiAvatar) {
            aiAvatar.classList.remove("speaking");
        }

    };

    speechSynthesis.speak(speech);

}


if (aiTour) {

    aiTour.addEventListener("click", () => {

        if (tourRunning) return;

        tourRunning = true;
        tourIndex = 0;

        playTour();

    });

}


if (aiStop) {

    aiStop.addEventListener("click", () => {

        tourRunning = false;
        tourIndex = 0;

        stopSpeaking();

        if (aiStatus) {
            aiStatus.textContent = "Tour stopped";
        }

        if (aiMessage) {
            aiMessage.textContent =
                "Choose an option below.";
        }

    });

}