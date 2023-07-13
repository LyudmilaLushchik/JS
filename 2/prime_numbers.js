function primeNumbersFirst(n) {
    let pNumbers = [];
    for (let i = 2; pNumbers.length < n; i++) {
        let flag = 1;
        if (i > 2) {
            for (let pNumber of pNumbers) {
                if (i % pNumber === 0) {
                    flag = 0;
                    break;
                }
            }
        }
        if (flag === 1) {            
            pNumbers.push(i);
        }
    }
    return pNumbers;
}

console.time('primeNumbers')
console.log(primeNumbersFirst(process.argv[2]))
console.timeEnd('primeNumbers')