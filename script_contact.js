document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var jsonObject = {};
    formData.forEach(function(value, key){
        jsonObject[key] = value;
    });
    var jsonData = JSON.stringify(jsonObject);
    console.log(jsonData); // For demonstration, you can send this data to server using AJAX
    document.getElementById("contactForm").reset();
    document.getElementById("successMessage").style.display = "block";
  });
  