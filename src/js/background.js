
chrome.storage.local.get("ab_creds").then(res=>{
	let timestamp = Math.floor(new Date().getTime() / 1000);
	let dayInSeconds = 24 * 60 * 60;
	if(res?.ab_creds?.timestamp){
		if(timestamp - res.ab_creds.timestamp > dayInSeconds){
			// verify every 24 hrs if login is still valid
			res.ab_creds.timestamp = timestamp;
			verifyLogin(res.ab_creds);
		}
		// else: login was verified less than 24 hrs ago.
	}
	// else: no creds present
});

chrome.action.onClicked.addListener(()=>{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "ext_clicked"}) ;  
	});
});

function verifyLogin(data) {
	let url = "https://api.openai.com/v1/models/text-davinci-003";
	fetch(url, {
		headers: {
			'Authorization': `Bearer ${data.api_key}`
		}
	})
	.then(res=>{
		if(res.status === 200){
			saveLogin(data);
		}else{
			removeLogin(data);
		}
	})
}

function saveLogin(data) {
	chrome.storage.local.set({ ab_creds: data });
}

function removeLogin() {
	chrome.storage.local.remove("ab_creds");
}