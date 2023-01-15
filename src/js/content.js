isLoggedIn = false;
init();

function init(){
	var popup = document.createElement('div');
	popup.setAttribute("id", "ab_popup");

	var popup_inner = `
		<link id="ab_styles" rel="stylesheet" href="${chrome.runtime.getURL("src/css/content.css")}">
		<div id="ab_body"></div>`;

	popup.innerHTML += popup_inner;
	document.body.appendChild(popup);
}


chrome.runtime.onMessage.addListener((msg, sender, res) => {
	if(msg.action == "ext_clicked" || msg.action == "close_page") {
		if(document.querySelector("#ab_popup .popup")){
			toggleIframe();
		}
		else if(isLoggedIn){
			openMainPage();
		}
		else{
			openLoginPage();
		}
	}
	else if(msg.action == "logged_in") {
		setTimeout(()=>{
			isLoggedIn = true;
			openMainPage(msg.url);
		}, 3000);
	}
	else if(msg.action == "page_url") {
		res(document.URL);
	}
	else if(msg.action == "context-menu-clicked") {
		if(isLoggedIn){
			openMainPage(msg.url);
		}
		else{
			openLoginPage(msg.url);
		}
	}
});

function toggleIframe(){
	if(document.querySelector("#ab_popup .popup").classList.contains("hidden")){
		document.querySelector("#ab_popup .popup").classList.remove("hidden");
	}
	else{
		document.querySelector("#ab_popup .popup").classList.add("hidden");
	}
}

function openLoginPage(url) {
	document.getElementById("ab_body").innerHTML = "<iframe class='popup ab_login_popup' src='" + chrome.runtime.getURL("src/html/login.html?url=") + url + "'></iframe>";
}

function openMainPage(url){
	document.getElementById("ab_body").innerHTML = "<iframe class='popup ab_main_popup' src='" + chrome.runtime.getURL("src/html/main.html?url=")+ url + "'></iframe>";
}
