const superMonkeyType = document.getElementById('superMonkeyType');
superMonkeyType.addEventListener('click', () => {
    // Send a message to the background script to call the init function
    chrome.runtime.sendMessage('init');
});

const turnOffSuperMonkeyType = document.getElementById('turnOffSuperMonkeyType');
turnOffSuperMonkeyType.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
});

const superMonkeyTypeText = document.getElementById('superMonkeyTypeText');
superMonkeyType.addEventListener('mouseenter', () => {
    superMonkeyTypeText.innerText = "Turn On";
});

superMonkeyType.addEventListener('mouseout', () => {
    superMonkeyTypeText.innerText = "super monkeytype";
});
