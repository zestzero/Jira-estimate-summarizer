chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url.includes('atlassian.net/browse/') && changeInfo.status === 'complete') {
  		injectScripts();
	}
});

function injectScripts() {
	chrome.tabs.executeScript({file: "script.js"});
	chrome.tabs.insertCSS({file: "styles.css"});
}