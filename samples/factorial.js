function factorial(n) {
    if (n < 0) return 'Error: Negative numbers do not have factorials';
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorial(5)); // Output: 120