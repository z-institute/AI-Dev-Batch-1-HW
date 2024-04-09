# AccuGPTsheet

AccuGPTsheet 是一款能夠在 Google Sheets 中直接調用 GPT-3.5 Turbo API 的工具。透過 AccuGPTsheet，用戶可以在 Google Sheets 的電子表格中直接利用 GPT-3.5 Turbo 的強大自然語言處理能力，進行：
1. 對**特定列中的所有內容**進行智能分析和回應生成
2. 對當前選中的**單個儲存格**進行處理
進而提高生產效率，和實現高度自動化的資料處理設計。

**使用 AccuGPTsheet 的好處**

- **自動化資料處理**：可以自動化執行如摘要、分類、問答等多種基於資料的任務，大幅提升工作效率。
- **直接在表格中使用**：無需離開 Google Sheets 或使用外部軟件，直接在電子表格環境中調用高級 AI 能力。
- **靈活應用**：適用於市場研究、數據分析、自動生成報告資料等多種場景，特別適合需要處理大量資料數據的用戶。
- **簡化操作**：用戶友好的設計使得即使是非技術背景的用戶也能輕鬆上手，通過幾個簡單的步驟即可完成複雜的資料處理任務。

## 文件連結

https://github.com/accucrazy/AccuGPTsheet

## 實作紀錄

### 安裝與設定
Step 1. 命名檔案名稱為**Z-W1 HW AccuGPTsheet Practice**

Step 2. 點擊上方的 擴充元件 > Apps Script 以開啟 Google Apps Script 編輯器

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2002.31.17.png)

Step 3. 命名專案名稱為 **AccuGPTsheet script**，刪除所有預設的程式碼

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2002.36.13.png)

Step 4. 將提供的 "AccuGPTsheet" script 完整複製並貼上 (main.js)

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2002.37.57.png)

Step 5. 在 script 中用 ctrl+f 尋找要替換 openai API key 的段落

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2002.46.06.png)

Step 6. 去 OpenAI 官網選擇 API 產品登入

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2002.47.28.png)

Step 7. 到 帳號設定 > API keys 頁面，點擊 **+Create new secret key** 取得 API key

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2002.49.31.png)

Step 8. 回到第 5 步的 Apps Script，把 OpenAI API key 替換上去

Step 9. 鍵入 ctrl+s 進行儲存，完成後就可以關閉 script 編輯器了

Step 10. 回到 Google Sheet，重新整理或關閉再開啟頁面，就可以在導航選單看見**AccuGPTsheet**

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2003.05.07.png)


### 使用範例 1：針對特定列中的所有內容，取得批次回應

Step 1. 選擇 A 列中的 A1~A4 儲存格

Step 2. 在 AccuGPTsheet 選單中，選擇「Batch Update Responses」

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2020.49.26.png)

Step 3. 等待 API 回傳結果後，B 列顯示批次回應

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2020.49.59.png)

注意：如果 API 回應失敗，顯示 Error: Unable to fetch response，請檢查在 OpenAI 是否已經完成綁定信用卡，完成後才能成功取得 API 回應。


### 使用範例 2：針對單一儲存格，取得單一回應

Step 1. 選擇 A1 儲存格

Step 2. 在 AccuGPTsheet 選單中，選擇「Get Single Response」

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2020.48.58.png)

Step 3. 等待 API 回傳結果後，B1 儲存格顯示單一回應

![替代文字](https://github.com/z-institute/AI-Dev-Batch-1-HW/blob/8ac714e6ebc3c4f8c18ba1bd4281c5e553279454/w1/images/%E6%88%AA%E5%9C%96%202024-04-09%2020.48.33.png)
