// textOps.gs

/**
 * Detects and returns detailed style information for the current cursor position or selection
 */
function detectHeadingStyle(payload = {}) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const selection = doc.getSelection();
    const cursor = doc.getCursor();
    
    Logger.log('Selection present: ' + (selection ? 'yes' : 'no'));
    Logger.log('Cursor present: ' + (cursor ? 'yes' : 'no'));

    if (!selection && !cursor) {
      throw new Error('No cursor or selection found');
    }

    // Get the element at cursor/selection
    let element;
    let container;
    
    if (selection) {
      const elements = selection.getRangeElements();
      if (elements.length === 0) throw new Error('Empty selection');
      element = elements[0].getElement();
    } else {
      element = cursor.getElement();
    }

    // Find containing paragraph
    container = element;
    while (container && 
           container.getType() !== DocumentApp.ElementType.PARAGRAPH &&
           container.getType() !== DocumentApp.ElementType.LIST_ITEM) {
      container = container.getParent();
    }

    if (!container) {
      throw new Error('No paragraph container found');
    }

    // Log detailed element info
    const elementType = element.getType().toString();
    const containerType = container.getType().toString();
    Logger.log('Element type: ' + elementType);
    Logger.log('Container type: ' + containerType);

    // Get heading info
    const headingType = container.getHeading();
    const headingName = getParagraphHeadingName(headingType);
    
    const text = container.getText();
    Logger.log('Heading type: ' + headingName);
    Logger.log('Text content: "' + text + '"');

    // Get text attributes
    const textElement = element.editAsText();
    const textAttributes = {
      fontSize: textElement.getFontSize(),
      fontFamily: textElement.getFontFamily(),
      bold: textElement.isBold(),
      italic: textElement.isItalic(),
      underline: textElement.isUnderline(),
      strikethrough: textElement.isStrikethrough(),
      foregroundColor: textElement.getForegroundColor(),
      backgroundColor: textElement.getBackgroundColor()
    };

    // Get paragraph attributes
    const paragraphAttributes = {
      lineSpacing: container.getLineSpacing(),
      alignment: getAlignmentName(container.getAlignment()),
      marginLeft: container.getIndentStart(),
      marginRight: container.getIndentEnd(),
      firstLineIndent: container.getIndentFirstLine(),
      spacingBefore: container.getSpacingBefore(),
      spacingAfter: container.getSpacingAfter()
    };

    // Compile style info
    const styleInfo = {
      headingType: headingName,
      text: container.getText(),
      textAttributes,
      paragraphAttributes
    };

    Logger.log('Style info: ' + JSON.stringify(styleInfo, null, 2));

    // Count matching paragraphs
    const matchingParas = doc.getBody()
      .getParagraphs()
      .filter(p => p.getHeading() === headingType);

    Logger.log('Matching paragraphs: ' + matchingParas.length);

    return {
      success: true,
      data: {
        styleInfo,
        matchingParagraphs: matchingParas.length
      }
    };

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return { 
      success: false, 
      error: error.toString()
    };
  }
}

/**
 * Updates all paragraphs matching the source paragraph's heading with the provided style
 */
function updateMatchingStyles(payload) {
  try {
    if (!payload.style) {
      throw new Error('No style provided');
    }

    const doc = DocumentApp.getActiveDocument();
    const headingType = DocumentApp.ParagraphHeading[payload.style.headingType];
    
    if (headingType === undefined) {
      throw new Error('Invalid heading type');
    }

    // Find all paragraphs with matching heading type
    const paragraphs = doc.getBody().getParagraphs();
    let updatedCount = 0;

    paragraphs.forEach(para => {
      if (para.getHeading() === headingType) {
        try {
          applyStyle(para, payload.style);
          updatedCount++;
        } catch (e) {
          Logger.log(`Error updating paragraph: ${e}`);
        }
      }
    });

    return {
      success: true,
      data: { updatedCount }
    };

  } catch (error) {
    return { 
      success: false, 
      error: error.toString()
    };
  }
}

// Helper functions 

function getParagraphHeadingName(heading) {
  const map = {
    [DocumentApp.ParagraphHeading.NORMAL]: 'NORMAL',
    [DocumentApp.ParagraphHeading.HEADING1]: 'HEADING1',
    [DocumentApp.ParagraphHeading.HEADING2]: 'HEADING2',
    [DocumentApp.ParagraphHeading.HEADING3]: 'HEADING3',
    [DocumentApp.ParagraphHeading.HEADING4]: 'HEADING4',
    [DocumentApp.ParagraphHeading.HEADING5]: 'HEADING5',
    [DocumentApp.ParagraphHeading.HEADING6]: 'HEADING6'
  };
  return map[heading] || 'NORMAL';
}

function getAlignmentName(alignment) {
  const map = {
    [DocumentApp.HorizontalAlignment.LEFT]: 'LEFT',
    [DocumentApp.HorizontalAlignment.CENTER]: 'CENTER',
    [DocumentApp.HorizontalAlignment.RIGHT]: 'RIGHT',
    [DocumentApp.HorizontalAlignment.JUSTIFY]: 'JUSTIFY'
  };
  return map[alignment];
}

function applyStyle(paragraph, style) {
  const { textAttributes, paragraphAttributes } = style;
  const text = paragraph.editAsText();

  // Apply text attributes
  if (textAttributes.fontSize) text.setFontSize(textAttributes.fontSize);
  if (textAttributes.fontFamily) text.setFontFamily(textAttributes.fontFamily);
  if (textAttributes.foregroundColor) text.setForegroundColor(textAttributes.foregroundColor);
  if (textAttributes.backgroundColor) text.setBackgroundColor(textAttributes.backgroundColor);
  text.setBold(textAttributes.bold);
  text.setItalic(textAttributes.italic);
  text.setUnderline(textAttributes.underline);
  text.setStrikethrough(textAttributes.strikethrough);

  // Apply paragraph attributes
  if (paragraphAttributes.lineSpacing) paragraph.setLineSpacing(paragraphAttributes.lineSpacing);
  if (paragraphAttributes.alignment) paragraph.setAlignment(paragraphAttributes.alignment);
  if (paragraphAttributes.marginLeft) paragraph.setIndentStart(paragraphAttributes.marginLeft);
  if (paragraphAttributes.marginRight) paragraph.setIndentEnd(paragraphAttributes.marginRight);
  if (paragraphAttributes.firstLineIndent) paragraph.setIndentFirstLine(paragraphAttributes.firstLineIndent);
  if (paragraphAttributes.spacingBefore) paragraph.setSpacingBefore(paragraphAttributes.spacingBefore);
  if (paragraphAttributes.spacingAfter) paragraph.setSpacingAfter(paragraphAttributes.spacingAfter);
}