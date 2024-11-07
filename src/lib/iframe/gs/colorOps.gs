// colorOps.gs

/**
 * Handles all color-related operations for the document
 */

function detectTextStyle() {
  const doc = DocumentApp.getActiveDocument();
  const selection = doc.getSelection();
  const cursor = doc.getCursor();

  if (!selection && !cursor) {
    Logger.log("No cursor or selection found.");
    return;
  }

  let styleInfo;
  
  if (selection) {
    styleInfo = getSelectionStyle(selection);
  } else {
    styleInfo = getCursorStyle(cursor);
  }

  logStyleInfo(styleInfo);
  return styleInfo;
}



function getCursorStyle(cursor) {
  const element = cursor.getElement();
  const text = element.asText();

  if (!text) {
    Logger.log("Cursor not in a text element.");
    return null;
  }

  const attributes = text.getAttributes();

  return {
    text: text.getText(),
    fontSize: attributes[DocumentApp.Attribute.FONT_SIZE],
    fontFamily: attributes[DocumentApp.Attribute.FONT_FAMILY],
    bold: attributes[DocumentApp.Attribute.BOLD],
    italic: attributes[DocumentApp.Attribute.ITALIC],
    underline: attributes[DocumentApp.Attribute.UNDERLINE],
    foregroundColor: attributes[DocumentApp.Attribute.FOREGROUND_COLOR],
    backgroundColor: attributes[DocumentApp.Attribute.BACKGROUND_COLOR],
  };
}

function getSelectionStyle(selection) {
  const rangeElements = selection.getRangeElements();
  const element = rangeElements[0].getElement();
  const text = element.asText();

  if (!text) {
    Logger.log("Selection not in a text element.");
    return null;
  }

  const attributes = rangeElements[0].isPartial()
    ? text.getAttributes(rangeElements[0].getStartOffset())
    : text.getAttributes();

  return {
    text: text.getText(),
    fontSize: attributes[DocumentApp.Attribute.FONT_SIZE],
    fontFamily: attributes[DocumentApp.Attribute.FONT_FAMILY],
    bold: attributes[DocumentApp.Attribute.BOLD],
    italic: attributes[DocumentApp.Attribute.ITALIC],
    underline: attributes[DocumentApp.Attribute.UNDERLINE],
    foregroundColor: attributes[DocumentApp.Attribute.FOREGROUND_COLOR],
    backgroundColor: attributes[DocumentApp.Attribute.BACKGROUND_COLOR],
  };
}


function applyTextStyle() {
  if (Object.keys(savedStyle).length === 0) {
    Logger.log("No saved style to apply.");
    return;
  }

  const doc = DocumentApp.getActiveDocument();
  const selection = doc.getSelection();

  if (!selection) {
    Logger.log("No text selected to apply the style.");
    return;
  }

  const elements = selection.getRangeElements();
  elements.forEach((element) => {
    const text = element.getElement().editAsText();
    const startOffset = element.getStartOffset();
    const endOffset = element.getEndOffsetInclusive();

    if (savedStyle.fontSize) text.setFontSize(startOffset, endOffset, savedStyle.fontSize);
    if (savedStyle.fontFamily) text.setFontFamily(startOffset, endOffset, savedStyle.fontFamily);
    if (savedStyle.foregroundColor) text.setForegroundColor(startOffset, endOffset, savedStyle.foregroundColor);
    if (savedStyle.backgroundColor) text.setBackgroundColor(startOffset, endOffset, savedStyle.backgroundColor);
    if (savedStyle.bold !== null) text.setBold(startOffset, endOffset, savedStyle.bold);
    if (savedStyle.italic !== null) text.setItalic(startOffset, endOffset, savedStyle.italic);
    if (savedStyle.underline !== null) text.setUnderline(startOffset, endOffset, savedStyle.underline);
  });

  Logger.log("Applied saved style to selected text.");
}