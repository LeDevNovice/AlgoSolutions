// RIGHT SOLUTION NOT FOUND

const { promises: fsPromises } = require('fs');

const numberMapping = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
};

async function computeCalibrationValue(filePath) {
    let data;

    try {
        data = await fsPromises.readFile(filePath, 'utf-8');
    } catch (err) {
        console.log(err);
    }

    const calibrationValue = data
        .split(/\r?\n/)
        .map((line) => {
            Object.keys(numberMapping).forEach((word) => {
                const regex = new RegExp(word, 'gi');
                line = line.replace(regex, numberMapping[word]);
            });
            return line;
        })
        .map((e) => e.replace(/\D/g,''))
        .map((e) => e.length === 1 ? e+e : e)
        .map((e) => e.length >= 2 ? e.charAt(0) + e.charAt(e.length - 1) : e)
        .map((e) => +e)
        .reduce((acc, curr) => {
            return acc + curr
        }, 0)

    console.log(calibrationValue);
}

computeCalibrationValue('./input.txt');