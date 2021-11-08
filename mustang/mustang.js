var contactURLs = [];
var contacts = [];
var loadingContact = 0;
var contactContainer = document.getElementById("contact-info");

function loadClass() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    request.onload = function() {
        contactURLs.length = 0;
        contactIndex = JSON.parse(request.responseText);
        document.getElementById("index-info").innerHTML = JSON.stringify(contactIndex);
        for (i=0; i<contactIndex.length; i++) {
            contactURLs.push(contactIndex[i].ContactURL);
        }
        console.log("contactURLs: " + JSON.stringify(contactURLs));
    }
    request.send();
}

function loadContacts() {
    if (contactURLs.length > loadingContact) {
        loadNextContact(contactURLs[loadingContact]);
    }
}

function loadNextContact(URL) {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("Contact: " + contact.firstName);
        contacts.push(contact);
        //renderHTML(contact);
        document.getElementById("contact-info").innerHTML = JSON.stringify(contacts);

        loadingContact++;
        if (contactURLs.length > loadingContact) {
            loadNextContact(contactURLs[loadingContact]);
        }
    }

    contactRequest.send();
}

function renderHTML(data) {
    var htmlString = "";

    for (i=0; i < data.length; i++) {
        htmlString += "<p>" + data[i] + "</p>";
    }

    contactContainer.insertAdjacentHTML('beforeend', htmlString); // Not working...
}