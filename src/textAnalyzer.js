const fs = require('fs');

// define function to find the number of words in a string
function strWordsCount(str) {
    if(!str) return null;
    // split on a regex that select chunks of whitesapce characters
    let words = str.split(/\s+/);
    return words.length;
}

// define function to find the longest word in a string
function strLongestWord(str) {
    if(!str) return null;
    // split on a regex that select chunks of whitesapce characters
    let words = str.split(/\s+/);
    if (words && words.length > 0) {
        // stores index of current longest word at longestwordindex
        let longestwordindex = 0;
        // loops through the list of words to find and store index of longest word
        for (let i = 0; i < words.length; i++) {
            //if word at current index is longer than word at longestWordIndex, store current index as max
            if (words[i].length > words[longestwordindex].length) {
                longestwordindex = i;
            }
        }
        return words[longestwordindex];
    }
    else {
        return null;
    }
   
}


// define function to find the number of lines in a file
function strLinesCount(str) {
    if(!str) return null;
    // split on a regex that select chunks of new line characters
    let lines = str.split(/\n+/);
    return lines.length;
}

// find number of words in file using strWordsCount
function fileWordsCount(filePath) {
    // Read the entire file as text
    const content = fs.readFileSync(filePath, 'utf8');
    return strWordsCount(content);
}

// find longest word ina file using strLongestWord
function fileLongestWord(filePath) {
    // Read the entire file as text
    const content = fs.readFileSync(filePath, 'utf8');
    return strLongestWord(content);
}


// find number of breaks in a file using strLinesCount
function fileLinesCount(filePath) {
    // Read the entire file as text
    const content = fs.readFileSync(filePath, 'utf8');
    return strLinesCount(content);
}


// test with data from data/quotes.txt and data/sample-text.txt

//test with quotes.txt
try {
    console.log("Words in quotes.txt: " + fileWordsCount('data/quotes.txt'));
    console.log("Longest word in quotes.txt: " + fileLongestWord('data/quotes.txt'));
    console.log("Lines in quotes.txt: " + fileLinesCount('data/quotes.txt'));
}
catch (err) {
    console.error("Error processing quotes.txt: " + err.message);
}

// test with sample-text.txt
try {
    console.log("Words in sample-text.txt: " + fileWordsCount('data/sample-text.txt'));
    console.log("Longest word in sample-text.txt: " + fileLongestWord('data/sample-text.txt'));
    console.log("Lines in sample-text.txt: " + fileLinesCount('data/sample-text.txt'));
}
catch (err) {
    console.error("Error processing sample-text.txt: " + err.message);
}


// Export the file functions so they can be used in other files
module.exports.fileWordsCount = fileWordsCount;
module.exports.fileLongestWord = fileLongestWord;
module.exports.fileLinesCount = fileLinesCount;
