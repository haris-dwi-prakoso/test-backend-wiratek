const testString = "KETARIW1"
const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)

function reverseStringWithoutNumber(string) {
    let numbers = [];
    let chars = string.split('');
    for (let i = 0; i < chars.length; i++) {
        if (isNumeric(chars[i])) {
            numbers.push(chars[i]);
            chars.splice(i, 1);
        }
    }
    return chars.toReversed().concat(numbers).join('');
}

console.log(reverseStringWithoutNumber(testString));