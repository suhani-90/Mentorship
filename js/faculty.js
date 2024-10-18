let timeSlots = [];

// Function to initialize the page
function initializePage() {
    populateHours();
    populateMinutes();
    renderTimeSlots();
}

// Function to populate hours dropdown (1-12)
function populateHours() {
    const startHour = document.getElementById('startHour');
    const endHour = document.getElementById('endHour');
    
    for (let i = 1; i <= 12; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        
        const startOption = document.createElement('option');
        startOption.value = hour;
        startOption.textContent = hour;
        startHour.appendChild(startOption);
        
        const endOption = document.createElement('option');
        endOption.value = hour;
        endOption.textContent = hour;
        endHour.appendChild(endOption);
    }
}

// Function to populate minutes dropdown (00-55, increment by 5)
function populateMinutes() {
    const startMinute = document.getElementById('startMinute');
    const endMinute = document.getElementById('endMinute');
    
    for (let i = 0; i < 60; i += 5) {
        const minute = i < 10 ? `0${i}` : `${i}`;
        
        const startOption = document.createElement('option');
        startOption.value = minute;
        startOption.textContent = minute;
        startMinute.appendChild(startOption);
        
        const endOption = document.createElement('option');
        endOption.value = minute;
        endOption.textContent = minute;
        endMinute.appendChild(endOption);
    }
}

// Function to convert 12-hour format to 24-hour format
function convertTo24Hour(hour, ampm) {
    hour = parseInt(hour);
    if (ampm === 'PM' && hour !== 12) {
        hour += 12;
    } else if (ampm === 'AM' && hour === 12) {
        hour = 0;
    }
    return hour;
}

// Function to validate time range (9 AM to 5 PM)
function isTimeWithinRange(hour, minute, ampm) {
    const time = convertTo24Hour(hour, ampm);
    const minuteInt = parseInt(minute);

    // 9:00 AM in 24-hour format is 9:00, and 5:00 PM is 17:00
    const startTime = 9 * 60;  // 9:00 AM in minutes
    const endTime = 17 * 60;   // 5:00 PM in minutes

    const currentTime = time * 60 + minuteInt; // Convert time to total minutes

    // Ensure the time is between 9:00 AM (540 minutes) and 5:00 PM (1020 minutes)
    return currentTime >= startTime && currentTime <= endTime;
}

// Function to add a new time slot
function addTimeSlot() {
    const startHour = document.getElementById('startHour').value;
    const startMinute = document.getElementById('startMinute').value;
    const startAmPm = document.getElementById('startAmPm').value;
    const endHour = document.getElementById('endHour').value;
    const endMinute = document.getElementById('endMinute').value;
    const endAmPm = document.getElementById('endAmPm').value;
    const errorMessageDiv = document.getElementById('errorMessage');

    // Validate time slot
    if (!startHour || !startMinute || !endHour || !endMinute) {
        errorMessageDiv.textContent = 'Please select all time fields';
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Check if the time slot is within the allowed range (9 AM to 5 PM)
    if (!isTimeWithinRange(startHour, startMinute, startAmPm) || !isTimeWithinRange(endHour, endMinute, endAmPm)) {
        errorMessageDiv.textContent = 'Time slots can only be added between 9 AM and 5 PM';
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Clear error message if the time is valid
    errorMessageDiv.style.display = 'none';

    const newSlot = {
        start: `${startHour}:${startMinute} ${startAmPm}`,
        end: `${endHour}:${endMinute} ${endAmPm}`
    };

    timeSlots.push(newSlot);
    renderTimeSlots();
}

// Function to delete a time slot
function deleteTimeSlot(index) {
    timeSlots.splice(index, 1);
    renderTimeSlots();
}

// Function to render time slots
function renderTimeSlots() {
    const timeSlotsDiv = document.getElementById('timeSlots');
    timeSlotsDiv.innerHTML = '';
    timeSlots.forEach((slot, index) => {
        const slotElement = document.createElement('div');
        slotElement.className = 'time-slot';
        slotElement.innerHTML = `
            <span>${slot.start} - ${slot.end}</span>
            <button onclick="deleteTimeSlot(${index})" class="delete-btn">Delete</button>
        `;
        timeSlotsDiv.appendChild(slotElement);
    });
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
