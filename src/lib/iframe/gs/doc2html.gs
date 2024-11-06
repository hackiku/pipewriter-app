// ========================= doc2html =======================================

function doc2html(payload) {
  const body = DocumentApp.getActiveDocument().getBody();
  const paras = body.getParagraphs();

  // Define the prefix map
  const prefixMap = {
    [DocumentApp.ParagraphHeading.HEADING1]: '<h1>',
    [DocumentApp.ParagraphHeading.HEADING2]: '<h2>',
    [DocumentApp.ParagraphHeading.HEADING3]: '<h3>',
    [DocumentApp.ParagraphHeading.HEADING4]: '<button>',
    [DocumentApp.ParagraphHeading.HEADING5]: '<h5>',
    [DocumentApp.ParagraphHeading.HEADING6]: '<p>'
  };

  // Define the suffix map
  const suffixMap = {
    [DocumentApp.ParagraphHeading.HEADING1]: '</h1>',
    [DocumentApp.ParagraphHeading.HEADING2]: '</h2>',
    [DocumentApp.ParagraphHeading.HEADING3]: '</h3>',
    [DocumentApp.ParagraphHeading.HEADING4]: '</button>',
    [DocumentApp.ParagraphHeading.HEADING5]: '</h5>',
    [DocumentApp.ParagraphHeading.HEADING6]: '</p>'
  };

  // Initialize an empty array to store modified text
  var modifiedTextArr = [];

  // Loop through each paragraph in the document
  for (var i = 0; i < paras.length; i++) {
    var para = paras[i];

    if (
      para.getType() === DocumentApp.ElementType.PARAGRAPH &&
      para.getHeading() !== DocumentApp.ParagraphHeading.NORMAL
    ) {
      var level = para.getHeading();
      var text = para.getText();

      if (text.trim() !== "") {
        var formattedText = prefixMap[level] + text + suffixMap[level];
        modifiedTextArr.push({formattedText: formattedText, level: level});
      }
    }
  }

  // Handle different actions based on payload
  if (payload && payload.copy) {
    // Join the formatted text with newlines for clipboard
    var clipboardText = modifiedTextArr.map(function(item) {
      return item.formattedText;
    }).join('\n');
    
    // Copy to clipboard
    DocumentApp.getActiveDocument().getBody().appendParagraph(clipboardText);
    DocumentApp.getActiveDocument().getSelection().setNextInsertionMode(false);
    return;
  }

  // Log the payload and position for debugging
  Logger.log('Payload received:', payload);
  Logger.log('Position value:', payload && payload.position);

  // Determine insertion position
  var insertAtStart = payload && payload.position === 'start';
  var insertPosition = insertAtStart ? 0 : body.getNumChildren();

  Logger.log('Calculated insert position:', insertPosition);

  // Insert each line as a separate paragraph
  for (var j = 0; j < modifiedTextArr.length; j++) {
    var index = insertAtStart ? j : insertPosition + j;
    Logger.log('Inserting at index:', index);
    
    var paragraph = body.insertParagraph(index, modifiedTextArr[j].formattedText)
                      .setHeading(DocumentApp.ParagraphHeading.NORMAL);

    if (modifiedTextArr[j].level === DocumentApp.ParagraphHeading.HEADING2 || 
        modifiedTextArr[j].level === DocumentApp.ParagraphHeading.HEADING3) {
      var textElements = paragraph.editAsText();
      textElements.setBold(true);
    }
  }
}