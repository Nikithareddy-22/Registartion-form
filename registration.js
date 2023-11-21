// Function to save data to Local Storage
function saveToLocalStorage(name, email, password, dob, acceptedTerms) {
    // Retrieve existing data from Local Storage or initialize an empty array
    let userData = JSON.parse(localStorage.getItem('userData')) || [];
  
    // Add the new form data to the array
    userData.push({ name, email, password, dob, acceptedTerms });
  
    // Save updated data back to Local Storage
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  
  // Function to display user data from Local Storage in the table
  function displayUserDataFromStorage() {
    let userData = JSON.parse(localStorage.getItem('userData'));
  
    if (userData) {
      var userDataBody = document.getElementById('userDataBody');
      
      // Loop through stored data and populate the table
      userData.forEach(function(user) {
        var newRow = userDataBody.insertRow();
        newRow.insertCell(0).innerHTML = user.name;
        newRow.insertCell(1).innerHTML = user.email;
        newRow.insertCell(2).innerHTML = user.password;
        newRow.insertCell(3).innerHTML = user.dob;
        newRow.insertCell(4).innerHTML = user.acceptedTerms ? 'Yes' : 'No';
      });
    }
  }
  
  // Call displayUserDataFromStorage on page load
  window.onload = function() {
    displayUserDataFromStorage();
  };
// Function to handle form submission
function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dob = document.getElementById('dob').value;
    var acceptedTerms = document.getElementById('acceptedTerms').checked;
  
    if (name === '' || email === '' || password === '' || dob === '' || !acceptedTerms) {
      alert('Please fill in all fields.');
      return false;
    }
  
    var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid Gmail address.');
      return false;
    }
  
    // Validate date format
    var dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      alert('Please enter a valid date of birth.');
      return false;
    }
  
    // Calculate age based on the entered date of birth
    var today = new Date();
    var age = today.getFullYear() - dobDate.getFullYear();
    var monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
  
    // Check if the calculated age is within the required range
    if (age < 18 || age > 55) {
      alert('Age must be between 18 and 55 years old.');
      return false;
    }
  
    // Save submitted data to Local Storage
    saveToLocalStorage(name, email, password, dob, acceptedTerms);
  
    // Clear form fields after submission
    document.getElementById('registrationForm').reset();
  
    // Refresh the table display with updated data
    document.getElementById('userDataBody').innerHTML = '';
    displayUserDataFromStorage();
  
    return true;
}

