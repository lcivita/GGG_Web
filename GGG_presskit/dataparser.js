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

    let features = xml.getElementsByTagName('feature');

    let featuresList = document.getElementById("features-list");
        for (let i = 0; i < features.length; i++) {
            let featureText = features[i].childNodes[0].nodeValue;
            let li = document.createElement("li");
            li.innerHTML = featureText;
            featuresList.appendChild(li);
        }

        let videos = xml.getElementsByTagName('video');

        let videoList = document.getElementById("videos-list");
            for (let i = 0; i < videos.length; i++) {
                let videoSrc = videos[i].childNodes[0].nodeValue;
                let embed = document.createElement("iframe");
                embed.className = "embedded-video";
                embed.src = "https://www.youtube.com/embed/"+ videoSrc;
                videoList.appendChild(embed);
            }

    let images = xml.getElementsByTagName("images");
    let imageList = document.getElementById("images-list");
            for (let i = 0; i < images.length; i++) {
                let imgSrc = images[i].childNodes[0].nodeValue;
                let embed = document.createElement("img");
                embed.className = "embedded-image";
                embed.src = "imgAndVid/" + imgSrc;
                imageList.appendChild(embed);
            }

    let logos = xml.getElementsByTagName("logo_and_icon");
    let logosList = document.getElementById("logo-and-icon-list");
        for (let i = 0; i < logos.length; i++) {
            let logosSrc = logos[i].childNodes[0].nodeValue;
            let embed = document.createElement("img");
            embed.src = "imgAndVid/" + logosSrc;
            logosList.appendChild(embed);
        }

    let monetization = xml.getElementsByTagName("monetization")[0].childNodes[0].nodeValue;
    document.getElementById("monetization").innerHTML = monetization;

    let linkText = xml.getElementsByTagName("link_text");
    let links = xml.getElementsByTagName("link");
    let addtlLinksList = document.getElementById("additional-links-list");
    for (let i = 0; i < links.length; i++) {
        let linksSrc = links[i].childNodes[0].nodeValue;
        let linksTextSrc = linkText[i].childNodes[0].nodeValue;
        let linkInnerText = document.createTextNode(linksTextSrc);
        let link = document.createElement("a");
        link.href = linksSrc;
        link.appendChild(linkInnerText);
        addtlLinksList.appendChild(link);
    }

    let about = xml.getElementsByTagName("about")[0].childNodes[0].nodeValue;
    document.getElementById("about").innerHTML = about;;

    let creditSubtitle = xml.getElementsByTagName("credit-subtitle");
    let creditName = xml.getElementsByTagName("credit-name");
    let creditLink = xml.getElementsByTagName("credit-link");
    let creditsList = document.getElementById("credits-list");
    for (let i = 0; i < creditLink.length; i++) {
        let linksSrc = creditLink[i].childNodes[0].nodeValue;
        let linksTextSrc = creditSubtitle[i].childNodes[0].nodeValue;
        let titleSrc = creditName[i].childNodes[0].nodeValue;
        let title = document.createElement("p");
        title.innerHTML = titleSrc;
        let linkSubtitleText = document.createTextNode(linksTextSrc);
        //linkSubtitleText.classList.add("subtitle")
        let link = document.createElement("a");
        link.className = "subtitle";
        link.href = linksSrc;
        link.appendChild(linkSubtitleText);
        creditsList.appendChild(title);
        creditsList.appendChild(link);
    }

    let contactInfo = xml.getElementsByTagName("contact");
    contact = document.getElementById("contact");
    for (let i = 0; i < contactInfo.length; i++) {
        let contactText = contactInfo[i].childNodes[0].nodeValue;
        let text = document.createElement("p");
        text.className = "contact";
        text.innerHTML = contactText
        contact.appendChild(text);
    }

    let siteLink = xml.getElementsByTagName("site-link")[0].childNodes[0].nodeValue;
    let siteInnerText = document.createTextNode(siteLink);
    let siteText = document.createElement("a");
    siteText.className = "contact";
    siteText.href = siteLink;
    siteText.appendChild(siteInnerText);
    contact.appendChild(siteText);




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