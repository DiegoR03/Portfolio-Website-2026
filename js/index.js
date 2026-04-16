
fetch("partials/header.html")
    .then(res => res.text())
    .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
    });

fetch("partials/footer.html")
    .then(res => res.text())
    .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
    });

// From own website https://github.com/DiegoR03/IntroductionWebsite
document.querySelectorAll('li > a').forEach(btn => {
    btn.addEventListener('click', event => {
        event.preventDefault();
        const href = btn.getAttribute('href');
        const targetId = href && href.startsWith('#') ? href.slice(1) : null;
        const target = targetId ? document.getElementById(targetId) : null;
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('h1');
    if (h1) {
        const text = h1.textContent;
        h1.textContent = ''; 

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            h1.appendChild(span);

            setTimeout(() => {
                const prev = h1.querySelector('[data-current="true"]');
                if (prev) prev.removeAttribute('data-current');
                span.style.opacity = '1';
                span.setAttribute('data-current', 'true');
            }, index * 50);
        });
    }
});

// MARK: Cursor
const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
});

function animate() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
}

animate();

const interactiveElements = document.querySelectorAll('a, button, .project-card, input[type=submit]');

interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        ring.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
        ring.classList.remove("hover");
    });
});

// MARK: Nav
function navResize() {
    const navList = document.querySelector("nav ul");
    const isOpen = navList.getAttribute("data-responsive") === "true";
    navList.setAttribute("data-responsive", isOpen ? "false" : "true");
}

// MARK: Footer
function sendMail() {
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var subjectText = document.getElementById('subject').value;
    var messageText = document.getElementById('message').value;
    var emailRecipient = "Diegoramon@live.nl";
    var emailSubject = subjectText || "Contact";
    var emailBody = "Goedendag,\n\n" 
        + messageText + "\n\n" 
        + "Met vriendelijke groet,\n" 
        + firstName + " " + lastName;

    window.location.href = "mailto:" + emailRecipient 
        + "?subject=" + encodeURIComponent(emailSubject) 
        + "&body=" + encodeURIComponent(emailBody);

    setTimeout(function() {
        window.location.href = "index.html";
    }, 500);
}