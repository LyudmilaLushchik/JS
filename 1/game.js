let n = Math.floor(Math.random() * 1000);
console.log("Я загадал:", n);
while (true) {
    let nFromUser = prompt("Введите число от 0 до 1000:")
    if (nFromUser === "q") {
        break
    } else
    if (nFromUser === "" || isNaN(nFromUser)) {
        alert("Вы ввели не число от 0 до 1000!")
    } else if (+nFromUser < n) {
        alert("Ваше число меньше!")
    } else if (+nFromUser > n) {
        alert("Ваше число больше!")
    } else if (+nFromUser === n) {
        alert("Вы угадали!")
        break
    }
}