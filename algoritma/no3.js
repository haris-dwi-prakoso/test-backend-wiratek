const input = ['xc', 'dz', 'bbb', 'dz'];
const query = ['bbb', 'ac', 'dz'];

function countQueryInInput(input, query) {
    let counts = [];
    for (let i = 0; i < query.length; i++) {
        let count = 0;
        for (let j = 0; j < input.length; j++) {
            if (input[j] === query[i]) count++;
        }
        counts.push(count);
    }
    return counts;
}

console.log(countQueryInInput(input, query));