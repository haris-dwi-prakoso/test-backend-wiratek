function getLongestWordInSentence(sentence) {
    let words = sentence.split(' ');
    let longestWord = '';
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length) longestWord = words[i];
    }
    return longestWord + `: ${longestWord.length} character`;
}

console.log(getLongestWordInSentence(process.argv.slice(2).join(' ')));