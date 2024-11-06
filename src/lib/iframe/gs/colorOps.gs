// colorOps.gs

/**
 * Handles all color-related operations for the document
 */
function processColorOperation(params) {
	const startTime = new Date().getTime();
	const response = {
		success: false,
		action: 'changeBg',
		executionTime: 0
	};

	try {
		// Extract and validate color
		const color = params?.color || params?.payload?.color;
		if (!color) {
			throw new Error('No color specified');
		}

		// Get document and change background
		const doc = DocumentApp.getActiveDocument();
		const body = doc.getBody();

		// Normalize and apply color
		body.setBackgroundColor(normalizeColor(color));

		// Set success response
		response.success = true;

	} catch (error) {
		console.error('Error in processColorOperation:', error);
		response.error = error.message;
	} finally {
		// Always include execution time
		response.executionTime = new Date().getTime() - startTime;
	}

	return response;
}

/**
 * Normalizes color values to RGB format
 * @param {string} color - Hex or RGB color string
 * @returns {string} RGB color string
 */
function normalizeColor(color) {
	if (!color) return null;

	// If already RGB format, return as is
	if (color.toLowerCase().startsWith('rgb')) {
		return color;
	}

	// Handle hex colors
	try {
		let hex = color.replace('#', '').trim();

		// Expand shorthand hex
		if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}

		// Validate hex length
		if (hex.length !== 6) {
			throw new Error(`Invalid hex color: ${color}`);
		}

		// Convert to RGB
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);

		// Validate RGB values
		if (isNaN(r) || isNaN(g) || isNaN(b)) {
			throw new Error(`Invalid hex color values: ${color}`);
		}

		return `rgb(${r}, ${g}, ${b})`;
	} catch (error) {
		console.error('Error normalizing color:', error);
		throw new Error(`Invalid color format: ${color}`);
	}
}