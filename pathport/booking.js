import { normalize } from './utils.js';

const BOOKING_STORAGE_KEY = 'pathportBookings';

function getPackageName(destination) {
    const packageMap = {
        combo: 'Kathmandu & Pokhara Fusion',
        pokhara: 'Pokhara Lakeside Escape',
        lumbini: 'Lumbini Spiritual Trail',
        ilam: 'Ilam Tea & Nature Retreat',
        badimalika: 'Badimalika Heritage & Scenic Expedition'
    };

    return packageMap[destination] || 'Classic Kathmandu Exploration';
}

function getStorageBookings() {
    try {
        const saved = localStorage.getItem(BOOKING_STORAGE_KEY);

        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function saveStorageBookings(bookings) {
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
}

function formatDateValue(dateString) {
    if (!dateString) {
        return 'Not provided';
    }

    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function showBookingStatus(message, type, bookingStatus) {
    bookingStatus.textContent = message;
    bookingStatus.className = `booking-status ${type}`;
}

function buildContractHTML(booking) {
    return `
        <div class="booking-contract">
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Full Name:</strong> ${booking.fullName}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phoneNumber}</p>
            <p><strong>Package:</strong> ${booking.packageName}</p>
            <p><strong>Destination Code:</strong> ${booking.destination}</p>
            <p><strong>Travel Date:</strong> ${formatDateValue(booking.travelDate)}</p>
            <p><strong>Travelers:</strong> ${booking.travelers}</p>
            <p><strong>Notes:</strong> ${booking.notes || 'No additional notes'}</p>
            <p><strong>Booked On:</strong> ${new Date(booking.createdAt).toLocaleString()}</p>
        </div>`;
}

function renderBookings(filterText = '') {
    const bookingSearch = document.getElementById('bookingSearch');
    const bookingTableBody = document.getElementById('bookingTableBody');
    const bookingTableWrapper = document.getElementById('bookingTableWrapper');
    const bookingEmpty = document.getElementById('bookingEmpty');

    if (!bookingTableBody || !bookingTableWrapper || !bookingEmpty) {
        return;
    }

    const bookings = getStorageBookings();
    const normalizedFilter = normalize(filterText);
    const filteredBookings = bookings.filter((booking) => {
        if (!normalizedFilter) {
            return true;
        }

        const searchable = [
            booking.fullName,
            booking.email,
            booking.packageName,
            booking.destination
        ].join(' ').toLowerCase();

        return searchable.includes(normalizedFilter);
    });

    bookingTableBody.innerHTML = '';

    if (!filteredBookings.length) {
        bookingEmpty.textContent = normalizedFilter
            ? 'No bookings match your search. Try a different name, email, or package.'
            : 'No bookings recorded yet. Submit the booking form to see the customer contract details here.';
        bookingEmpty.hidden = false;
        bookingTableWrapper.hidden = true;
        return;
    }

    bookingEmpty.hidden = true;
    bookingTableWrapper.hidden = false;

    filteredBookings.forEach((booking) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.fullName}</td>
            <td>${booking.packageName}</td>
            <td>${booking.email}</td>
            <td>${booking.phoneNumber}</td>
            <td>${formatDateValue(booking.travelDate)}</td>
            <td>${booking.travelers}</td>
            <td>${buildContractHTML(booking)}</td>`;
        bookingTableBody.appendChild(row);
    });
}

export function initBooking() {
    const bookingForm = document.getElementById('bookingForm');
    const bookingStatus = document.getElementById('bookingStatus');
    const bookingSearch = document.getElementById('bookingSearch');
    const clearBookingsBtn = document.getElementById('clearBookings');

    if (!bookingForm || !bookingStatus || !bookingSearch || !clearBookingsBtn) {
        return;
    }

    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('emailAddress').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const destination = document.getElementById('destination').value;
        const travelDate = document.getElementById('travelDate').value;
        const travelers = document.getElementById('travelers').value;
        const notes = document.getElementById('notes').value.trim();

        if (!fullName || !email || !phoneNumber || !destination || !travelDate || !travelers) {
            showBookingStatus('Please complete all required booking fields.', 'error', bookingStatus);
            return;
        }

        const booking = {
            id: `PPT-${Date.now().toString(36).toUpperCase()}`,
            fullName,
            email,
            phoneNumber,
            destination,
            packageName: getPackageName(destination),
            travelDate,
            travelers,
            notes,
            createdAt: new Date().toISOString()
        };

        const bookings = getStorageBookings();
        bookings.unshift(booking);
        saveStorageBookings(bookings);
        renderBookings(bookingSearch.value);
        bookingForm.reset();
        document.getElementById('travelers').value = '1';
        showBookingStatus(`Booking saved successfully for ${booking.fullName}. Booking ID: ${booking.id}`, 'success', bookingStatus);
        bookingStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    bookingSearch.addEventListener('input', (event) => {
        renderBookings(event.target.value);
    });

    clearBookingsBtn.addEventListener('click', () => {
        const shouldClear = window.confirm('Delete all saved booking records?');

        if (!shouldClear) {
            return;
        }

        saveStorageBookings([]);
        renderBookings();
        showBookingStatus('All booking records were cleared.', 'success', bookingStatus);
    });

    renderBookings();
}
