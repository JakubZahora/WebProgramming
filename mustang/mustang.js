var contactContainer = document.getElementById("contact-info");
var contacts = [];
var contactURLs = [];
var loadingContact = 0;

function loadClass() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    request.onload = function() {
        contactURLs.length = 0;
        classIndex = JSON.parse(request.responseText);
        document.getElementById("index-info").innerHTML = JSON.stringify(classIndex);
        for (i=0; i<classIndex.length; i++) {
            contactURLs.push(classIndex[i].ContactURL);
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