import { initAnimations } from './animations.js';
import { initChat } from './ai-chat.js';
import { initBooking } from './booking.js';

const sections = [
    ['home-container', 'home.html'],
    ['ai-container', 'ai.html'],
    ['destinations-container', 'destinations.html'],
    ['packages-container', 'packages.html'],
    ['booking-container', 'booking.html'],
    ['about-container', 'about.html'],
    ['ai-chat-container', 'ai-chat.html']
];

async function loadSection(containerId, fileName) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    try {
        const response = await fetch(fileName, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Failed to load ${fileName}: ${response.status}`);
        }

        container.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
        container.innerHTML = `<p>Unable to load ${fileName}.</p>`;
    }
}

async function loadAllSections() {
    console.log('PathPort: loading sections...');
    await Promise.all(sections.map(([containerId, fileName]) => loadSection(containerId, fileName)));
    initAnimations();
    initChat();
    initBooking();
}

window.addEventListener('DOMContentLoaded', loadAllSections);
