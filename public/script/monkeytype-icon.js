const axios = require('axios');
const fs = require('fs');

async function downloadMonkeyTypeIcons() {
    try {
        const response = fs.readFileSync("theme/themes.json");
        const data = JSON.parse(response);

        const downloadPromises = data.map(async (item) => {
            const iconUrl = `https://github.com/monkeytype-hub/monkeytype-icon/blob/master/monkeytype-icon/png/${item.name}.png?raw=true`;
            const downloadPath = `monkeytype-icons/${item.name}.png`;

            const imageResponse = await axios({
                method: 'get',
                url: iconUrl,
                responseType: 'stream',
            });

            imageResponse.data.pipe(fs.createWriteStream(downloadPath));
            console.log(`Image ${item.name}.png downloaded successfully.`);
        });

        await Promise.all(downloadPromises);
        console.log('All images downloaded successfully.');
    } catch (error) {
        console.error(error);
    }
}

downloadMonkeyTypeIcons();
