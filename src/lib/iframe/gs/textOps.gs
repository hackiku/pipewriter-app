// textOps.gs

// (headingDetector.gs)

/**
 * Get detailed style info from cursor or selection
 */
function detectHeadingStyle() {
  const doc = DocumentApp.getActiveDocument();
  const selection = doc.getSelection();
  const cursor = doc.getCursor();

  if (!selection && !cursor) {
    Logger.log("No cursor or selection found");
    return null;
  }

  // Get style info for cursor or selection
  let styleInfo;
  if (selection) {
    styleInfo = getSelectionStyle(selection);
  } else {
    styleInfo = getCursorStyle(cursor);
  }

  // Log what we found
  logStyleInfo(styleInfo);

  // Find matching paragraphs
  if (styleInfo) {
    const matchingParas = findMatchingParagraphs(styleInfo.headingType);
    Logger.log("\nFound " + matchingParas.length + " matching paragraphs");
    logMatchingParagraphs(matchingParas);

    return {
      styleInfo: styleInfo,
      matchingParagraphs: matchingParas,
    };
  }

  return null;
}

function getCursorStyle(cursor) {
  const element = cursor.getElement();
  const paragraph =
    element.getType() === DocumentApp.ElementType.PARAGRAPH
      ? element
      : element.getParent();

  if (paragraph.getType() !== DocumentApp.ElementType.PARAGRAPH) {
    Logger.log("Cursor not in a paragraph");
    return null;
  }

  return {
    headingType: paragraph.getHeading(),
    text: paragraph.getText(),
    fontSize: element.getFontSize(),
    fontFamily: element.getFontFamily(),
    bold: element.isBold(),
    italic: element.isItalic(),
    underline: element.isUnderline(),
    foregroundColor: element.getForegroundColor(),
    backgroundColor: element.getBackgroundColor(),
    lineSpacing: paragraph.getLineSpacing(),
    alignment: paragraph.getAlignment(),
  };
}

function getSelectionStyle(selection) {
  const elements = selection.getRangeElements();
  if (elements.length === 0) return null;

  // Get the first selected element
  const rangeElement = elements[0];
  const element = rangeElement.getElement();
  const paragraph =
    element.getType() === DocumentApp.ElementType.PARAGRAPH
      ? element
      : element.getParent();

  if (paragraph.getType() !== DocumentApp.ElementType.PARAGRAPH) {
    Logger.log("Selection not in a paragraph");
    return null;
  }

  // If partial selection, get specific range attributes
  let textStyle;
  if (rangeElement.isPartial()) {
    const start = rangeElement.getStartOffset();
    const text = element.editAsText();
    textStyle = {
      fontSize: text.getFontSize(start),
      fontFamily: text.getFontFamily(start),
      bold: text.isBold(start),
      italic: text.isItalic(start),
      underline: text.isUnderline(start),
      foregroundColor: text.getForegroundColor(start),
      backgroundColor: text.getBackgroundColor(start),
    };
  } else {
    textStyle = {
      fontSize: element.getFontSize(),
      fontFamily: element.getFontFamily(),
      bold: element.isBold(),
      italic: element.isItalic(),
      underline: element.isUnderline(),
      foregroundColor: element.getForegroundColor(),
      backgroundColor: element.getBackgroundColor(),
    };
  }

  return {
    headingType: paragraph.getHeading(),
    text: paragraph.getText(),
    ...textStyle,
    lineSpacing: paragraph.getLineSpacing(),
    alignment: paragraph.getAlignment(),
    isPartial: rangeElement.isPartial(),
    selectionStart: rangeElement.isPartial()
      ? rangeElement.getStartOffset()
      : null,
    selectionEnd: rangeElement.isPartial()
      ? rangeElement.getEndOffsetInclusive()
      : null,
  };
}

function findMatchingParagraphs(headingType) {
  const doc = DocumentApp.getActiveDocument();
  return doc
    .getBody()
    .getParagraphs()
    .filter((p) => p.getHeading() === headingType);
}

function logStyleInfo(styleInfo) {
  if (!styleInfo) {
    Logger.log("No style info found");
    return;
  }

  const headingMap = {
    [DocumentApp.ParagraphHeading.NORMAL]: "NORMAL",
    [DocumentApp.ParagraphHeading.HEADING1]: "HEADING1",
    [DocumentApp.ParagraphHeading.HEADING2]: "HEADING2",
    [DocumentApp.ParagraphHeading.HEADING3]: "HEADING3",
    [DocumentApp.ParagraphHeading.HEADING4]: "HEADING4",
    [DocumentApp.ParagraphHeading.HEADING5]: "HEADING5",
    [DocumentApp.ParagraphHeading.HEADING6]: "HEADING6",
  };

  Logger.log("\nDetected style:");
  Logger.log(`Heading type: ${headingMap[styleInfo.headingType]}`);
  Logger.log(`Text content: "${styleInfo.text}"`);

  if (styleInfo.isPartial) {
    Logger.log(
      `Selected text: "${styleInfo.text.substring(
        styleInfo.selectionStart,
        styleInfo.selectionEnd + 1,
      )}"`,
    );
  }

  Logger.log("\nFormatting:");
  Logger.log(
    JSON.stringify(
      {
        fontSize: styleInfo.fontSize,
        fontFamily: styleInfo.fontFamily,
        bold: styleInfo.bold,
        italic: styleInfo.italic,
        underline: styleInfo.underline,
        foregroundColor: styleInfo.foregroundColor,
        backgroundColor: styleInfo.backgroundColor,
        lineSpacing: styleInfo.lineSpacing,
        alignment: styleInfo.alignment,
      },
      null,
      2,
    ),
  );
}

function logMatchingParagraphs(paragraphs) {
  paragraphs.forEach((p, i) => {
    Logger.log(`\nMatching paragraph ${i + 1}:`);
    Logger.log(`- Text: "${p.getText()}"`);
  });
}

// Test Functions

function testDetectStyle() {
  return detectHeadingStyle();
}

function testUpdateStyle() {
  const result = detectHeadingStyle();
  if (!result || !result.styleInfo) return;

  const { styleInfo, matchingParagraphs } = result;
  Logger.log("\nUpdating style for matching paragraphs...");
  Logger.log("Source style:", JSON.stringify(styleInfo, null, 2));

  let updatedCount = 0;
  matchingParagraphs.forEach((para, i) => {
    // Skip the source paragraph
    if (para.getText() === styleInfo.text) {
      Logger.log(`Skipping source paragraph: "${para.getText()}"`);
      return;
    }

    try {
      // Always update the paragraph with ALL attributes
      const text = para.editAsText();

      // Log before state
      Logger.log(`\nUpdating paragraph: "${para.getText()}"`);
      Logger.log(
        "Before:",
        JSON.stringify(
          {
            fontSize: text.getFontSize(),
            fontFamily: text.getFontFamily(),
            bold: text.isBold(),
            italic: text.isItalic(),
            underline: text.isUnderline(),
          },
          null,
          2,
        ),
      );

      // Apply ALL text attributes
      text.setFontSize(styleInfo.fontSize);
      text.setFontFamily(styleInfo.fontFamily);
      text.setForegroundColor(styleInfo.foregroundColor);
      text.setBackgroundColor(styleInfo.backgroundColor);
      text.setBold(styleInfo.bold);
      text.setItalic(styleInfo.italic);
      text.setUnderline(styleInfo.underline);

      // Apply ALL paragraph attributes
      para.setLineSpacing(styleInfo.lineSpacing);
      para.setAlignment(styleInfo.alignment);

      // Log after state
      Logger.log(
        "After:",
        JSON.stringify(
          {
            fontSize: text.getFontSize(),
            fontFamily: text.getFontFamily(),
            bold: text.isBold(),
            italic: text.isItalic(),
            underline: text.isUnderline(),
          },
          null,
          2,
        ),
      );

      updatedCount++;
    } catch (e) {
      Logger.log(`Error updating paragraph ${i}: ${e.toString()}`);
    }
  });

  Logger.log(`\nTotal paragraphs updated: ${updatedCount}`);
  return updatedCount;
}
