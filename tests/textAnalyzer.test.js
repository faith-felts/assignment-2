const fs = require('fs');
const path = require('path');
// import textAnalyzer module
const ta = require('../src/textAnalyzer');

// create temporary directory for test files
const tmpDir = path.join(__dirname, 'tmp-tests');

// setup directory for tests
beforeAll(() => {
	if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
});

// cleanup temp files after tests
afterAll(() => {
	// cleanup temp files
	if (fs.existsSync(tmpDir)) {
		fs.readdirSync(tmpDir).forEach(f => fs.unlinkSync(path.join(tmpDir, f)));
		fs.rmdirSync(tmpDir);
	}
});

describe('textAnalyzer file-based functions', () => {
	test('counts words, finds longest word, and counts lines for a normal file', () => {
        // create a test file
		const file = path.join(tmpDir, 'normal.txt');
		const content = 'hello world\nthis is a test\nlongestword';
		fs.writeFileSync(file, content, 'utf8');

		expect(ta.fileWordsCount(file)).toBe(7); // hello, world, this, is, a, test, longestword
		expect(ta.fileLongestWord(file)).toBe('longestword');
		expect(ta.fileLinesCount(file)).toBe(3); // three logical lines (no trailing newline)
	});

	test('handles multiple consecutive newlines correctly for line counting', () => {
        // create a test file
		const file = path.join(tmpDir, 'multinewlines.txt');
		const content = 'one\n\n\n two\nthree';
		fs.writeFileSync(file, content, 'utf8');

		// strLinesCount uses split(/\n+/) which collapses consecutive newlines
		expect(ta.fileLinesCount(file)).toBe(3); // 'one', ' two', 'three'
	});

	test('empty file returns null for words, longest word, and lines', () => {
        // create an empty test file
		const file = path.join(tmpDir, 'empty.txt');
		fs.writeFileSync(file, '', 'utf8');

		expect(ta.fileWordsCount(file)).toBeNull();
		expect(ta.fileLongestWord(file)).toBeNull();
		expect(ta.fileLinesCount(file)).toBeNull();
	});

	test('non-existent file operations throw an error', () => {
		const missing = path.join(tmpDir, 'does-not-exist.txt');
		expect(() => ta.fileWordsCount(missing)).toThrow();
		expect(() => ta.fileLongestWord(missing)).toThrow();
		expect(() => ta.fileLinesCount(missing)).toThrow();
	});
});

