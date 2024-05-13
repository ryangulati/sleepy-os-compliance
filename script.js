function dataCaptureEnabled(){
    var dataCaptureStatus = document.getElementById('dataCaptureStatus').getElementsByTagName('span')[0].textContent;

    // Check if data capture is off, then display N/A
    if (dataCaptureStatus === 'OFF') {
        retentionExpiryElement.textContent = 'N/A';
        return; // exit the function early
    }
}


function toggleDataCapture() {
    var status = document.getElementById('dataCaptureStatus').getElementsByTagName('span')[0];
    status.textContent = (status.textContent === 'ON') ? 'OFF' : 'ON';
    updateCustomerData();
}


function toggleMarketingConsent() {

    //check for data capture status
    dataCaptureEnabled();

    var status = document.getElementById('marketingConsentStatus').getElementsByTagName('span')[0];
    status.textContent = (status.textContent === 'ON') ? 'OFF' : 'ON';
    updateCustomerData();

}
function updateDataRetention() {
    var retentionDays = parseInt(document.getElementById('retentionDays').value);
    var retentionExpiryElement = document.getElementById('retention-expiry');

    //check for data capture status
    dataCaptureEnabled();
        // Check if retentionDays is valid (greater than 0)
        if (retentionDays <= 0 || isNaN(retentionDays)) {
            return; // exit the function early
        }
    // Calculate the expiry date based on the current date and the entered number of days
    var currentDate = new Date();
    var expiryDate = new Date(currentDate.getTime() + retentionDays * 24 * 60 * 60 * 1000);

    // Update the data retention status
    retentionExpiryElement.textContent = expiryDate.toLocaleString();

    // Update customer data
    updateCustomerData();
}


function updateCustomerData() {
    var dataCaptureStatus = document.getElementById('dataCaptureStatus').getElementsByTagName('span')[0].textContent;
    var marketingConsentStatus = document.getElementById('marketingConsentStatus').getElementsByTagName('span')[0].textContent;
    var retentionExpiry = document.getElementById('retention-expiry').textContent;


    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    var address = document.getElementById('address');
    var marketingConsent = document.getElementById('marketingConsent');
    var disclosure = document.getElementById('disclosure');
    var dataRetentionExpiry = document.getElementById('retention-expiry');

    
    if (dataCaptureStatus === 'OFF') {
        email.textContent = 'Restricted due to UK regulation';
        phone.textContent = 'Restricted due to UK regulation';
        address.textContent = 'Restricted due to UK regulation';
        dataRetentionExpiry.textContent = 'N/A'
    } else {
        email.textContent = 'john.doe@example.com';
        phone.textContent = '+44 1234 567890';
        address.textContent = '123 Main Street, London, UK';
    }


    if (marketingConsentStatus == 'ON') {
        marketingConsent.textContent = 'Yes- ';
        disclosure.textContent ='Disclosure type 1:By providing your information, you consent to its use in accordance with our Privacy Policy. We may use your data to send you marketing materials, and you can opt out at any time.';
    } 
    else {
        marketingConsent.textContent = 'No';
        disclosure.textContent ='';
    }
}


// Update customer data on page load
updateCustomerData();



// ignore all these -- archived 

/*
<section id="data-access">
<h2>Data Access Controls</h2>
<p>Enhanced monitoring and access controls for customer data.</p>
<button onclick="toggleDataAccess()">Toggle Access Control</button>
<div id="dataAccessStatus">Access control is currently: <span>OFF</span></div>
<div><p>The data access toggle demonstrates our ability to handle data processing capabilities based on customer consent. When profiling is disabled, sensitive data like phone and address are redacted, showcasing our commitment to purpose limitation and data minimization principles.</p></div>
</section>


var dataAccessStatus = document.getElementById('dataAccessStatus').getElementsByTagName('span')[0].textContent;

function toggleDataAccess() {
    var status = document.getElementById('dataAccessStatus').getElementsByTagName('span')[0];
    status.textContent = (status.textContent === 'ON') ? 'OFF' : 'ON';
    updateCustomerData();
}

if (dataAccessStatus === 'ON') {
    email.style.color = 'green';
    phone.style.color = 'green';
    address.style.color = 'green';
} else {
    email.style.color = 'black';
    phone.style.color = 'black';
    address.style.color = 'black';
}

*/