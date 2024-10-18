const subjects = ["DBMS", "OOP", "AI", "Blockchain", "Cybersecurity"];
let subjectIndex = 0;
let charIndex = 0;
let isDeleting = false;
const changingText = document.querySelector(".changing-text");

function typeText() {
    const currentWord = subjects[subjectIndex];
    const displayedText = currentWord.substring(0, charIndex);

    changingText.textContent = displayedText;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++; // Type forward
        setTimeout(typeText, 150); // Typing speed
    } else if (isDeleting && charIndex > 0) {
        charIndex--; // Delete backward
        setTimeout(typeText, 100); // Deletion speed
    } else {
        isDeleting = !isDeleting;

        // Move to the next word after a pause
        if (!isDeleting) {
            subjectIndex = (subjectIndex + 1) % subjects.length;
            setTimeout(typeText, 1000); // Pause before typing new word
        } else {
            setTimeout(typeText, 500); // Pause before deleting
        }
    }
}

// Start the typewriter effect
typeText();
