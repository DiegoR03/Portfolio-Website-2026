let projectData = [];

async function laadProjecten() {
    try {
        const response = await fetch('assets/info/projects.json');
        const data = await response.json();
        projectData = data.projects;

        const container = document.getElementById('projects-container');
        container.innerHTML = ""; // Container leegmaken voor de zekerheid

        projectData.forEach((project, index) => {
            const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            const cardHTML = `
                <div id="project-card" onclick="openProject(${index})">
                    <div id="content-${index}">
                        <div id="tags-${index}">${tagsHTML}</div>
                        <div id="info-${index}">
                            <h3>${project.title}</h3>
                            <p>Klik voor meer info</p>
                        </div>
                    </div>
                    <img src="${project.image}" alt="${project.title}">
                </div>
            `;
            container.innerHTML += cardHTML;
        });
    } catch (error) {
        console.error("Oeps, er ging iets mis bij het laden van de JSON:", error);
    }
}

function openProject(index) {
    const project = projectData[index];
    const popover = document.getElementById('project-popover');
    const body = document.getElementById('popover-body');
    
    // De cursor elementen opzoeken
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    popover.addEventListener('beforetoggle', (event) => {
    if (event.newState === 'open') {
        popover.appendChild(dot);
        popover.appendChild(ring);
    } else {
        document.body.appendChild(dot);
        document.body.appendChild(ring);
    }
});

    body.innerHTML = `
        <h2>${project.title}</h2>
        <div id="project-info-container">
            <p>${project.description}</p>
            <p><strong>Datum:</strong> ${project.date}</p>
            <p><strong>Team:</strong> ${project.team.join(', ')}</p>
            <p><strong>Rol:</strong> ${project.role}</p>
            <p>Github Link: <a href="${project.githublink}" target="_blank">Klik hier</a></p>
        </div>
        <img src="${project.image}" alt="${project.title}">
        <img src="${project.image2}" alt="${project.title}">
    `;
    popover.appendChild(dot);
    popover.appendChild(ring);

    popover.showPopover();
}

function closeProject() {
    const popover = document.getElementById('project-popover');
    popover.hidePopover();
}

laadProjecten();