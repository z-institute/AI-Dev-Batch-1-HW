# Usage

## 步驟一

1. Set .env first by copying ˋ.env.exampleˋ to ˋ.envˋ and fill in the necessary information like OPENAI_API_KEY

要有3個KEY..

OPENAI_API_KEY=xxx  這有了
GOOGLE_API_KEY=xxx 這需要去申請 [https://ai.google.dev/](https://ai.google.dev/)
BOT_TOKEN=xxx  [https://telegram.me/BotFather在這](https://telegram.me/BotFather)

## 步驟二

2.Put markdown files in ˋsource_docsˋ folder

將PDF文檔轉成markdown的md檔案丟進去
接下來
一樣先啟動環境
conda activate Week3_RAG
cd D:\.....

## 步驟三

```bash
poetry run python importer\save_notion_html.py
```

### 缺少了selenium的處理

![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w3/Individual/coding/image/Week3HW_pic01.PNG)
from selenium import webdriver
ModuleNotFoundError: No module named 'selenium'

少了selenium... 不知道Poetry少了一個套件該去pyproject.toml補 還是? 還是用pip裝一下這套件?

問了ChatGPT 建議pyproject.toml補，後poetry install，避免環境混亂
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w3/Individual/coding/image/Week3HW_pic02.PNG)

這樣應該不會檔案壞掉吧? 希望不會版本衝突
遇到問題了，需要更改poetry.lock檔案
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w3/Individual/coding/image/Week3HW_pic03.PNG)

改完之後安裝
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w3/Individual/coding/image/Week3HW_pic04.PNG)

## 繼續步驟三

很好新問題
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w3/Individual/coding/image/Week3HW_pic05.PNG)
又去下載了[ChromeDriver](https://chromedriver.chromium.org/downloads)
參考了[Python Selenium with VSCODE 教學筆記](https://hackmd.io/@FortesHuang/S1V6jrvet#%E4%B8%89%E3%80%81%E5%AE%89%E8%A3%9D-WebDriver)

把東西裝在Python的檔案底下，這樣應該抓得到? 抓不到

所以改丟之前放poetry環境變數的位址 就出現更多錯誤代碼..

```bash
Traceback (most recent call last):
  File "D:\202404_Week3_RAG_Example\rag-example\importer\save_notion_html.py", line 12, in <module>
    driver = webdriver.Chrome()
             ^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\selenium\webdriver\chrome\webdriver.py", line 76, in __init__
    RemoteWebDriver.__init__(
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\selenium\webdriver\remote\webdriver.py", line 157, in __init__
    self.start_session(capabilities, browser_profile)
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\selenium\webdriver\remote\webdriver.py", line 252, in start_session
    response = self.execute(Command.NEW_SESSION, parameters)
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\selenium\webdriver\remote\webdriver.py", line 319, in execute
    response = self.command_executor.execute(driver_command, params)
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\selenium\webdriver\remote\remote_connection.py", line 374, in execute
    return self._request(command_info[0], url, body=data)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\selenium\webdriver\remote\remote_connection.py", line 397, in _request
    resp = self._conn.request(method, url, body=body, headers=headers)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\_request_methods.py", line 144, in request
    return self.request_encode_body(
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\_request_methods.py", line 279, in request_encode_body
    return self.urlopen(method, url, **extra_kw)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\poolmanager.py", line 433, in urlopen
    conn = self.connection_from_host(u.host, port=u.port, scheme=u.scheme)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\poolmanager.py", line 304, in connection_from_host
    return self.connection_from_context(request_context)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\poolmanager.py", line 329, in connection_from_context
    return self.connection_from_pool_key(pool_key, request_context=request_context)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\poolmanager.py", line 352, in connection_from_pool_key
    pool = self._new_pool(scheme, host, port, request_context=request_context)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\poolmanager.py", line 266, in _new_pool
    return pool_cls(host, port, **request_context)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\connectionpool.py", line 196, in __init__
    timeout = Timeout.from_float(timeout)
              ^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\util\timeout.py", line 186, in from_float
    return Timeout(read=timeout, connect=timeout)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\util\timeout.py", line 115, in __init__
    self._connect = self._validate_timeout(connect, "connect")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "E:\File\Anaconda3\envs\Week3_RAG\Lib\site-packages\urllib3\util\timeout.py", line 152, in _validate_timeout
    raise ValueError(
ValueError: Timeout value connect was <object object at 0x00000160BBC44570>, but it must be an int, float or None.
```

詢問ChatGPT感覺更複雜了LUL
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w3/Individual/coding/image/Week3HW_pic06.PNG)
