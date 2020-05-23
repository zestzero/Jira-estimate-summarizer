chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url.includes('atlassian.net/browse/') && changeInfo.status === 'complete') {
  		injectScripts(tabId);
	}
});

function injectScripts(tabId) {
	chrome.tabs.executeScript(tabId, {file: "script.js"});
	chrome.tabs.insertCSS(tabId, {file: "styles.css"});
}