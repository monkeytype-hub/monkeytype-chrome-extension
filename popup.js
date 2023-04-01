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

superMonkeyType.addEventListener('mouseleave', () => {
    superMonkeyTypeText.innerText = "super monkeytype";
});

function initTheme() {
    chrome.runtime.sendMessage({ type: 'getData', data: 'theme' }, function (theme) {
        if (theme == undefined) {
            theme = "serika_dark";
        }
        fetch('./theme/themes.json')
            .then(response => response.json())
            .then(data => {
                let check = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == theme) {
                        console.log(data[i])
                        document.documentElement.style.setProperty('--bgColor', data[i].bgColor);
                        document.documentElement.style.setProperty('--mainColor', data[i].mainColor);
                        document.documentElement.style.setProperty('--subColor', data[i].subColor);
                        document.documentElement.style.setProperty('--textColor', data[i].textColor);
                        check = true;
                        break;
                    }
                }
                if (!check) {
                    document.documentElement.style.setProperty('--bgColor', "#323437");
                    document.documentElement.style.setProperty('--mainColor', "#e2b714");
                    document.documentElement.style.setProperty('--subColor', "#646669");
                    document.documentElement.style.setProperty('--textColor', "#d1d0c5");
                    theme = "serika_dark";
                }
                const themeSelect = document.getElementById('themeSelect');
                themeSelect.innerText = theme.replace("_", " ");
            })
            .catch(error => console.error(error));
    });
}

function setTheme(theme) {
    chrome.runtime.sendMessage({ type: 'storeData', data: { "theme": theme } });
    initTheme();
}

function initThemeList() {
    fetch('./theme/themes.json')
        .then(response => response.json())
        .then(data => {
            data = data.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (nameA > nameB) {
                    return -1; // a should be after b
                }
                if (nameA < nameB) {
                    return 1; // a should be before b
                }
                return 0; // a and b are equal
            });

            data.reverse();

            const themeList = document.getElementById('themeList');
            data.forEach(theme => {
                const themeElement = document.createElement('div');
                themeElement.classList.add('flex', 'justify-center', 'items-center', 'text-xs', 'font-medium', 'py-2');
                themeElement.style.color = `var(--textColor)`;
                themeElement.innerHTML = `<span class="cursor-pointer">${theme.name.replace("_", " ")}</span>`;
                themeList.appendChild(themeElement);

                themeElement.addEventListener('click', () => {
                    setTheme(theme.name);
                    themeListModal.classList.add('hidden');
                });
            });
        })
        .catch(error => console.error(error));
}

const themeSelect = document.getElementById('themeSelect');
themeSelect.addEventListener('click', () => {
    const themeListModal = document.getElementById('themeListModal');
    if (themeListModal.classList.contains('hidden')) {
        themeListModal.classList.remove('hidden');
    } else {
        themeListModal.classList.add('hidden');
    }
});

initTheme();
initThemeList();