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

// Print the first 5 triples
let count = 0;
for (const triple of generator) {
    console.log(triple);
    count++;
    if (count === 5) break;
}