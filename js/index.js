
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
        const originalOverflow = h1.style.overflow;
        const fullWidth = h1.scrollWidth - parseFloat(getComputedStyle(h1).paddingLeft) - parseFloat(getComputedStyle(h1).paddingRight);
        const textLength = h1.textContent.length;

        h1.style.overflow = 'visible';
        h1.style.width = 'auto';
        h1.style.overflow = originalOverflow;
        h1.style.width = '0';
        h1.style.setProperty('--typing-width', fullWidth + 'px');
        h1.style.setProperty('--typing-steps', textLength);
    }
});

function openProject(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const template = document.getElementById(projectId);
    
    // Kopieer de inhoud van de template naar de modal
    modalBody.innerHTML = template.innerHTML;
    
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('project-modal').style.display = "none";
}

// Sluit de modal als je buiten het venster klikt
window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
