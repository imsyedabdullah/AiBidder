let settingsTimer = setInterval(()=>{
	if(document.body){
		clearInterval(settingsTimer);
		initSettings();
	}
}, 50);

function initSettings(){	
	
	loadSettings();

	let saveSettingsBtn = document.querySelector(".btn-save-settings");
	if(saveSettingsBtn){
		saveSettingsBtn.onclick = saveSettings;
	}
}

function loadSettings(){
	chrome.storage.local.get("ab_settings").then(res=>{
		if(res.ab_settings){
			document.querySelector("#input_name").value = res.ab_settings.name;
			document.querySelector("#input_years_of_experience").value = res.ab_settings.years_of_experience;
			document.querySelector("#input_include_name").checked = res.ab_settings.include_name;
			document.querySelector("#input_include_years").checked = res.ab_settings.include_years;
			document.querySelector("#input_include_skills").checked = res.ab_settings.include_skills;
		}
	});
}

function saveSettings(e){
	let data = {
		name: document.querySelector("#input_name").value,
		years_of_experience: document.querySelector("#input_years_of_experience").value,
		include_name: document.querySelector("#input_include_name").checked,
		include_years: document.querySelector("#input_include_years").checked,
		include_skills: document.querySelector("#input_include_skills").checked,
	}

	chrome.storage.local.set({"ab_settings": data});
	
	let settingsNotice = document.querySelector(".settings-notice");
	settingsNotice.classList.remove("hidden");
	setTimeout(()=>{
		sendMessage("open_mainpopup");
	}, 1500);
}