//node intro
const fs = require('fs');

const argv = process.argv;
const file = argv[2];

function cat(file) {
    fs.readFile(file, 'utf8', function(error, data) {
        if(error) {
            console.log(error);
        };
        console.log(data);
    });
};

cat(file);