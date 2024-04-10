// 當文件被開啟時，創建自定義功能表
function onOpen() {
  // 取得使用者介面物件
  var ui = SpreadsheetApp.getUi();
  // 創建自訂功能表
  ui.createMenu("AccuGPTsheet")
    .addItem("取得單一回應", "getSingleResponse")
    .addItem("批次更新回應", "batchUpdateResponses")
    .addToUi();
}

// 顯示帶有載入訊息的模態對話框
function displayLoadingDialog() {
  // 創建包含載入訊息的 HTML 輸出
  var htmlOutput = HtmlService.createHtmlOutput("<p>載入中... 請稍候。</p>")
    .setWidth(250)
    .setHeight(100);
  // 顯示模態對話框
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "取得回應中");
}

// 呼叫 GPT-3.5 Turbo 16k API，取得回應的資料
function callGPT3Turbo16kAPI(query) {
  try {
    var apiKey = "YOUR_OPENAI_API_KEY"; // 請更換為您的 OpenAI API 金鑰
    var apiEndpoint = "https://api.openai.com/v1/chat/completions";

    var headers = {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    };

    var payload = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        { role: "system", content: "你是一個有幫助的助手。" },
        { role: "user", content: query },
      ],
      max_tokens: 3000,
    };

    var options = {
      method: "POST",
      headers: headers,
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    };

    // 發送 API 請求
    var response = UrlFetchApp.fetch(apiEndpoint, options);
    // 解析 API 回應的 JSON 內容
    var jsonResponse = JSON.parse(response.getContentText());

    if (jsonResponse.choices && jsonResponse.choices.length > 0) {
      // 如果有回應，則回傳回應內容
      return jsonResponse.choices[0].message.content;
    } else {
      // 否則記錄錯誤訊息並回傳錯誤訊息
      Logger.log("API 回應錯誤: " + JSON.stringify(jsonResponse));
      return "錯誤：無法取得回應";
    }
  } catch (error) {
    // 處理錯誤情況
    Logger.log("callGPT3Turbo16kAPI 中發生錯誤：" + error.toString());
    return "錯誤：" + error.toString();
  }
}

// 取得使用者當前選擇的儲存格內容的回應的功能
function getSingleResponse() {
  // 取得目前文件的活頁簿
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // 取得使用者選取的儲存格內容
  var cellValue = sheet.getActiveCell().getValue();

  if (cellValue) {
    // 顯示載入對話框
    displayLoadingDialog();

    // 取得回應
    var response = callGPT3Turbo16kAPI(cellValue);

    // 等待 2 秒後關閉載入對話框
    Utilities.sleep(2000);
    SpreadsheetApp.getUi().alert("完成！");

    // 更新 B 欄位中的回應
    sheet.getRange(sheet.getActiveCell().getRow(), 2).setValue(response);
  }
}

// 批次處理 A 欄位中所有列，並使用回應更新 B 欄位
function batchUpdateResponses() {
  // 取得目前文件的活頁簿
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // 取得 A 欄的所有值
  var columnA = sheet.getRange("A:A").getValues();
  var responses = [];

  // 顯示載入對話框
  displayLoadingDialog();

  for (var i = 0; i < columnA.length; i++) {
    var query = columnA[i][0];
    if (query) {
      // 如果查詢不為空，則取得回應並將其加入到回應陣列中
      responses.push([callGPT3Turbo16kAPI(query)]);
    } else {
      // 否則將空字串加入回應陣列中
      responses.push([""]);
    }
  }

  // 等待 2 秒後關閉載入對話框
  Utilities.sleep(2000);
  SpreadsheetApp.getUi().alert("批次更新完成！");

  // 將回應陣列的內容設定到 B 欄中
  sheet.getRange(1, 2, responses.length, 1).setValues(responses);
}
