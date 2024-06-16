function* generateAlmostIsoscelesPythagoreanTriples() {
    let x = 7, y = 5;

    while (true) {
        const a = (x - 1) / 2;
        const b = a + 1;
        const c = y;

        yield [a, b, c];

        // Update x and y for the next iteration
        [x, y] = [3 * x + 4 * y, 2 * x + 3 * y];
    }
}

const generator = generateAlmostIsoscelesPythagoreanTriples();
const triples = Array.from({ length: 5 }, () => generator.next().value);

console.log(triples);
// Output: [[3, 4, 5], [20, 21, 29], [119, 120, 169], [696, 697, 985], [4059, 4060, 5741]]