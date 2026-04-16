const timeline = document.getElementById('experience-timeline');
const fill = document.getElementById('timeline-fill');
const button = document.querySelector('button');

window.addEventListener('scroll', () => {

    if (timeline && fill) {
        const windowHeight = window.innerHeight;
        const windowScroll = window.pageYOffset || document.documentElement.scrollTop;
        const rect = timeline.getBoundingClientRect();
        const timelineTop = rect.top + windowScroll;
        const timelineHeight = timeline.offsetHeight;

        let scrollPercent = (windowScroll + (windowHeight / 2) - timelineTop) / timelineHeight;

        scrollPercent = Math.min(Math.max(scrollPercent, 0), 1);

        fill.style.transform = `scaleY(${scrollPercent})`;

        const totalHeight = document.documentElement.scrollHeight - windowHeight;
        const totalScroll = windowScroll / totalHeight;
        if (button) {
            button.style.transform = `scale(${totalScroll}, ${totalScroll})`;
        }
    }
});

let timelineData = [];

async function laadEvents() {
    try {
        const response = await fetch('assets/info/timeline.json');
        const data = await response.json();
        timelineData = data.timeline;

        const leftContainer = document.querySelector('.timeline-col.left');
        const rightContainer = document.querySelector('.timeline-col.right');

        timelineData.forEach((event, index) => {
            const cardHTML = `
                <div class="timeline-item">
                    <div class="flag-wrapper">
                        <span class="time">${event.year}</span>
                        <span class="flag">${event.title}</span>
                        <span class="hexa"></span>
                    </div>
                    <div class="desc">${event.description}</div>
                </div>
            `;
            if(event.side === 'left') {
                leftContainer.innerHTML += cardHTML;
            } else {
                rightContainer.innerHTML += cardHTML;
            }

        });
    } catch (error) {
        console.error("Oeps, er ging iets mis bij het laden van de JSON:", error);
    }
}

laadEvents();