// import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname, basename } from 'path';

const __filename = fileURLToPath(import.meta.url);  // Gets current file path
const __dirname = dirname(__filename);              // Gets directory path

// Read input file name from command line argument
const inputFile = process.argv[2];

if (!inputFile) {
	console.error('Please provide an input file path');
	console.error('Usage: node script.js input.json');
	process.exit(1);
}

// Helper function to create timestamp-based folder name
function getTimestampFolderName(inputFile) {
	const now = new Date();
	const timestamp = now.toISOString()
		.replace(/[-:]/g, '')
		.replace(/T/, '_')
		.slice(0, 13);

	// Get base name of input file without extension
	const baseName = basename(inputFile, '.json');

	return `${baseName}_${timestamp}`;
}


// Helper function to create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

// Helper function to list existing projects
function listExistingProjects(resultsDir) {
	if (!fs.existsSync(resultsDir)) return [];

	return fs.readdirSync(resultsDir)
		.filter(name => /^\d{8}_\d{4}$/.test(name))
		.map(folder => {
			const [date, time] = folder.split('_');
			const year = date.slice(0, 4);
			const month = date.slice(4, 6);
			const day = date.slice(6, 8);
			const hour = time.slice(0, 2);
			const minute = time.slice(2, 4);

			return {
				folder,
				date: new Date(`${year}-${month}-${day}T${hour}:${minute}:00`)
			};
		})
		.sort((a, b) => b.date - a.date);
}

// Helper function to safely access nested properties
function getNestedValue(obj, path) {
	return path.reduce((current, key) =>
		(current && current[key] !== undefined) ? current[key] : undefined, obj);
}

// Function to extract unique technologies from all paths
function extractTechnologies(data) {
	const paths = getNestedValue(data,
		['$return_value', 'Results', 0, 'Result', 'Paths']);

	if (!Array.isArray(paths)) {
		throw new Error('No paths array found in the JSON structure');
	}

	const allTechnologies = paths.reduce((acc, path) => {
		if (Array.isArray(path?.Technologies)) {
			acc.push(...path.Technologies);
		}
		return acc;
	}, []);

	return Array.from(new Map(
		allTechnologies.map(tech => [tech.Name, tech])
	).values());
}

// Function to create minimal JSON
function createMinimalJson(originalJson) {
	const technologies = extractTechnologies(originalJson);

	const techByTag = technologies.reduce((acc, tech) => {
		const tag = tech.Tag || 'uncategorized';
		if (!acc[tag]) {
			acc[tag] = [];
		}
		acc[tag].push({
			name: tech.Name || 'Unknown',
			description: tech.Description || '',
			isPremium: tech.IsPremium === 'yes'
		});
		return acc;
	}, {});

	return {
		domain: getNestedValue(originalJson,
			['$return_value', 'Results', 0, 'Result', 'Paths', 0, 'Domain']) || 'unknown',
		technologies: techByTag
	};
}

// Function to create AI-friendly list
function createAiFriendlyList(originalJson) {
	const technologies = extractTechnologies(originalJson);

	return {
		domain: getNestedValue(originalJson,
			['$return_value', 'Results', 0, 'Result', 'Paths', 0, 'Domain']) || 'unknown',
		tech_stack: technologies.map(tech => ({
			name: tech.Name || 'Unknown',
			tag: tech.Tag || 'uncategorized',
			category: tech.Categories ? tech.Categories[0] : null,
			isPremium: tech.IsPremium === 'yes'
		}))
	};
}

try {
	// Create results directory
	const resultsDir = path.join(process.cwd(), 'results');
	ensureDirectoryExists(resultsDir);

	// List existing projects
	const existingProjects = listExistingProjects(resultsDir);
	if (existingProjects.length > 0) {
		console.log('\n📂 Existing projects:');
		existingProjects.forEach(({ folder, date }) => {
			console.log(`   - ${folder} (${date.toLocaleString()})`);
		});
	}
	// Check if input file exists
	if (!fs.existsSync(inputFile)) {
		throw new Error(`Input file not found: ${inputFile}`);
	}

	// Read and parse input file
	console.log(`\n📖 Reading file: ${inputFile}`);
	let rawData;
	try {
		rawData = fs.readFileSync(inputFile, 'utf8');
		if (!rawData) {
			throw new Error('File is empty');
		}
	} catch (err) {
		throw new Error(`Failed to read file: ${err.message}`);
	}

	let data;
	try {
		data = JSON.parse(rawData);
	} catch (err) {
		throw new Error(`Invalid JSON format: ${err.message}`);
	}

	// Create new timestamped folder
	const timestamp = getTimestampFolderName(inputFile);
	const projectDir = path.join(resultsDir, timestamp);
	ensureDirectoryExists(projectDir);

	// Generate both formats
	console.log('🔄 Processing data...');
	const minimalJson = createMinimalJson(data);
	const aiFriendlyList = createAiFriendlyList(data);

	// Write files with pretty formatting
	const minimalOutput = path.join(projectDir, 'minimal.json');
	const aiOutput = path.join(projectDir, 'ai.json');

	fs.writeFileSync(minimalOutput, JSON.stringify(minimalJson, null, 2));
	fs.writeFileSync(aiOutput, JSON.stringify(aiFriendlyList, null, 2));

	console.log('\n✅ Successfully created project:');
	console.log(`   📁 Project folder: ${timestamp}`);
	console.log(`   📄 Files created:`);
	console.log(`      - minimal.json`);
	console.log(`      - ai.json`);

} catch (error) {
	console.error('\n❌ Error:', error.message);
	if (!error.message.includes('JSON has this structure')) {
		console.error('\n💡 Debug info:');
		console.error('   Make sure your JSON has this structure:');
		console.error('   {');
		console.error('     "$return_value": {');
		console.error('       "Results": [{');
		console.error('         "Result": {');
		console.error('           "Paths": [{');
		console.error('             "Domain": "example.com",');
		console.error('             "Technologies": [...]');
		console.error('           }]');
		console.error('         }');
		console.error('       }]');
		console.error('     }');
		console.error('   }');
	}
	process.exit(1);
}