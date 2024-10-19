// Array of mentors with their details
const mentors = [
  {
    name: "Dr. Birmohan Singh",
    image: "Mentorship/images/Dr.Birmohan_singh.jpg",
    phone: "+91-1672-253208",
    educationalQualification: "Ph.D., M.E.",
    email: "birmohansingh@sliet.ac.in, birmohans@gmail.com"
  },
  {
    name: "Dr. Damanpreet Singh",
    image: "Mentorship/images/Dr.Damanpreet_singh.jpg",
    phone: "+91-1672-253210",
    educationalQualification: "Ph.D., M.Tech, B.Tech.",
    email: "damanpreets@sliet.ac.in"
  },
  // Add other mentors here
];

// Function to generate mentor profiles (flashcards)
function displayMentors() {
  const mentorList = document.getElementById('mentor-list');

  // Clear any existing mentor cards
  mentorList.innerHTML = '';

  mentors.forEach(mentor => {
    const mentorDiv = document.createElement('div');
    mentorDiv.classList.add('mentor-card');

    mentorDiv.innerHTML = `
      <h2>${mentor.name}</h2>
      <img src="${mentor.image}" alt="${mentor.name}">
      <p>Phone: ${mentor.phone}</p>
      <button class="view-details" data-name="${mentor.name}">View Details</button>
    `;

    mentorList.appendChild(mentorDiv);
  });

  // Add click event to all "View Details" buttons
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', openModal);
  });
}

// Function to open the modal and display mentor details
function openModal(event) {
  const name = event.target.getAttribute('data-name');
  const mentor = mentors.find(m => m.name === name);

  if (mentor) {
    document.getElementById('mentor-name').textContent = mentor.name;
    document.getElementById('mentor-image').src = mentor.image;
    document.getElementById('mentor-info').textContent = `Phone: ${mentor.phone}`;
    document.getElementById('mentor-experience').textContent = `Qualification: ${mentor.educationalQualification}`;
    document.getElementById('mentor-slots').innerHTML = `<li>${mentor.email}</li>`;

    document.getElementById('mentor-modal').style.display = 'block';
  }
}

// Close modal when the close button is clicked
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('mentor-modal').style.display = 'none';
});

// Close modal when clicking outside the modal
window.onclick = function (event) {
  if (event.target == document.getElementById('mentor-modal')) {
    document.getElementById('mentor-modal').style.display = 'none';
  }
};

// Event listener for the "Add Mentor" button
document.getElementById('add-mentor-button').addEventListener('click', displayMentors);
