
let timer = setInterval(()=>{
	if(document.querySelector(".header")){
		clearInterval(timer);
		init();
	}
}, 50);

function init(e){	
	document.querySelector(".header .icon-settings").onclick = function(){
		sendMessage("open_settings");
	}

	document.querySelector(".header .icon-logout").onclick = function(){
		sendMessage("logout");
	}

	document.querySelector(".header .icon-minimize").onclick = function(){
		
	}

	document.querySelector(".header .icon-close").onclick = function(){
		sendMessage("close_page");
	}
}

function sendMessage(msg, data={}){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: msg, ...data}) ;  
	});
}