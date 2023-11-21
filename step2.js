const fs = require('fs');
const axios = require('axios');
const isURL = require('is-url');

const argv = process.argv;
const path = argv[2];

function cat(path) {
    fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
            console.log(`Error reading ${path}:\n${error}`);
            process.exit(1);
        };
        console.log(data);
    });
};

async function webCat(path) {
    try {
        const res = await axios.get(path);
        console.log(res.data);
    }
    catch (error) {
        console.log(`Error fetching ${path}: \n ${error.cause}`);
        console.log("Perhaps you didn't make an http request?");
    };
};

if(isURL(path)) {
    webCat(path);
} else {
    cat(path);
}