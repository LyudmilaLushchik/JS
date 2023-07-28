// Задание 3

const readline = require("readline");
const fs = require("fs").promises;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function guessNumber() {
    const secretNumber = Math.floor(Math.random() * 100);
    let attempts = 0;

    console.log("Угадайте число от 1 до 100!");

    async function askNumber() {
        const input = await ask("Введите число: ");
        const number = parseInt(input);
        if (isNaN(number)) {
            console.log("Вы ввели не число!");
        } else if (number < secretNumber) {
            console.log("Загаданное число больше!");
            attempts++;
            await askNumber();
        } else if (number > secretNumber) {
            console.log("Загаданное число меньше!");
            attempts++;
            await askNumber();
        } else {
            attempts++;
            console.log(`Поздравляем, вы угадали число ${secretNumber} за ${attempts} попыток!`);
            rl.close();

            // Запись протокола игры в файл.
            const protocol = `Загаданное число: ${secretNumber}\nКоличество попыток: ${attempts}\n\n`;
            await fs.appendFile("protocol.txt", protocol);
            console.log("Протокол игры сохранен в файл protocol.txt");
        }
    }

    await askNumber();
}

guessNumber();