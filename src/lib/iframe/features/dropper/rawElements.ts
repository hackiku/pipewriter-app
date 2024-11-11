// pipe.gs

function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu("Pipewriter")
    .addItem("App", "showFormInSidebar")
    .addSeparator()
    .addToUi();
}

function showFormInSidebar() {
  var form = HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Pipewriter");
  DocumentApp.getUi().showSidebar(form);
}

// Instead of global initialization, load elements on demand
function getElement(params) {
  var elementId = params.elementId;
  Logger.log('Getting element: ' + elementId);
  
  // Determine which master doc to use based on theme
  var isDark = elementId.includes('-dark');
  var masterDocId = isDark ? 
    '129e9bMS5EDiQu02coa6Pk_VwpV-BAg6euHzOtSDW5DM' : // dark mode doc
    '1Dllv6OzbGHHoLNvf3Zf7nLZ-ppsRr_XwToJwmc2RFVA'; // light mode doc

  try {
    // Get master doc
    var masterDoc = DocumentApp.openById(masterDocId);
    Logger.log('Opened master doc: ' + masterDocId);
    
    var masterBody = masterDoc.getBody();
    var found = false;
    var table = null;

    // Find element and its table
    for(var i=0; i < masterBody.getNumChildren(); i++) {
      var child = masterBody.getChild(i);
      
      if(child.getType() === DocumentApp.ElementType.PARAGRAPH && 
         child.getText() === elementId) {
        found = true;
        Logger.log('Found element marker at position ' + i);
        continue;
      }
      
      if(found && child.getType() === DocumentApp.ElementType.TABLE) {
        table = child.copy();
        Logger.log('Found table: ' + table.getNumRows() + ' rows');
        break;
      }
    }

    if(!table) {
      Logger.log('Element not found: ' + elementId);
      return {
        success: false,
        error: "Element not found: " + elementId
      };
    }

    // Get cursor position
    var cursor = DocumentApp.getActiveDocument().getCursor();
    if(!cursor) {
      Logger.log('No cursor found');
      return {
        success: false,
        error: "Please place cursor in document"
      };
    }

    // Insert table
    var cursorElement = cursor.getElement();
    var body = DocumentApp.getActiveDocument().getBody();
    var insertPosition = body.getChildIndex(cursorElement);
    
    body.insertTable(insertPosition + 1, table);
    Logger.log('Inserted table successfully');

    return {
      success: true,
      elementId: elementId,
      insertPosition: insertPosition + 1,
      tableInfo: {
        rows: table.getNumRows(),
        cells: table.getRow(0).getNumCells()
      }
    };

  } catch(e) {
    Logger.log('Error: ' + e.toString());
    Logger.log('Stack: ' + e.stack);
    return {
      success: false,
      error: e.toString()
    };
  }
}