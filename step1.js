const fs = require('fs');

const argv = process.argv;
console.log(argv);
const file = argv[2];

function cat(file) {
    fs.readFile(file, 'utf8', function(error, data) {
        if(error) {
            console.log(`Error reading ${file}:\n${error}`);
            process.exit(1);
        };
        console.log(data);
    });
};
cat(file);