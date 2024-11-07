// textOps.gs

/**
 * Handles all text-related operations for the document
 */
function processTextOperation(params) {
  const startTime = new Date().getTime();
  const response = {
    success: false,
    action: params.action,
    executionTime: 0,
  };

  try {
    switch (params.action) {
      case "getElement":
        return insertStyleElement(params);
      case "updateHeading":
        return updateHeadingStyle(params);
      default:
        throw new Error(`Unknown text operation: ${params.action}`);
    }
  } catch (error) {
    console.error("Error in processTextOperation:", error);
    response.error = error.message;
  } finally {
    response.executionTime = new Date().getTime() - startTime;
  }

  return response;
}

/**
 * Inserts a style element from the master document
 */
function insertStyleElement(params) {
  const startTime = new Date().getTime();
  const response = {
    success: false,
    action: "getElement",
    executionTime: 0,
  };

  try {
    // Validate element ID
    const elementId = params?.elementId || params?.payload?.elementId;
    if (!elementId) {
      throw new Error("No element ID specified");
    }

    // Open master document and get the style guide table
    const masterDoc = DocumentApp.openById(
      "1X-mEWo2wuRcVZdA8Y94cFMpUO6tKm8GLxY3ZA8lyulk",
    );
    const masterBody = masterDoc.getBody();

    // Find the style guide table
    let styleTable = null;
    const numElements = masterBody.getNumChildren();

    for (let i = 0; i < numElements; i++) {
      const element = masterBody.getChild(i);
      if (element.getType() === DocumentApp.ElementType.PARAGRAPH) {
        const text = element.getText();
        if (text === elementId) {
          // Get the next element which should be our table
          if (i + 1 < numElements) {
            const nextElement = masterBody.getChild(i + 1);
            if (nextElement.getType() === DocumentApp.ElementType.TABLE) {
              styleTable = nextElement.copy();
              break;
            }
          }
        }
      }
    }

    if (!styleTable) {
      throw new Error(`Style guide table not found for element: ${elementId}`);
    }

    // Get active document and cursor
    const doc = DocumentApp.getActiveDocument();
    const cursor = doc.getCursor();
    if (!cursor) {
      throw new Error("No cursor position found");
    }

    // Insert the table at cursor
    const element = cursor.getElement();
    const parent = element.getParent();
    const offset = parent.getChildIndex(element);

    if (parent.getType() === DocumentApp.ElementType.TABLE_CELL) {
      parent.insertTable(offset + 1, styleTable);
    } else {
      doc.getBody().insertTable(offset + 1, styleTable);
    }

    response.success = true;
  } catch (error) {
    console.error("Error inserting style element:", error);
    response.error = error.message;
  } finally {
    response.executionTime = new Date().getTime() - startTime;
  }

  return response;
}

/**
 * Updates heading styles to match the selected heading
 */
function updateHeadingStyle(params) {
  const startTime = new Date().getTime();
  const response = {
    success: false,
    action: "updateHeading",
    executionTime: 0,
  };

  try {
    const doc = DocumentApp.getActiveDocument();
    const cursor = doc.getCursor();

    if (!cursor) {
      throw new Error("No cursor position found");
    }

    const element = cursor.getElement();
    const paragraph =
      element.getType() === DocumentApp.ElementType.PARAGRAPH
        ? element
        : element.getParent();

    if (paragraph.getType() !== DocumentApp.ElementType.PARAGRAPH) {
      throw new Error("Cursor must be in a paragraph");
    }

    // Get the heading level of the current paragraph
    const headingLevel = paragraph.getHeading();

    // Find all paragraphs with the same heading level and update their attributes
    const body = doc.getBody();
    const paragraphs = body.getParagraphs();
    let updatedCount = 0;

    // Store the attributes of the selected paragraph
    const attributes = {
      fontSize: paragraph.getFontSize(),
      fontFamily: paragraph.getFontFamily(),
      foregroundColor: paragraph.getForegroundColor(),
      backgroundColor: paragraph.getBackgroundColor(),
      bold: paragraph.isBold(),
      italic: paragraph.isItalic(),
      underline: paragraph.isUnderline(),
      lineSpacing: paragraph.getLineSpacing(),
    };

    paragraphs.forEach((p) => {
      if (p.getHeading() === headingLevel && p.getId() !== paragraph.getId()) {
        try {
          // Apply stored attributes
          if (attributes.fontSize) p.setFontSize(attributes.fontSize);
          if (attributes.fontFamily) p.setFontFamily(attributes.fontFamily);
          if (attributes.foregroundColor)
            p.setForegroundColor(attributes.foregroundColor);
          if (attributes.backgroundColor)
            p.setBackgroundColor(attributes.backgroundColor);
          p.setBold(attributes.bold);
          p.setItalic(attributes.italic);
          p.setUnderline(attributes.underline);
          if (attributes.lineSpacing) p.setLineSpacing(attributes.lineSpacing);

          updatedCount++;
        } catch (e) {
          console.error("Error updating paragraph:", e);
        }
      }
    });

    response.success = true;
    response.updatedCount = updatedCount;
  } catch (error) {
    console.error("Error updating heading style:", error);
    response.error = error.message;
  } finally {
    response.executionTime = new Date().getTime() - startTime;
  }

  return response;
}
