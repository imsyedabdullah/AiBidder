
let headerTimer = setInterval(()=>{
	if(document.querySelector(".header")){
		clearInterval(headerTimer);
		initHeader();
	}
}, 50);

function initHeader(){	
	
	let settingsIcon = document.querySelector(".header .icon-settings");
	let backIcon = document.querySelector(".header .icon-back");
	let logoutIcon = document.querySelector(".header .icon-logout");
	let reloadIcon = document.querySelector(".header .icon-reload");
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

	if(reloadIcon){
		reloadIcon.onclick = function(){
			let icon = reloadIcon.querySelector("svg");
			let angle = 0;

			let animation = setInterval(()=>{
				if(angle === 360){
					clearInterval(animation);
					window.location.reload();
				}
				else{
					angle += 10;
					icon.style.transform = "rotate(" + angle + "deg)";
					icon.style.backgroundColor = "unset";
				}
			}, 25, angle);
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