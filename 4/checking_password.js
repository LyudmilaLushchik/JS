// Задание 1
  
function getPasswordChecker(password) {
    return function (inputPassword) {
        return inputPassword === password;
    };
}
const password = "qwerty";
const checkPassword = getPasswordChecker(password);

console.log(checkPassword("qwerty"));
console.log(checkPassword("123456"));