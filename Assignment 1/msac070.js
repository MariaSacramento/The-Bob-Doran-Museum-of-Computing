window.onload = function(){
    showHomeTab();
}

function showHomeTab(){
    document.getElementById("homePage").style.display="block";
    document.getElementById("news").style.display="none";
    document.getElementById("display").style.display="none";
    document.getElementById("guestbook").style.display="none";

    document.getElementById("homeTab").setAttribute("style","margin-right:10px; background-color:#FEC925"); //#f2f2f2
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("displayTab").style.backgroundColor = "transparent";
    document.getElementById("guestbookTab").style.backgroundColor = "transparent";
}


// NEWS function
function getNews(){
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader('Accept','application/JSON');
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        showNews(resp);
    }
    xhr.send(null);

}

function showNews(destinations) {
    document.getElementById("homePage").style.display="none";
    document.getElementById("news").style.display="block";
    document.getElementById("display").style.display="none";
    document.getElementById("guestbook").style.display="none";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").setAttribute("style","margin-right:10px; background-color:#FEC925");
    document.getElementById("displayTab").style.backgroundColor = "transparent";
    document.getElementById("guestbookTab").style.backgroundColor = "transparent";

    let newsContent = "<div class='row'>"
    addRecord= (record) => {
        let news = "<div>" + "<h2>" + record.titleField + "</h2>" + "</div>";
        news += "<div id='image'> <img style='width:250px' src='" + record.enclosureField.urlField + "' alt='image'></img> </div>";
        news += "<div>" + "<h3>" + record.pubDateField + "</h3> " + "</div>";
        news += "<div>" + "<p>" + record.descriptionField + "</p>" + "</div>";
        
        newsContent += news;
    }
    destinations.forEach(addRecord);
    newsContent += "</div>"
    document.getElementById("news").innerHTML = newsContent;

 }

 //DISPLAY function
 function getDisplay(){
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader('Accept','application/JSON');
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        showDisplay(resp);
    }
    xhr.send(null);
}


function showDisplay(destinations){
    document.getElementById("homePage").style.display="none";
    document.getElementById("news").style.display="none";
    document.getElementById("display").style.display="block";
    document.getElementById("guestbook").style.display="none";
    document.getElementById("searchBar").style.display="block";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("displayTab").setAttribute("style","margin-right:10px; background-color:#FEC925");
    document.getElementById("guestbookTab").style.backgroundColor = "transparent";

    let displayContent= "<div class='displayContent'>";
    displayRecord = (record) => {
        let imageId = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" + record.ItemId;
        let display = "<div>" + "<h2>" + record.Title + "</h2>" + "</div>";
        display += "<div><img style='width:250px' src='" + imageId + "' alt='image'></img></div>"
        display += "<div>" + record.Description + "</div>";
        displayContent += display;
    }
    destinations.forEach(displayRecord);
    displayContent += "</div>"
    document.getElementById("displayItems").innerHTML = displayContent;

}



//GUESTBOOK function
function getHTMLComment(){

    document.getElementById("homePage").style.display="none";
    document.getElementById("news").style.display="none";
    document.getElementById("display").style.display="none";
    document.getElementById("guestbook").style.display="block";
    document.getElementById("searchBar").style.display="none";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("displayTab").style.backgroundColor = "transparent";
    document.getElementById("guestbookTab").setAttribute("style","margin-right:10px; background-color:#FEC925");

    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name="+ document.getElementById("userName").value; //if not working add string
    const xhr = new XMLHttpRequest();
    xhr.open("POST", uri, true);
    xhr.setRequestHeader('Content-Type','application/JSON');
    xhr.send("\""+document.getElementById("userComment").value+"\"");
    document.getElementById("userName").value = "";
    document.getElementById("userComment").value = "";
    }

//refreshes the iframe every 1 second.
window.setInterval("refreshFrame();", 1000); 
function refreshFrame(){ 
    var frame = document.getElementsByName("frame")[0];//refreshes automatically
    frame.src = frame.src;
}



function getValues(){
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/version";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader('Accept','application/JSON');
    xhr.onload = () => {
       const resp = JSON.parse(xhr.responseText);
       alert(xhr.responseText); //pop up to show what's on the JSON
    }
    xhr.send(null);//edit for guestbook
    console.log("")
}


function displaySearchBar(){
    let userInputValue = document.getElementById("displaySearchBar").value;
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=" + userInputValue;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader('Accept','application/JSON');
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        showDisplay(resp);
    }
    xhr.send(null);
}





