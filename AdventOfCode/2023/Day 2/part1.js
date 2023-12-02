const fs = require('fs');

function parseGameData(input) {
    return input
        .trim()
        .split('\n')
        .map((line) => {
            const [, cubes] = line
                .split(': ');
            const sets = cubes
                .split('; ')
                .map((set) => {
                    const cubesInfo = set
                        .split(', ')
                        .map((info) => {
                            const [count, color] = info.split(' ');
                            return { count: parseInt(count), color };
                        });
                    return cubesInfo;
                });
            return sets;
        });
}

function countPossibleGames(gameData) {
    const possibleGames = [];

    for (let i = 0; i < gameData.length; i++) {
        let possible = true;

        for (const set of gameData[i]) {
            let red = 0,
                green = 0,
                blue = 0;

            for (const { count, color } of set) {
                if (color === 'red') red += count;
                else if (color === 'green') green += count;
                else if (color === 'blue') blue += count;
            }

            if (red > 12 || green > 13 || blue > 14) {
                possible = false;
                break;
            }
        }

        if (possible) { possibleGames.push(i + 1) };
    }

    return possibleGames.reduce((acc, curr) => acc + curr, 0);
}

console.log(countPossibleGames(parseGameData(fs.readFileSync('./input.txt', 'utf8'))));