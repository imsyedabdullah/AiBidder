
let timer = setInterval(()=>{
	if(document.querySelector(".header")){
		clearInterval(timer);
		init();
	}
}, 50);

function init(e){	
	
	let settingsIcon = document.querySelector(".header .icon-settings");
	let backIcon = document.querySelector(".header .icon-back");
	let logoutIcon = document.querySelector(".header .icon-logout");
	let minIcon = document.querySelector(".header .icon-minimize");
	let closeIcon = document.querySelector(".header .icon-close");

	if(settingsIcon){
		settingsIcon.onclick = function(){
			sendMessage("open_settings");
		}
	}

	if(backIcon){
		backIcon.onclick = function(){
			sendMessage("open_mainpopup");
		}
	}

	if(logoutIcon){
		logoutIcon.onclick = function(){
			sendMessage("logout");
		}
	}

	if(minIcon){
		minIcon.onclick = function(){
			
		}
	}

	if(closeIcon){
		closeIcon.onclick = function(){
			sendMessage("close_page");
		}
	}
}

function sendMessage(msg, data={}){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: msg, ...data}) ;  
	});
}