// Sample faculty data (in a real application, this would come from a backend)
const facultyData = [
  {
      id: 1,
      name: "Dr. Tajinder Singh",
      image: "images/Dr.Tajinder Singh.jpg",
      info: "Professor of Computer Science",
      experience:"10 years",
      expertise:"AI-ML Expert",
      timeSlots: ["Monday 10:00 AM", "Wednesday 2:00 PM", "Friday 11:00 AM"]
  },
  {
      id: 2,
      name: "Prof. Manoj Sanchan",
      image: "images/Dr.ManojSanchan.jpg",
      info: "Associate Professor of Mathematics",
      experience:"10 years",
      expertise:"Database Management System",
      timeSlots: ["Tuesday 1:00 PM", "Thursday 3:00 PM"]
  }
  // Add more faculty members as needed
];

// Function to create faculty cards
function createFacultyCards() {
  const facultyList = document.getElementById('faculty-list');
  facultyData.forEach(faculty => {
      const card = document.createElement('div');
      card.className = 'faculty-card';
      card.innerHTML = `
          <img src="${faculty.image}" alt="${faculty.name}">
          <h2>${faculty.name}</h2>
          <p>${faculty.info} </p>  Experience: ${faculty.experience} | Expertise: ${faculty.expertise} </p>

            
          <button class="book-slot-btn" data-id="${faculty.id}">Book Slot</button>
      `;
      facultyList.appendChild(card);
  });
}

// Function to open booking modal
function openBookingModal(facultyId) {
  const faculty = facultyData.find(f => f.id === facultyId);
  const modal = document.getElementById('booking-modal');
  const facultyName = document.getElementById('faculty-name');
  const facultyImage = document.getElementById('faculty-image');
  const facultyInfo = document.getElementById('faculty-info');
  const timeSlots = document.getElementById('time-slots');

  facultyName.textContent = faculty.name;
  facultyImage.src = faculty.image;
  facultyInfo.textContent = faculty.info;

  timeSlots.innerHTML = '';
  faculty.timeSlots.forEach(slot => {
      const li = document.createElement('li');
      li.innerHTML = `
          ${slot}
          <button class="book-time-slot" data-faculty-id="${faculty.id}" data-slot="${slot}">Book</button>
      `;
      timeSlots.appendChild(li);
  });

  modal.style.display = 'block';
}

// Function to close booking modal
function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  modal.style.display = 'none';
}

// Function to book a time slot
function bookTimeSlot(facultyId, timeSlot) {
  // In a real application, this would send a request to the backend
  alert(`Booked ${timeSlot} with faculty ID ${facultyId}`);
  closeBookingModal();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  createFacultyCards();

  document.getElementById('faculty-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('book-slot-btn')) {
          const facultyId = parseInt(e.target.getAttribute('data-id'));
          openBookingModal(facultyId);
      }
  });

  document.querySelector('.close').addEventListener('click', closeBookingModal);

  document.getElementById('time-slots').addEventListener('click', (e) => {
      if (e.target.classList.contains('book-time-slot')) {
          const facultyId = parseInt(e.target.getAttribute('data-faculty-id'));
          const timeSlot = e.target.getAttribute('data-slot');
          bookTimeSlot(facultyId, timeSlot);
      }
  });

  window.addEventListener('click', (e) => {
      if (e.target == document.getElementById('booking-modal')) {
          closeBookingModal();
      }
  });
});