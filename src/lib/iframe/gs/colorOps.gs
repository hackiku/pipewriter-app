// colorOps.gs - Color operations for Google Docs

/**
 * Normalizes a color value to a format Google Docs accepts
 * @param {string} color - Hex or RGB color string
 * @returns {string} Normalized color value
 */
function normalizeColor(color) {
  // If already RGB format, return as is
  if (color.startsWith('rgb')) {
    return color;
  }

  // Convert hex to RGB
  let hex = color.replace('#', '');
  
  // Expand 3-digit hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Changes the background color of the document
 * @param {Object} e - The event object from the frontend
 * @returns {Object} Response object
 */
function changeBg(e) {
  const startTime = new Date().getTime();
  
  try {
    // Get parameters
    const params = e.parameter || {};
    if (!params.color) {
      throw new Error('No color parameter provided');
    }

    // Normalize the color value
    const normalizedColor = normalizeColor(params.color);
    
    // Change background
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    body.setBackgroundColor(normalizedColor);

    const executionTime = new Date().getTime() - startTime;
    
    return {
      success: true,
      action: 'changeBg',
      color: normalizedColor,
      executionTime: executionTime,
      message: 'Background color updated successfully'
    };

  } catch (error) {
    console.error('Error in changeBg:', error);
    
    return {
      success: false,
      action: 'changeBg',
      error: error.message,
      executionTime: new Date().getTime() - startTime,
      message: `Failed to update background color: ${error.message}`
    };
  }
}

/**
 * Gets the current background color
 * @returns {Object} Current background color info
 */
function getCurrentBg() {
  try {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const color = body.getBackgroundColor();
    
    return {
      success: true,
      action: 'getCurrentBg',
      color: color || '#FFFFFF'
    };
  } catch (error) {
    return {
      success: false,
      action: 'getCurrentBg',
      error: error.message
    };
  }
}