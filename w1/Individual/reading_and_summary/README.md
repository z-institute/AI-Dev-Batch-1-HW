## AccuGPTsheet

**以下是介紹 AccuGPTsheet 的執行過程**

1. 該 function 會在 Sheet 的最上方新增一個工具的 Tab 叫做 `AccuGPTsheet`，並新增兩個下拉選單分別是
   `Get Single Response` 跟 `Batch Update Responses`，而這兩個下拉選單分別會呼叫兩個不同的 function，
   `getSingleResponse` 跟 `batchUpdateResponses`

```
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('AccuGPTsheet')
      .addItem('Get Single Response', 'getSingleResponse')
      .addItem('Batch Update Responses', 'batchUpdateResponses')
      .addToUi();
}
```

2. 該 function 主要是在被觸發時會顯示一個提示框告知使用者正在取得資料

```
function displayLoadingDialog() {
  var htmlOutput = HtmlService
                    .createHtmlOutput('<p>Loading... Please wait.</p>')
                    .setWidth(250)
                    .setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Fetching Response');
}
```

3. 該 function 主要是在跟 openai 溝通並取得回覆，若結果有誤則會顯示錯誤

```
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
```

4. 該 function 主要是在執行被選取的格子裡的資料當作 prompt 並送出給 openai，如果欄位內沒資料則不會送給 openai，若有資料則會顯示 loading 的 dialog 並發動 `callGPT3Turbo16kAPI` 這個 function，並在成功拿到回覆後顯示結束並將結果顯示在對應列的 B 儲存格裡，需注意資料不一定要寫在 A 欄位而是可以寫在任意區塊，不論 prompt 寫在哪最後都會被寫在對應列的 B 儲存格裡，即使將 prompt 寫在 B 欄也一樣，只是最後會被覆蓋而已

```
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
```

5. 跟上面的 function 很像只不過該 function 只支援資料在 A 欄裡，並會用回圈的形式將回復一一回填

```
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
```

\*優化

```
可以將 52 行的 else 去除因為前面的 if 已經會做 return 的動作
```

```
可以將 92 - 99 用 map 的形式下去跑回圈會顯得更直觀
```

```
最後可以將 function 的表達是改為 arrow function 並將變數以 const 宣告
var 是一個不建議使用的宣告形式
而在 for loop 內使用 var 會有全域覆蓋的問題
```

## LangChain

1. LangChain 將各種 LLM 服務進行抽象化，與現有工具整合，以統一處理 LLM 服務。

2. LangChain 透過將基於 LLM 服務的多樣可能性分解成幾個模組，從而簡化了整個流程或服務的複雜性，這些模組從最簡單到最複雜依次包括：

- 模型：包含支援的模型類型和其集成方法。
- 提示：涉及提示的管理、優化以及序列化。
- 記憶：代表在鏈或代理的調用之間持續存在的狀態。
- 索引：當語言模型與特定應用數據結合時，功能變得更強大。此模組提供了加載、查詢和更新外部數據的接口和集成。
- 鏈：是結構化的調用序列，包括對 LLM 或不同工具的調用。
- 代理：一種特殊類型的鏈，LLM 根據高層指示，使用一套工具重複決定、執行動作並觀察結果，直到完成指示。
- 回調：允許記錄和流式傳輸任何鏈的中間步驟，方便觀察、調試和評估應用的內部運作情況。

這些模組共同工作，提供了一個結構化而靈活的框架，以支持 LLM 服務的各種應用。

3. LangChain 推出了一項名為 ExampleSelector 的工具，可以透過智能化的方式幫助用戶選擇範例。這個工具提供了數種不同的策略，以自動挑選出最適合的範例，具體包括：

- 基於長度：此策略按照範例的長度來選擇，幫助找到長度適宜的範例。
- 最大邊界相似性：這種方法依據範例與輸入之間的相似度進行選擇，同時確保所選範例的多樣性，這有助於優化範例選擇的質量和範圍。
- N-Gram 重疊：根據 n-gram 重疊分數來選擇和排序範例，這意味著選擇那些在字詞或語句片段層面上與輸入最為相似的範例。
- 相似性：基於與輸入的餘弦相似性分數來選擇範例，這一策略要求用戶提供嵌入，從而基於這些嵌入計算相似度。

4. 在 LangChain 中，"Chain"是應用的基礎，是對複雜的 Prompt 的一種抽象化管理。使用 Chain，開發者能夠創建一個功能，該功能能接受某些文本作為輸入並生成一些文本作為輸出，這與 OpenAI Playground 的操作非常相似。

透過組織不同的 Chain 成一個管道，開發者可以處理更加複雜的任務。例如：

- SimpleSequentialChain：這個類允許開發者將兩個或更多的 Chain 按順序連接起來，其中一個 Chain 的輸出會自動成為下一個 Chain 的輸入。這種方式便於執行一系列操作，每步操作依賴於前一步的結果。

- SequentialChain：這個類則提供了更高的靈活性，支持多個輸入。它允許開發者創建一個管道，該管道不僅可以生成單一類型的輸出（例如文本），還可以同時生成多種輸出，如劇本簡介和評論。這種方法尤其適用於需要同時處理多個相關任務的場景。

5. 在 LangChain 中，OutputFixingParser 類是設計來將語言模型（LLM）的輸出轉換成特定格式的工具。這個類的運作方式特別地結合了使用一個具有特定指示的另一個 LLM 和一個簡單的輸出解析器，從而定義解析的結構和格式。這意味著 OutputFixingParser 允許用戶利用一個語言模型來修正或改進另一個模型的輸出，並且通過設定解析器的結構來達到將這些輸出轉化為用戶所需格式的目的。

具體來說，OutputFixingParser 作用如下：

- 指定結構：用戶可以定義一個或多個解析規則，這些規則指出如何從 LLM 的原始輸出中提取信息，以及如何組織這些信息以符合特定的格式要求。
- 使用 LLM 進行修正：透過使用具有特定指示的 LLM，OutputFixingParser 可以進行必要的輸出調整或修正。這可能包括更正語法錯誤、重新格式化信息、或根據指示進行特定的文本轉換。
- 輸出解析：結合簡單的輸出解析器，經過 LLM 處理或修正後的文本會被進一步解析和結構化，以符合最終輸出的格式要求。
