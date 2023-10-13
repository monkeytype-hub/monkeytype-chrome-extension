const init = (tab) => {
    const { id, url } = tab;
    chrome.scripting.executeScript({
        target: { tabId: id, allFrames: true },
        files: ["public/script/monkeytype.js"],
    });
    console.log(`monkey type extension turn on`);
};

// chrome.action.onClicked.addListener(tab => {
//     init(tab)
// });

// Add a listener for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "init") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let [tab] = tabs;
            init(tab);
        });
    }
    if (message.type === "storeData") {
        const data = message.data;
        storeData(data);
    }
    if (message.type === "getData") {
        getData(message.data, function (result) {
            sendResponse(result);
        });
        return true; // This is necessary to indicate that we will be sending a response asynchronously
    }
    if (message.type === "changeIcon") {
        changeIcon(message.data.themeName);
    }
});

const storeData = (data) => {
    chrome.storage.local.set(data, function () {
        console.log(data);
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log("Data saved:", data);
        }
    });
};

const getData = (key, callback) => {
    chrome.storage.local.get(key, function (result) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log("Data retrieved:", result[key]);
            callback(result[key]);

            if (result[key] === undefined) return;
            const iconPath = `../../monkeytype-icons/${result[key]}.png`;
            chrome.action.setIcon({ path: iconPath });
        }
    });
};

const changeIcon = (themeName) => {
    if (themeName === undefined) return;
    const iconPath = `../../monkeytype-icons/${themeName}.png`;
    chrome.action.setIcon({ path: iconPath });
};
