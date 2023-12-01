const { promises: fsPromises } = require('fs');

async function computeCalibrationValue(filePath) {
    let data;

    try {
        data = await fsPromises.readFile(filePath, 'utf-8');
    } catch (err) {
        console.log(err);
    }

    const calibrationValue = data
        .split(/\r?\n/)
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