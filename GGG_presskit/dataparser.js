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

    ///trouble area

    let features = xml.getElementsByTagName('feature');

    let featuresList = document.getElementById("features-list");
        for (let i = 0; i < features.length; i++) {
            console.log(features[i].childNodes[0].nodeValue);
            // Extract the text content of each <feature> tag
            let featureText = features[i].childNodes[0].nodeValue;
            let li = document.createElement("li");
            li.innerHTML = featureText;
            featuresList.appendChild(li);
        }
    
 
    
    // let ul = document.getElementById("features-list");

    // for (let i = 0; i < features.length; i++){
    //     console.log(xml.getElementsByTagName('feature')[i].childNodes[0].nodeValue)
    //     let li = document.createElement("li");
    //     li.innerHTML = xml.getElementsByTagName('feature')[i].childNodes[0].nodeValue;
    //     ul.appendChild(li);
    // }
    // document.getElementById('features').innerHTML = features;

    ///trouble area

    let videos = xml.getElementsByTagName("videos")[0].childNodes[0].nodeValue;
    document.getElementById("videos").innerHTML = videos;

    let images = xml.getElementsByTagName("images")[0].childNodes[0].nodeValue;
    document.getElementById("images").innerHTML = images;

    let logoAndIcon = xml.getElementsByTagName("logo_and_icon")[0].childNodes[0].nodeValue;
    document.getElementById("logo_and_icon").innerHTML = logoAndIcon;

    let monetization = xml.getElementsByTagName("monetization")[0].childNodes[0].nodeValue;
    document.getElementById("monetization").innerHTML = monetization;

    let additionalLinks = xml.getElementsByTagName("additional_links")[0].childNodes[0].nodeValue;
    document.getElementById("additional_links").innerHTML = additionalLinks;

    let about = xml.getElementsByTagName("about")[0].childNodes[0].nodeValue;
    document.getElementById("about").innerHTML = about;

    let credits = xml.getElementsByTagName("credits")[0].childNodes[0].nodeValue;
    document.getElementById("credits").innerHTML = credits;

    let contact = xml.getElementsByTagName("contact")[0].childNodes[0].nodeValue;
    document.getElementById("contact").innerHTML = contact;



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