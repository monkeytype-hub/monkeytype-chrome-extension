const superMonkeyType = document.getElementById("superMonkeyType");
superMonkeyType.addEventListener("click", () => {
    // Send a message to the background script to call the init function
    chrome.runtime.sendMessage({ type: "init" });
});

const turnOffSuperMonkeyType = document.getElementById(
    "turnOffSuperMonkeyType",
);
turnOffSuperMonkeyType.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
});

const superMonkeyTypeText = document.getElementById("superMonkeyTypeText");
superMonkeyType.addEventListener("mouseenter", () => {
    superMonkeyTypeText.innerText = "Turn On";
});

superMonkeyType.addEventListener("mouseleave", () => {
    superMonkeyTypeText.innerText = "super monkeytype";
});

const githubIcon = document.getElementById("githubIcon");
const githubText = document.getElementById("githubText");

const mouseEnterHandlerGithub = (icon, text) => {
    icon.style.stroke = `var(--textColor)`;
    text.style.color = `var(--textColor)`;
};

const mouseLeaveHandlerGithub = (icon, text) => {
    icon.style.stroke = `var(--subColor)`;
    text.style.color = `var(--subColor)`;
};

githubText.addEventListener("mouseenter", () => {
    mouseEnterHandlerGithub(githubIcon, githubText);
});

githubIcon.addEventListener("mouseenter", () => {
    mouseEnterHandlerGithub(githubIcon, githubText);
});

githubText.addEventListener("mouseleave", () => {
    mouseLeaveHandlerGithub(githubIcon, githubText);
});

githubIcon.addEventListener("mouseleave", () => {
    mouseLeaveHandlerGithub(githubIcon, githubText);
});

const paletteIcon = document.getElementById("paletteIcon");
const themeSelectText = document.getElementById("themeSelectText");

const mouseEnterHandlerTheme = (icon, text) => {
    icon.style.fill = `var(--textColor)`;
    text.style.color = `var(--textColor)`;
};

const mouseLeaveHandlerTheme = (icon, text) => {
    icon.style.fill = `var(--subColor)`;
    text.style.color = `var(--subColor)`;
};

themeSelectText.addEventListener("mouseenter", () => {
    mouseEnterHandlerTheme(paletteIcon, themeSelectText);
});

paletteIcon.addEventListener("mouseenter", () => {
    mouseEnterHandlerTheme(paletteIcon, themeSelectText);
});

themeSelectText.addEventListener("mouseleave", () => {
    mouseLeaveHandlerTheme(paletteIcon, themeSelectText);
});

paletteIcon.addEventListener("mouseleave", () => {
    mouseLeaveHandlerTheme(paletteIcon, themeSelectText);
});

function initTheme() {
    chrome.runtime.sendMessage(
        { type: "getData", data: "theme" },
        function (theme) {
            if (theme == undefined) {
                theme = "serika_dark";
            }
            fetch("../../theme/themes.json")
                .then((response) => response.json())
                .then((data) => {
                    let check = false;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name == theme) {
                            document.documentElement.style.setProperty(
                                "--bgColor",
                                data[i].bgColor,
                            );
                            document.documentElement.style.setProperty(
                                "--mainColor",
                                data[i].mainColor,
                            );
                            document.documentElement.style.setProperty(
                                "--subColor",
                                data[i].subColor,
                            );
                            document.documentElement.style.setProperty(
                                "--textColor",
                                data[i].textColor,
                            );
                            document.documentElement.style.setProperty(
                                "--subColor",
                                data[i].subColor,
                            );
                            document.documentElement.style.setProperty(
                                "--subAltColor",
                                data[i].subAltColor,
                            );
                            check = true;
                            break;
                        }
                    }
                    if (!check) {
                        document.documentElement.style.setProperty(
                            "--bgColor",
                            "#323437",
                        );
                        document.documentElement.style.setProperty(
                            "--mainColor",
                            "#e2b714",
                        );
                        document.documentElement.style.setProperty(
                            "--subColor",
                            "#646669",
                        );
                        document.documentElement.style.setProperty(
                            "--textColor",
                            "#d1d0c5",
                        );
                        document.documentElement.style.setProperty(
                            "--subColor",
                            "#646669",
                        );
                        document.documentElement.style.setProperty(
                            "--subAltColor",
                            "#2c2e31",
                        );
                        theme = "serika_dark";
                    }
                    const themeSelect =
                        document.getElementById("themeSelectText");
                    themeSelect.innerText = theme.replaceAll("_", " ");
                })
                .catch((error) => console.error(error));
        },
    );
}

function setTheme(theme) {
    chrome.runtime.sendMessage({ type: "storeData", data: { theme: theme } });
    initTheme();
}

function initThemeList() {
    fetch("../../theme/themes.json")
        .then((response) => response.json())
        .then((data) => {
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

            const themeList = document.getElementById("themeList");
            data.forEach((theme) => {
                const themeElement = document.createElement("div");
                themeElement.classList.add(
                    "flex",
                    "justify-center",
                    "items-center",
                    "text-xs",
                    "font-medium",
                    "py-2",
                );
                themeElement.style.color = `var(--textColor)`;
                themeElement.innerHTML = `<span class="cursor-pointer" style="color: var(--subColor);">${theme.name.replaceAll(
                    "_",
                    " ",
                )}</span>`;
                themeList.appendChild(themeElement);

                themeElement.addEventListener("click", () => {
                    setTheme(theme.name);
                    themeListModal.classList.add("hidden");
                });

                themeElement.addEventListener("mouseenter", () => {
                    chrome.runtime.sendMessage({
                        type: "changeIcon",
                        data: { themeName: theme.name },
                    });

                    document.documentElement.style.setProperty(
                        "--bgColor",
                        theme.bgColor,
                    );
                    document.documentElement.style.setProperty(
                        "--mainColor",
                        theme.mainColor,
                    );
                    document.documentElement.style.setProperty(
                        "--subColor",
                        theme.subColor,
                    );
                    document.documentElement.style.setProperty(
                        "--textColor",
                        theme.textColor,
                    );
                    document.documentElement.style.setProperty(
                        "--subColor",
                        theme.subColor,
                    );
                    document.documentElement.style.setProperty(
                        "--subAltColor",
                        theme.subAltColor,
                    );

                    themeElement.style.backgroundColor = `var(--textColor)`;
                    themeElement.style.color = `var(--bgColor)`;

                    const themeSelect =
                        document.getElementById("themeSelectText");
                    themeSelect.innerText = theme.name.replaceAll("_", " ");
                });

                themeElement.addEventListener("mouseleave", () => {
                    themeElement.style.backgroundColor = `var(--bgColor)`;
                    themeElement.style.color = `var(--subColor)`;
                });
            });
        })
        .catch((error) => console.error(error));
}

const themeSelect = document.getElementById("themeSelect");
const themeListModal = document.getElementById("themeListModal");
const themeListModalContent = document.getElementById("themeListModalContent");

themeSelect.addEventListener(
    "click",
    () => {
        if (themeListModal.classList.contains("hidden")) {
            themeListModal.classList.remove("hidden");
        } else {
            themeListModal.classList.add("hidden");
            initTheme();
        }
    },
    false,
);

document.addEventListener(
    "click",
    (event) => {
        const clickedElement = event.target;
        if (
            !themeListModalContent.contains(clickedElement) &&
            !themeSelect.contains(clickedElement)
        ) {
            themeListModal.classList.add("hidden");
            initTheme();
        }
    },
    true,
);

initTheme();
initThemeList();
