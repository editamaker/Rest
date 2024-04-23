// Newsletter handling

// Get reference to the form and email input elements
const form = document.querySelector('form');
const emailInput = document.querySelector('#email');

// Add submit event listener to the form
form.addEventListener('submit', function(event){
    // Prevent the default form submission behavior
    event.preventDefault();

    // Trim and get the value of the email input
    const emailValue = emailInput.value.trim();

    // Check if the entered email is valid
    if (!isValidEmail(emailValue)){
        // If not valid, show an alert, focus on the email input, and stop further processing
        alert('Please enter a valid email address');
        emailInput.focus();
    } else {
        // If valid, submit the form
        form.submit();
    }
});

// Function to check the validity of an email using a regular expression
function isValidEmail(email){
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}


