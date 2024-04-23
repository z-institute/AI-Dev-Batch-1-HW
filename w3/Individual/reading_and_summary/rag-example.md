## 按照步驟執行時的問題及解決方式

1.  README.md 執行步驟 poetry run python importer/save_notion_html.py
    - 錯誤訊息
        The currently activated Python version 3.12.2 is not supported by the project (>=3.11,<3.12).  2 ✘  at 14:12:04  Trying to find and use a compatible version. Using python3 (3.11.4) Traceback (most recent call last): File "/Users/huangwei/code/rag-example/importer/save_notion_html.py", line 1, in <module> from selenium import webdriver ModuleNotFoundError: No module named 'selenium'</module>
    - 解決方式：安裝缺少的模組
        
        ```bash
        poetry add selenium
        ```
        
3.  README.md 執行步驟 poetry run python importer/html_process_google.py
    - 錯誤訊息
          1 ✘  took 5s   at 14:26:50  The currently activated Python version 3.12.2 is not supported by the project (>=3.11,<3.12). Trying to find and use a compatible version. Using python3 (3.11.4) [nltk_data] Error loading punkt: <urlopen error [SSL: [nltk_data] CERTIFICATE_VERIFY_FAILED] certificate verify failed: [nltk_data] unable to get local issuer certificate (_ssl.c:1002)> [nltk_data] Error loading punkt: <urlopen error [SSL: [nltk_data] CERTIFICATE_VERIFY_FAILED] certificate verify failed: [nltk_data] unable to get local issuer certificate (_ssl.c:1002)> Traceback (most recent call last): 
    - 解決方式：更新本機的 SSL 證書
        
        ```bash
        /Applications/Python\ 3.11/Install\ Certificates.command
        ```
        
5. README.md 執行步驟 斜線問題
    
    `poetry run python importer\save_notion_html.py`
    
    - 解決方式：改成正斜線
        
        `poetry run python importer/save_notion_html.py`
        
6. README.md 執行步驟 檔案名稱問題
    
    `poetry run python importer/html_process.py`
    
    - 解決方式：調整檔案名稱
        
        `poetry run python importer/html_process_google.py`
        
7. README.md 執行步驟 poetry run python app/server.py
    - raise GoogleGenerativeAIError(f"Error embedding content: {e}") from e
langchain_google_genai._common.GoogleGenerativeAIError: Error embedding content: 403 Generative Language API has not been used in project 826147588325 before or it is disabled. Enable it by visiting
    <img width="1449" alt="01" src="https://github.com/z-institute/AI-Dev-Batch-1-HW/assets/17631356/3ea07abd-d30e-4e86-ad48-f5d302dec53a">
    - 解決方式：換成 embedding-001 module 
       <img width="961" alt="02" src="https://github.com/z-institute/AI-Dev-Batch-1-HW/assets/17631356/e994ac1d-824c-4225-8481-638c43ea3b7f">



### 執行結果

1. Open AI： 幫我介紹有哪些 AI 工具
   <img width="986" alt="03" src="https://github.com/z-institute/AI-Dev-Batch-1-HW/assets/17631356/18b41dc0-e7c4-43e7-98e6-967b57d8bcf9">
2. Open AI：說說 Voice.ai
   <img width="856" alt="04" src="https://github.com/z-institute/AI-Dev-Batch-1-HW/assets/17631356/a81fab8c-b3a5-4b60-84f3-7c64e04f7d99">
3. gemini-pro：幫我介紹有哪些 AI 工具
   <img width="831" alt="05" src="https://github.com/z-institute/AI-Dev-Batch-1-HW/assets/17631356/c6ff5849-1dea-4f9f-bc03-b770f2ba57de">
4. gemini-pro：說說 Voice.ai
   <img width="889" alt="06" src="https://github.com/z-institute/AI-Dev-Batch-1-HW/assets/17631356/88edec06-e2ed-4e9d-88d9-bc9ff225d6e3">



### bot.py
-  範例的 python-telegram-bot 是舊版 v13 的用法，如果安裝最新版本的 python-telegram-bot，會產生大量物件沒有屬性的錯誤。
   最終參考 stackoverflow 這篇 https://stackoverflow.com/questions/74986002/attributeerror-updater-object-has-no-attribute-dispatcher ，降版讓程式不會報錯
- 然後要做什麼就不知道了，得參考 TG 官方文件，但時間不夠用了。
  <img width="850" alt="image" src="https://github.com/z-institute/AI-Dev-Batch-1-HW/assets/17631356/8339c2b9-520d-478d-90de-2b362b94192a">



