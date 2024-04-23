// find us modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// This code is written in jQuery and is meant to be executed when the document is fully loaded and ready.
$(document).ready(function() {
  // This code selects the HTML form element with the ID "newsletter-form" and attaches an event handler to it.
  // It's listening for the form's submission event.
  $('#newsletter-form').submit(function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get the form values
    var email = $('#email').val().trim();
    var newsletter = $('#checkbox').is(':checked');

    // Perform client-side form validation
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Process the form data
    // This code is using jQuery's $.ajax() function to make an asynchronous HTTP request.
    $.ajax({
      url: '/submit-form.js',
      type: 'POST',
      data: {
        email: email,
        newsletter: newsletter
      },
      success: function(response) {
        // Handle the server's response here
        showMessage('Thank you for subscribing!', 'success');
        $('#newsletter-form')[0].reset(); // Reset the form
      },
      error: function(xhr, status, error) {
        showMessage('An error occurred. Please try again later.', 'error');
        console.log(xhr.responseText);
      }
    });
  });

  // The type of the message, which can be "success" or "error."
function showMessage(message, type) {
  var messageContainer = $('#message-container');
  messageContainer.text(message);

  // It removes all CSS classes from the message container and adds CSS classes based on the message type.
  messageContainer.removeClass().addClass(type);

  // Display a countdown message for 10 seconds.
  var countdown = 10;
  var countdownInterval = setInterval(function() {
    messageContainer.html(`Page will reload in ${countdown} second${countdown !== 1 ? 's' : ''}`);
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      // Reload the page after the countdown.
      window.location.reload();
    }
  }, 1000);
}
});
