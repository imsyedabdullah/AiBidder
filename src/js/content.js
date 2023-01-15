
let isLoggedIn = false;

chrome.storage.local.get("ab_creds").then(res=>{
	if(res?.ab_creds?.timestamp){
		isLoggedIn = true;
	}
	else{
		isLoggedIn = false;
	}
	init();
});


function init(){
	var popup = document.createElement('div');
	popup.setAttribute("id", "ab-popup");

	var popup_inner = `
		<link id="ab-styles" rel="stylesheet" href="${chrome.runtime.getURL("src/css/content.css")}">
		<div id="ab-body"></div>`;

	popup.innerHTML += popup_inner;
	document.body.appendChild(popup);
}


chrome.runtime.onMessage.addListener((msg, sender, res) => {
	if(msg.action === "ext_clicked" || msg.action === "close_page") {
		if(document.querySelector("#ab-popup .popup")){
			toggleIframe();
		}
		else if(isLoggedIn){
			openPage("popup");
		}
		else{
			openPage("login");
		}
	}
	else if(msg.action === "logged_in") {
		isLoggedIn = true;
		openPage("popup");
	}
	else if(msg.action === "logout") {
		isLoggedIn = false;
		removeLogin();
		openPage("login");
	}
	else if(msg.action === "open_settings") {
		openPage("settings");
	}
	else if(msg.action === "open_mainpopup") {
		openPage("popup");
	}
});

function toggleIframe(){
	if(document.querySelector("#ab-popup .popup").classList.contains("hidden")){
		document.querySelector("#ab-popup .popup").classList.remove("hidden");
	}
	else{
		document.querySelector("#ab-popup .popup").classList.add("hidden");
	}
}

function openPage(page) {
	let url = chrome.runtime.getURL(`src/html/${page}.html`);
	document.getElementById("ab-body").innerHTML = `<iframe class='popup ab-${page}-page' src='${url}'></iframe>`;
}

function removeLogin() {
	chrome.storage.local.remove("ab-creds");
}