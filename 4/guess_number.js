// Задание 2
  
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function guessNumber() {
    const secretNumber = Math.floor(Math.random() * 100);
    let attempts = 0;

    console.log("Угадайте число от 1 до 100!");

    function askNumber() {
        rl.question("Введите число: ", (input) => {
            const number = parseInt(input);
            if (isNaN(number)) {
                console.log("Вы ввели не число!");
            } else if (number < secretNumber) {
                console.log("Загаданное число больше!");
                attempts++;
                askNumber();
            } else if (number > secretNumber) {
                console.log("Загаданное число меньше!");
                attempts++;
                askNumber();
            } else {
                attempts++;
                console.log(`Поздравляем, вы угадали число ${secretNumber} за ${attempts} попыток!`);
                rl.close();

                // Запись протокола игры в файл.
                const protocol = `Загаданное число: ${secretNumber}\nКоличество попыток: ${attempts}\n\n`;
                fs.appendFile("protocol.txt", protocol, (err) => {
                    if (err) throw err;
                    console.log("Протокол игры сохранен в файл protocol.txt");
                });
            }
        });
    }

    askNumber();
}

guessNumber();