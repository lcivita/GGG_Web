fetch('content.xml')
.then(response => response.text())
.then(data => {
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "text/xml");

    let pageTitle = xml.getElementsByTagName("title")[0].innerHTML;
    document.getElementById("page-title").innerHTML = pageTitle;

    let studioName = xml.getElementsByTagName("studio")[0].innerHTML;
    document.getElementById("studio-name").innerHTML = studioName;

    let description = xml.getElementsByTagName("description")[0].innerHTML;
    document.getElementById("description").innerHTML = description;

    let history = xml.getElementsByTagName("history")[0].innerHTML;
    document.getElementById("history").innerHTML = history;

    let features = xml.getElementsByTagName("features")[0].innerHTML;
    document.getElementById("features").innerHTML = features;



    // let items = xml.getElementsByTagName('item');

    // // Prepare HTML content
    // let content = "";
    // for (let i = 0; i < items.length; i++) {
    //     let name = items[i].getElementsByTagName('name')[0].textContent;
    //     let description = items[i].getElementsByTagName('description')[0].textContent;
    //     content += `<h2>${name}</h2><p>${description}</p>`;
    // }

    // // Insert the content into the target document
    // document.getElementById('content').innerHTML = content;
})
.catch(error => console.error('Error fetching XML:', error));