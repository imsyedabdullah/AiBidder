
document.querySelector("#login-form form").onsubmit = (e) => {
	e.preventDefault();
	let api_key = document.querySelector("#login-form input#api_key");

	let data = {
		api_key: api_key.value,
		timestamp: Math.floor(new Date().getTime() / 1000)
	};
	verifyLogin(data);
}

function verifyLogin(data) {
	let url = "https://api.openai.com/v1/models/text-davinci-003";
	fetch(url, {
		headers: {
			'Authorization': `Bearer ${data.api_key}`
		}
	})
	.then(res=>{
		let loginNotice = document.querySelector(".login-notice");
		if(res.status === 200){
			loginNotice.classList.remove("login-error");
			loginNotice.innerText = "Logged In Successfully!"; 
			saveLogin(data);
		}else{
			loginNotice.classList.add("login-error");
			loginNotice.innerText = "Error Logging In. Please check your API key!";
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

function loggedIn(url){
	setTimeout(()=>{
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {action: "logged_in", url: url}) ;  
		});
	}, 3000);
}