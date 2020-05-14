chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url.includes('browse') && changeInfo.status === 'complete') {
  		injectScripts();
	}
});

function injectScripts() {
	chrome.tabs.executeScript(null, {file: "script.js"});
	chrome.tabs.insertCSS(null, {file: "styles.css"});
}