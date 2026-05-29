import { normalize } from './utils.js';

const knowledgeBase = {
    about: [
        'PathPort is an AI-enabled travel website engineered to act as your personalized guide.',
        'It helps users explore destinations, compare packages, and book journeys with a smart planning experience.',
        'The website highlights Kathmandu Valley experiences including heritage sites, scenic viewpoints, and premium travel packages.'
    ],
    destinations: [
        'Swayambhunath is an ancient religious monument atop a hill in Kathmandu Valley with panoramic views.',
        'Boudhanath is one of the largest spherical stupas in the world and a spiritual and cultural landmark.',
        'Kathmandu Durbar Square is the historic palace courtyard full of temples, wood carvings, and Newari architecture.'
    ],
    kathmandu: [
        'Kathmandu Valley combines heritage temples, royal palaces, and city markets. Top Kathmandu attractions include Swayambhunath, Boudhanath, and Durbar Square for culture, history, and hilltop views.'
    ],
    lumbini: [
        'Lumbini is the birthplace of Lord Buddha, famous for the Maya Devi Temple, peaceful meditation gardens, and heritage pilgrimage routes.'
    ],
    pokhara: [
        'Pokhara is a lakeside city with Phewa Lake, Sarangkot sunrise views, and opportunities for boating, paragliding, and relaxed mountain scenery.'
    ],
    ilam: [
        'Ilam is known for its tea gardens, green hills, and cool weather, making it a top choice for nature walks, tea estate visits, and scenic hilltop views.'
    ],
    badimalika: [
        'Badimalika is a scenic western Nepal destination with heritage trails, mountain viewpoints, and quiet rural landscapes ideal for cultural and nature exploration.'
    ],
    packageClassic: [
        'The Classic Kathmandu Exploration package is a 5 days / 4 nights itinerary that includes Swayambhunath, Boudhanath, Durbar Square, and a heritage walking tour through Kathmandu City.',
        'Suggested price for the Classic Kathmandu package is Rs. 15,500 per person, including accommodations, guided sightseeing, and local transfers.'
    ],
    packageKathmanduFusion: [
        'The Kathmandu & Pokhara Fusion package is a 7 days / 6 nights tour combining Kathmandu heritage sites with Pokhara lakeside relaxation, including Phewa Lake, Sarangkot sunrise, and cultural city visits.',
        'Suggested price for the Kathmandu & Pokhara Fusion package is Rs. 28,000 per person, including guided transport, accommodations, and curated day tours.'
    ],
    packagePokhara: [
        'The Pokhara Lakeside Escape package is a 4 days / 3 nights tour that includes a boat ride on Phewa Lake, sunrise at Sarangkot, and relaxed lakeside stays with optional adventure activities like paragliding.',
        'Suggested price for the Pokhara package is Rs. 19,500 per person, including guided local transfers, accommodation, and sightseeing assistance.'
    ],
    packageLumbini: [
        'The Lumbini Spiritual Trail package is a 3 days / 2 nights retreat focused on the Maya Devi Temple, meditation gardens, and pilgrimage heritage sites, ideal for peaceful cultural exploration.',
        'Suggested price for the Lumbini package is Rs. 13,900 per person, including guided tours, local accommodations, and transportation between sacred sites.'
    ],
    packageIlam: [
        'The Ilam Tea & Nature Retreat package is a 4 days / 3 nights itinerary that includes tea garden walks, ridge viewpoint hikes, local village experiences, and restful hilltop stays. The package is designed for travelers who want soothing nature, cool weather, and authentic tea estate culture.',
        'Suggested price for the Ilam package is Rs. 17,200 per person, including guided tours, accommodations, and local transfers.'
    ],
    packageBadimalika: [
        'The Badimalika Heritage & Scenic Expedition package is a 5 days / 4 nights tour focused on western Nepal heritage sites, mountain viewpoint trails, and quiet cultural villages. It combines scenic exploration with local guesthouse stays and guided outdoor experiences.',
        'Suggested price for the Badimalika package is Rs. 18,600 per person, including guided transport, accommodations, and curated heritage visits.'
    ],
    packages: [
        'Classic Kathmandu Exploration is a 5 days / 4 nights package priced at Rs. 15,500 per person.',
        'Kathmandu & Pokhara Fusion is a 7 days / 6 nights package priced at Rs. 28,000 per person.',
        'Pokhara Lakeside Escape is a 4 days / 3 nights package priced at Rs. 19,500 per person.',
        'Lumbini Spiritual Trail is a 3 days / 2 nights package priced at Rs. 13,900 per person.',
        'Ilam Tea & Nature Retreat is a 4 days / 3 nights package priced at Rs. 17,200 per person.',
        'Badimalika Heritage & Scenic Expedition is a 5 days / 4 nights package priced at Rs. 18,600 per person.',
        'All packages include guided local experiences, accommodations, and transportation support.'
    ],
    booking: [
        'To book, fill in your full name, email, destination, travel date, and number of travelers in the booking form.',
        'After submitting, the page shows a confirmation alert and the booking is registered locally in the browser.'
    ],
    contact: [
        'Email: pathport2026@gmail.com',
        'Phone: +977-9866108228',
        'Location: New Baneshwor, Opposite of Everest Hotel, Kathmandu, Nepal'
    ],
    features: [
        'The page includes AI recommendations, a destination gallery, package cards, a booking form, and an AI chat guide.',
        'The hero section also rotates through local destination images every 5 seconds.'
    ]
};

function appendMessage(text, type, chatBody) {
    const msg = document.createElement('p');
    msg.className = `chat-msg ${type === 'user' ? 'user-msg' : 'bot-msg'}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator(chatBody) {
    const indicator = document.createElement('p');
    indicator.className = 'chat-msg typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.textContent = 'Thinking...';
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');

    if (indicator) {
        indicator.remove();
    }
}

function getAnswer(query) {
    const q = normalize(query);

    if (!q) {
        return 'Please type a question so I can help you plan your trip.';
    }

    if (/(hello|hi|hey|start|help|what can you do|how can you help)/.test(q)) {
        return 'I can help with destination recommendations, package details, booking steps, contact information, and general information about PathPort.';
    }

    if (/(about|what is pathport|who is pathport|tell me about pathport|website)/.test(q)) {
        return knowledgeBase.about.join(' ');
    }

    if (/(recommend|suggest|best|interesting|what should i visit|destination|swayambhunath|boudha|durbar|kathmandu|lumbini|pokhara|ilam|badimalika)/.test(q)) {
        const matched = [];

        if (/(swayambhunath|view|panoramic|hill)/.test(q)) {
            matched.push(knowledgeBase.destinations[0]);
        }

        if (/(boudha|boudhanath|stupa|spiritual|tibetan)/.test(q)) {
            matched.push(knowledgeBase.destinations[1]);
        }

        if (/(durbar|square|histor|palace|newari|wood)/.test(q)) {
            matched.push(knowledgeBase.destinations[2]);
        }

        if (/(kathmandu|valley|swayambhunath|boudha|durbar|durbar square)/.test(q)) {
            matched.push(knowledgeBase.kathmandu);
        }

        if (/(lumbini|buddha|maya devi|ashokan)/.test(q)) {
            matched.push(knowledgeBase.lumbini);
        }

        if (/(pokhara|lake|phewa|sarangkot|paragliding)/.test(q)) {
            matched.push(knowledgeBase.pokhara);
        }

        if (/(ilam|tea|hills|ridge|garden)/.test(q)) {
            matched.push(knowledgeBase.ilam);
        }

        if (/(badimalika|heritage|western nepal|mountain trails|scenic|rural)/.test(q)) {
            matched.push(knowledgeBase.badimalika);
        }

        if (!matched.length) {
            matched.push('I recommend starting with Swayambhunath for views, Boudhanath for cultural depth, and Durbar Square for heritage and architecture. You can also explore Pokhara for lakeside adventures, Lumbini for Buddhist pilgrimage, Ilam for peaceful tea hills, and Badimalika for quiet mountain heritage trails.');
        }

        return matched.join(' ');
    }

    if (/(classic|classic kathmandu|classic kathmandu exploration|kathmandu exploration)/.test(q)) {
        return knowledgeBase.packageClassic.join(' ');
    }

    if (/(kathmandu & pokhara|kathmandu pokhara|fusion|pokhara fusion|kathmandu fusion)/.test(q)) {
        return knowledgeBase.packageKathmanduFusion.join(' ');
    }

    if (/(pokhara|lake|phewa|sarangkot|paragliding|pokhara package|pokhara tour)/.test(q)) {
        return knowledgeBase.packagePokhara.join(' ');
    }

    if (/(lumbini|buddha|maya devi|ashokan|lumbini package|lumbini tour)/.test(q)) {
        return knowledgeBase.packageLumbini.join(' ');
    }

    if (/(ilam|tea & nature|tea nature|nature retreat|ilam package|ilam tour)/.test(q)) {
        return knowledgeBase.packageIlam.join(' ');
    }

    if (/(badimalika|heritage & scenic|heritage expedition|badimalika package|badimalika tour)/.test(q)) {
        return knowledgeBase.packageBadimalika.join(' ');
    }

    if (/(package|packages|price|cost|how much|days|nights|rs\.|rupees)/.test(q)) {
        return knowledgeBase.packages.join(' ');
    }

    if (/(book|booking|reserve|submit|travel date|travelers|full name|email|destination)/.test(q)) {
        return knowledgeBase.booking.join(' ');
    }

    if (/(contact|email|phone|location|address|reach|support)/.test(q)) {
        return knowledgeBase.contact.join(' ');
    }

    if (/(feature|features|what is on this page|gallery|hero|ai recommendations|chatbot)/.test(q)) {
        return knowledgeBase.features.join(' ');
    }

    return 'I can answer questions about PathPort’s destinations, packages, booking process, contact details, and website features. For example, ask about Swayambhunath, Boudhanath, Durbar Square, prices, or how to book.';
}

export function initChat() {
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const aiChatToggle = document.getElementById('aiChatToggle');
    const aiChatWidget = document.getElementById('aiChatWidget');
    const aiChatClose = document.getElementById('aiChatClose');

    if (!chatBody || !chatInput || !sendBtn || !aiChatToggle || !aiChatWidget || !aiChatClose) {
        return;
    }

    function openChat() {
        aiChatWidget.classList.add('open');
        chatInput.focus();
    }

    function closeChat() {
        aiChatWidget.classList.remove('open');
    }

    function handleSend() {
        const query = chatInput.value.trim();

        if (!query) {
            return;
        }

        appendMessage(query, 'user', chatBody);
        chatInput.value = '';
        showTypingIndicator(chatBody);

        setTimeout(() => {
            removeTypingIndicator();
            appendMessage(getAnswer(query), 'bot', chatBody);
        }, 500);
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend();
        }
    });
    aiChatToggle.addEventListener('click', openChat);
    aiChatClose.addEventListener('click', closeChat);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeChat();
        }
    });
}
