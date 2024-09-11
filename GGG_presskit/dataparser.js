fetch('content.xml')
.then(response => response.text())
.then(data => {
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "text/xml");

    let pageTitle = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    document.getElementById("page-title").innerHTML = pageTitle;

    let studioName = xml.getElementsByTagName("studio")[0].childNodes[0].nodeValue;
    document.getElementById("studio-name").innerHTML = studioName;

    let description = xml.getElementsByTagName("description")[0].childNodes[0].nodeValue;
    document.getElementById("description").innerHTML = description;

    let history = xml.getElementsByTagName("history")[0].childNodes[0].nodeValue;
    document.getElementById("history").innerHTML = history;

    let features = xml.getElementsByTagName("features")[0].childNodes[0].nodeValue;
    document.getElementById("features").innerHTML = features;

    let videos = xml.getElementsByTagName("videos")[0].childNodes[0].nodeValue;
    document.getElementById("videos").innerHTML = features;

    let images = xml.getElementsByTagName("images")[0].childNodes[0].nodeValue;
    document.getElementById("images").innerHTML = features;

    let logoAndIcon = xml.getElementsByTagName("logo_and_icon")[0].childNodes[0].nodeValue;
    document.getElementById("logo_and_icon").innerHTML = features;

    let monetization = xml.getElementsByTagName("monetization")[0].childNodes[0].nodeValue;
    document.getElementById("monetization").innerHTML = features;

    let additionalLinks = xml.getElementsByTagName("additional_links")[0].childNodes[0].nodeValue;
    document.getElementById("additional_links").innerHTML = features;

    let about = xml.getElementsByTagName("about")[0].childNodes[0].nodeValue;
    document.getElementById("about").innerHTML = features;

    let credits = xml.getElementsByTagName("credits")[0].childNodes[0].nodeValue;
    document.getElementById("credits").innerHTML = features;

    let contact = xml.getElementsByTagName("contact")[0].childNodes[0].nodeValue;
    document.getElementById("contact").innerHTML = features;



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