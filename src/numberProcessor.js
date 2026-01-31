
// find sum of all numbers in an array
function sumArr(arr) {
	let sum = 0;
	for(let i = 0; i < arr.length; i++) {
		sum = sum + arr[i]
    }
	return sum;
}


// find highest number in an array
function findHighest(arr) {
	let highest = arr[0];
	for(let i = 0; i < arr.length; i++) {
		if(arr[i] > highest) {
        	highest = arr[i];
        }
    }
    return highest
}

// find lowest number in an array
function findLowest(arr) {
	let lowest = arr[0];
	for(let i = 0; i < arr.length; i++) {
		if(arr[i] < lowest) {
        	lowest = arr[i];
        }
    }
    return lowest
}

// find average of all numbers in an array
function avgArr(arr) {
	return  sumArr(arr) / arr.length;
}



// find the sum of all numbers in file using sumArr
function fileSum(filePath) {
    // Read the entire file as text
    const content = fs.readFileSync(filePath, 'utf8').split('\n').map(Number);
    return sumArr(content);
}

// find the highest number in file using findHighest
function fileHighest(filePath) {
    // Read the entire file as text
    const content = fs.readFileSync(filePath, 'utf8').split('\n').map(Number);
    return findHighest(content);
}

// find the lowest number in file using findLowest
function fileLowest(filePath) {
    // Read the entire file as text
    const content = fs.readFileSync(filePath, 'utf8').split('\n').map(Number);
    return findLowest(content);
}

// find the average of all numbers in file using avgArr
function fileAvg(filePath) {
    // Read the entire file as text
    const content = fs.readFileSync(filePath, 'utf8').split('\n').map(Number);
    return avgArr(content);
}