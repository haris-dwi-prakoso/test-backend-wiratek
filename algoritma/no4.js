const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];

function countDiagonalDifference(matrix) {
    let firstDiagonalSum = 0;
    let secondDiagonalSum = 0;
    let size = matrix.length;
    for (let i = 0; i < size; i++) {
        firstDiagonalSum += matrix[i][i];
        secondDiagonalSum += matrix[i][size - (i + 1)];
    }
    return `${firstDiagonalSum} - ${secondDiagonalSum} = ${firstDiagonalSum - secondDiagonalSum}`;
}

console.log(countDiagonalDifference(matrix));