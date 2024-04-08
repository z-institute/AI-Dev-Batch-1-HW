// AccuGPTsheet

// Function to create a custom menu in Google Sheets when the document is opened
function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('AccuGPTsheet')
        .addItem('針對單一輸入格執行', 'getSingleResponse')
        .addItem('針對整個資料表執行', 'batchUpdateResponses')
        .addItem('單一文字生成圖片', 'getimagesResponse')
        .addToUi();
  }
  
  // Function to display a modal dialog with a loading message
  function displayLoadingDialog() {
    var htmlOutput = HtmlService.createHtmlOutput('<p>執行中... 請稍候</p>')
                                 .setWidth(250)
                                 .setHeight(100);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, '獲取回應');
  }
  
  function callGPT3Turbo16kAPI(query) {
    try {
      var apiKey = 'YOUR_OPENAI_API_KEY';  // Replace with your OpenAI API key
      var apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  
      var headers = {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      };
      
      var payload = {
        "model": "gpt-3.5-turbo-16k",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": query}
        ],
        "max_tokens": 3000
      };
      
      var options = {
        "method": "POST",
        "headers": headers,
        "payload": JSON.stringify(payload),
        "muteHttpExceptions": true
      };
      
      var response = UrlFetchApp.fetch(apiEndpoint, options);
      var jsonResponse = JSON.parse(response.getContentText());
      
      if (jsonResponse.choices && jsonResponse.choices.length > 0) {
        return jsonResponse.choices[0].message.content;
      } else {
        Logger.log("API Response Error: " + JSON.stringify(jsonResponse));
        return "Error: Unable to fetch response";
      }
    } catch (error) {
      Logger.log("Error in callGPT3Turbo16kAPI: " + error.toString());
      return "Error: " + error.toString();
    }
  }
  
  // Function to fetch a response for the content of the cell currently selected by the user
  function getSingleResponse() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var cellValue = sheet.getActiveCell().getValue();
    
    if (cellValue) {
      // Show the loading dialog
      displayLoadingDialog();
      
      // Fetch the response
      var response = callGPT3Turbo16kAPI(cellValue);
  
      // Close the loading dialog after a short delay
      Utilities.sleep(2000);  // 2 seconds delay
      SpreadsheetApp.getUi().alert('Done!');
      
      // Update the B column with the response
      sheet.getRange(sheet.getActiveCell().getRow(), 2).setValue(response);
    }
  }
  
  
  // Function to fetch a response from the GPT-3.5 Turbo 16k API
  function callGPT4imagesgenerations(query) {
    try {
      var apiKey = 'YOUR_OPENAI_API_KEY';  // Replace with your OpenAI API key
      var apiEndpoint = 'https://api.openai.com/v1/images/generations';
  
      var headers = {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      };
      
      var payload = {
         "model": "dall-e-3",
        "prompt": query,
        "n": 1,
        "size": "1024x1024"
      };
      
      var options = {
        "method": "POST",
        "headers": headers,
        "payload": JSON.stringify(payload),
        "muteHttpExceptions": true
      };
      
      var response = UrlFetchApp.fetch(apiEndpoint, options);
      var jsonResponse = JSON.parse(response.getContentText());
      
      if (jsonResponse.data && jsonResponse.data.length > 0) {
        return jsonResponse.data[0].url;
      } else {
        Logger.log("API Response Error: " + JSON.stringify(jsonResponse));
        return "Error: Unable to fetch response";
      }
    } catch (error) {
      Logger.log("Error in callGPT3Turbo16kAPI: " + error.toString());
      return "Error: " + error.toString();
    }
  }
  
  // Function to fetch a response for the content of the cell currently selected by the user
  function getimagesResponse() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var cellValue = sheet.getActiveCell().getValue();
    
    if (cellValue) {
      // Show the loading dialog
      displayLoadingDialog();
      
      // Fetch the response
      var response = callGPT4imagesgenerations(cellValue);
  
      // Close the loading dialog after a short delay
      Utilities.sleep(2000);  // 2 seconds delay
      SpreadsheetApp.getUi().alert('Done!');
      
      // 假設response是圖片的URL
      var imageUrl = response; // 這裡的response變量應該包含圖片的URL
  
      // 更新B列，使用IMAGE函數來插入圖片
      var cellFormula = '=IMAGE("' + imageUrl + '", 4, 512, 512)';
      sheet.getRange(sheet.getActiveCell().getRow(), 2).setFormula(cellFormula);
      
    }
  }
  
  // Function to process all rows in column A in batch and updates column B with the responses
  function batchUpdateResponses() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var columnA = sheet.getRange("A:A").getValues();
    var responses = [];
  
    // Show the loading dialog
    displayLoadingDialog();
    
    for (var i = 0; i < columnA.length; i++) {
      var query = columnA[i][0];
      if (query) {
        responses.push([callGPT3Turbo16kAPI(query)]);
      } else {
        responses.push([""]);  // Empty response for empty queries
      }
    }
    
    // Close the loading dialog after a short delay
    Utilities.sleep(2000);  // 2 seconds delay
    SpreadsheetApp.getUi().alert('Batch update complete!');
    
    sheet.getRange(1, 2, responses.length, 1).setValues(responses);
  }