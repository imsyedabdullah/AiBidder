chrome.action.onClicked.addListener(()=>{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "ext_clicked"}) ;  
	});
});

function onCreated() {
	if (chrome.runtime.lastError) {
	  console.log(`Error: ${chrome.runtime.lastError}`);
	} else {
	  console.log("Item created successfully");
	}
}