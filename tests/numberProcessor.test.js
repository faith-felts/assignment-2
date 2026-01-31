const fs = require('fs');
const path = require('path');
// import numberProcessor module
const np = require('../src/numberProcessor');

// create temporary directory for test files
const tmpDir = path.join(__dirname, 'tmp-num-tests');

// setup directory for tests
beforeAll(() => {
	if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
});

// cleanup temp files after tests
afterAll(() => {
	if (fs.existsSync(tmpDir)) {
		fs.readdirSync(tmpDir).forEach(f => fs.unlinkSync(path.join(tmpDir, f)));
		fs.rmdirSync(tmpDir);
	}
});

describe('numberProcessor file-based functions', () => {
	test('calculates sum, highest, lowest, and average for integer file', () => {
		// create a test file
        const file = path.join(tmpDir, 'ints.txt');
		const content = '1\n2\n3\n4\n5';
		fs.writeFileSync(file, content, 'utf8');

		expect(np.fileSum(file)).toBe(15);
		expect(np.fileHighest(file)).toBe(5);
		expect(np.fileLowest(file)).toBe(1);
		expect(np.fileAvg(file)).toBe(3);
	});

	test('handles decimals and negative numbers (use close comparisons)', () => {
		// create a test file
        const file = path.join(tmpDir, 'decimals.txt');
		const content = '-1.5\n2.5\n3';
		fs.writeFileSync(file, content, 'utf8');

		expect(np.fileSum(file)).toBeCloseTo(4.0);
		expect(np.fileHighest(file)).toBeCloseTo(3);
		expect(np.fileLowest(file)).toBeCloseTo(-1.5);
		expect(np.fileAvg(file)).toBeCloseTo(4.0 / 3);
	});

	test('single-number file returns that number for all metrics', () => {
		// create a test file
        const file = path.join(tmpDir, 'single.txt');
		fs.writeFileSync(file, '42', 'utf8');

		expect(np.fileSum(file)).toBe(42);
		expect(np.fileHighest(file)).toBe(42);
		expect(np.fileLowest(file)).toBe(42);
		expect(np.fileAvg(file)).toBe(42);
	});

	test('empty file results in NaN for all functions (current behavior)', () => {
		// create an empty test file
        const file = path.join(tmpDir, 'empty.txt');
		fs.writeFileSync(file, '', 'utf8');

		expect(np.fileSum(file)).toBeNaN();
		expect(np.fileHighest(file)).toBeNaN();
		expect(np.fileLowest(file)).toBeNaN();
		expect(np.fileAvg(file)).toBeNaN();
	});

	test('trailing newline produces NaN because of empty final line', () => {
		// create a test file
        const file = path.join(tmpDir, 'trailing.txt');
		fs.writeFileSync(file, '1\n2\n', 'utf8');

		expect(np.fileSum(file)).toBeNaN();
		expect(np.fileAvg(file)).toBeNaN();
	});

	test('non-numeric lines produce NaN', () => {
		// create a test file
        const file = path.join(tmpDir, 'nonnumeric.txt');
		fs.writeFileSync(file, '1\nfoo\n3', 'utf8');

		expect(np.fileSum(file)).toBeNaN();
		expect(np.fileHighest(file)).toBeNaN();
		expect(np.fileLowest(file)).toBeNaN();
		expect(np.fileAvg(file)).toBeNaN();
	});

	test('missing file throws an error', () => {
		const missing = path.join(tmpDir, 'nope.txt');
		expect(() => np.fileSum(missing)).toThrow();
		expect(() => np.fileHighest(missing)).toThrow();
		expect(() => np.fileLowest(missing)).toThrow();
		expect(() => np.fileAvg(missing)).toThrow();
	});
});

