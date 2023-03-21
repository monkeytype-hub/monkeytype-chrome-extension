const init = (tab) => {
    const { id, url } = tab;
    chrome.scripting.executeScript(
        {
            target: { tabId: id, allFrames: true },
            files: ['monkeyType.js']
        }
    )
    console.log(`monkey type extension turn on`);
}

// chrome.action.onClicked.addListener(tab => {
//     init(tab)
// });

// Add a listener for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'init') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let [tab] = tabs;
            init(tab);
        });
    }
});
