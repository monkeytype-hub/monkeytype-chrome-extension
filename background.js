init = (tab) => {
    const { id, url } = tab;
    chrome.scripting.executeScript(
        {
            target: { tabId: id, allFrames: true },
            files: ['monkeyType.js']
        }
    )
    console.log(`monkey type extension turn on`);
}

chrome.action.onClicked.addListener(tab => {
    init(tab)
});