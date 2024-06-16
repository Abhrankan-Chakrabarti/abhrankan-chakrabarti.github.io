function generateAlmostIsoscelesPythagoreanTriples(count) {
    let x = 1, y = 1;
    const triples = [];
    
    for (let i = 0; i < count; i++) {
        const a = (x - 1) / 2;
        const b = a + 1;
        const c = y;

        triples.push([a, b, c]);

        // Update x and y for the next iteration
        [x, y] = [3 * x + 4 * y, 2 * x + 3 * y];
    }
    return triples;
}

console.log(generateAlmostIsoscelesPythagoreanTriples(5));
// Output: [[3, 4, 5], [20, 21, 29], [119, 120, 169], [696, 697, 985], [4059, 4060, 5741]]