const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const url = 'http://192.168.4.1/audio-download';

function sendfile(fileName) {
    return new Promise(async (res, rej) => {
        try {
            const form = new FormData();
            const fileStream = fs.createReadStream(fileName);
            form.append('file[]', fileStream);
            const response = await axios.post(url, form, {
                headers: {
                    ...form.getHeaders()
                }
            });
            res(true);
        } catch (error) {
            if (error.reason == "Data after `Connection: close`") {
                return res(true);
            }
            console.error(error.reason)
            setTimeout(() => {
                rej(error);
            }, 500);
        }
    });
}

async function sendFiles() {
    const form = new FormData();
    console.log(JSON.stringify(fs.readdirSync(path.join(__dirname, './audio-files'))));
    const files = fs.readdirSync(path.join(__dirname, './audio-files')).map(x => path.join(__dirname, 'audio-files', x));
    for (let i=0; i<files.length; i++) {
        try {
            console.log(files[i]);
            await sendfile(files[i]);

        } catch (error) {
            i--;
        }
    }
}

sendFiles();

