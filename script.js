function searchCustomer() {
  var searchCustomerId = document.getElementById('searchcustId').value;
  var customerProfile = document.getElementById('profile-data');

  if (!searchCustomerId) {
      alert('Please enter a customer ID');
      return;
  }

  // Check if the customer ID matches the ID in the customer profile
  var customerIdSpan = customerProfile.querySelector('#cust_id');
  if (customerIdSpan && customerIdSpan.textContent === searchCustomerId) {
      var email = customerProfile.querySelector('#email').textContent;
      var phone = customerProfile.querySelector('#phone').textContent;
      var address = customerProfile.querySelector('#address').textContent;
      var payment = customerProfile.querySelector('#payment').textContent;
      var stayHistNotes = customerProfile.querySelector('#stay_hist_notes').textContent;
      var marketingConsent = customerProfile.querySelector('#marketingConsent').textContent;
      var retentionExpiry = customerProfile.querySelector('#retention-expiry').textContent;

      var searchCustomerData = `
          <h3>Customer Details</h3>
          <p><b>Customer ID:</b> ${searchCustomerId}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Address:</b> ${address}</p>
          <p><b>Payment:</b> ${payment}</p>
          <p><b>Previous Stay Notes:</b> ${stayHistNotes}</p>
          <p><b>Data Retention Expiry:</b> ${retentionExpiry}</p>
          <p><b>Marketing Consent:</b> ${marketingConsent}</p>
      `;
      document.getElementById('searchCustomerData').innerHTML = searchCustomerData;
  } else {
      document.getElementById('searchCustomerData').textContent = 'Customer not found';
  }
}



function dataCaptureEnabled(retentionExpiryElement) {
  var dataCaptureStatus = document
    .getElementById("dataCaptureStatus")
    .getElementsByTagName("span")[0].textContent;

  // Check if data capture is off, then display N/A
  if (dataCaptureStatus === "OFF") {
    retentionExpiryElement.textContent = "N/A";
    toggleMarketingConsent(dataCaptureStatus);
    // marketingConsent.textContent = 'OFF';
    return false;
  }
  return true;
}

function toggleDataCapture() {
  var status = document
    .getElementById("dataCaptureStatus")
    .getElementsByTagName("span")[0];
  status.textContent = status.textContent === "ON" ? "OFF" : "ON";
  if (status.textContent === "OFF") {
    document
      .getElementById("marketingConsentStatus")
      .getElementsByTagName("span")[0].textContent = "OFF";
  }
  updateCustomerData();
}

function toggleMarketingConsent(dataCaptureStatus) {
  if (dataCaptureStatus === "OFF") {
    return;
  }
  var status = document
    .getElementById("marketingConsentStatus")
    .getElementsByTagName("span")[0];
  //check for data capture status
  status.textContent = status.textContent === "ON" ? "OFF" : "ON";
  updateCustomerData();
}

function updateDataRetention() {
  var retentionDays = parseInt(document.getElementById("retentionDays").value);
  var retentionExpiryElement = document.getElementById("retention-expiry");
  
  // Check if retentionDays is valid (greater than 0)
  if (retentionDays <= 0 || isNaN(retentionDays)) {
    alert("Please input a valid positive number");
    return; // exit the function early
  }

  //check for data capture status
  if (!dataCaptureEnabled(retentionExpiryElement)) {
    console.log("Data capture is off");
    return;
  }
  // Calculate the expiry date based on the current date and the entered number of days
  var currentDate = new Date();
  var expiryDate = new Date(
    currentDate.getTime() + retentionDays * 24 * 60 * 60 * 1000
  );

  // Update the data retention status
  retentionExpiryElement.textContent = expiryDate.toLocaleString();

  // Update customer data
  updateCustomerData();
}

function updateCustomerData() {
  var dataCaptureStatus = document
    .getElementById("dataCaptureStatus")
    .getElementsByTagName("span")[0].textContent;
  var marketingConsentStatus = document
    .getElementById("marketingConsentStatus")
    .getElementsByTagName("span")[0].textContent;
  var retentionExpiry = document.getElementById("retention-expiry").textContent;


  var custid = document.getElementById("cust_id");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var address = document.getElementById("address");
  var payment = document.getElementById("payment");
  var stay_hist_notes = document.getElementById("stay_hist_notes");
  var marketingConsent = document.getElementById("marketingConsent");
  var disclosure = document.getElementById("disclosure");
  var dataRetentionExpiry = document.getElementById("retention-expiry");

  if (dataCaptureStatus === "OFF") {
    custid.textContent = "123456789";
    email.textContent = "Restricted due to UK regulation";
    phone.textContent = "Restricted due to UK regulation";
    address.textContent = "Restricted due to UK regulation";
    payment.textContent = "Restricted due to UK regulation";
    stay_hist_notes.textContent = "Restricted due to UK regulation";
    dataRetentionExpiry.textContent = "N/A";
    marketingConsent.textContent = "No";
  } else {
    custid.textContent = "123456789";
    email.textContent = "john.doe@example.com";
    phone.textContent = "+44 1234 567890";
    address.textContent = "123 Main Street, London, UK";
    payment.textContent = "375784269553006 (serialized)";
    stay_hist_notes.textContent =
      "Had a lovely stay in NYC on July 4th weekend. Clean and respectful. Even said Ryan should get the job :)";
  }

  if (marketingConsentStatus == "ON") {
    marketingConsent.textContent = "Yes- ";
    disclosure.textContent =
      "Disclosure type 1: By providing your information, you consent to its use in accordance with our Privacy Policy. We may use your data to send you marketing materials, and you can opt out at any time.";
  } else {
    marketingConsent.textContent = "No";
    disclosure.textContent = "";
  }
}

// Update customer data on page load
updateCustomerData();
