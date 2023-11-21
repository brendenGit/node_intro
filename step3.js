const fs = require('fs');
const axios = require('axios');
const isURL = require('is-url');

const argv = process.argv;
let filename, path;

if (argv.includes('--out')) {
    filename = argv[3];
    path = argv[4];
} else {
    path = argv[2];
}

function cat(path) {
    fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
            console.log(`Error reading ${path}:\n${error}`);
            process.exit(1);
        };
        console.log(data);
    });
};

function catWrite(path, filename) {
    let content;
    try {
        content = fs.readFileSync(path, 'utf8');
    } catch (error) {
        console.error(error);
        process.exit(1);
    };
    writeFile(filename, content);
};

async function webCat(path) {
    try {
        const res = await axios.get(path);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        console.log(`Error fetching ${path}: \n ${error.cause}`);
        console.log("Perhaps you didn't make an http request?");
    };
};

async function webCatWrite(path, filename) {
    const content = await axios.get(path);
    writeFile(filename, content.data);
}

function writeFile(filename, content) {
    fs.writeFile(filename, content, "utf8", function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('Successfully wrote to file!');
    });
    console.log('Attempting to write file...')
}

if (argv.includes('--out')) {
    if (isURL(path)) {
        webCatWrite(path, filename);
    } else {
        catWrite(path, filename);
    };
} else {
    if (isURL(path)) {
        webCat(path);
    } else {
        cat(path);
    };
};