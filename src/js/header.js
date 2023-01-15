
document.querySelector(".icon-settings").onclick = function(e){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "open_settings"}) ;  
	});
}

document.querySelector(".icon-logout").onclick = function(e){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "logout"}) ;
	});
}

document.querySelector(".icon-minimize").onclick = function(e){
	
}

document.querySelector(".icon-close").onclick = function(e){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "close_page"}) ;  
	});
}