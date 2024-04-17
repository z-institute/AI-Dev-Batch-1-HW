# 作業一

## 建環境

```bash
conda create -n Week_RAG python=3.11
conda list
```

開新資料夾套用環境
下載檔案
指令

```bash
git clone https://github.com/z-institute/rag-example.git
```

## 依照Readme開始執行

```bash
pip install -U langchain-cli
```

下載完沒事

```bash
poetry install
```

就開始出現問題了

```bash
poetry installpoetry : 無法辨識 'poetry' 詞彙是否為 Cmdlet、函數、指令檔或可執行程式的名稱。請檢查名稱拼字是否正確，如果包含路徑的話，請確認路徑是否正確，然後再試一次。
位於 線路:1 字元:1

```Shell
+ poetry install
+ ~~~~~~
    + CategoryInfo          : ObjectNotFound: (poetry:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
```

於是要開始了解Poetry是什麼、下載Poetry和什麼是pyproject.toml

### 下載Poetry

[Poetry介紹文章](https://blog.kyomind.tw/python-poetry/)

簡單來說，Poetry比pip有更好的套件管理，可以幫助環境整潔和減少版本衝突問題

因為要下載Poetry，又因他的文件提醒要與專案下載位置分開所以又開了個新環境

#### 建放Poetry的環境

```bash
conda create -n Poetry_env python=3.11
```

不確定這邊Python版本要多少，所幸先和專案版本一樣...
conda activate Poetry_env
啟動環境後

```bash
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

下載...

```bash
# Welcome to Poetry!

This will download and install the latest version of Poetry,
a dependency and package manager for Python.

It will add the `poetry` command to Poetry's bin directory, located at:

C:\Users\user\AppData\Roaming\Python\Scripts

You can uninstall at any time by executing this script with the --uninstall option,
and these changes will be reverted.

Installing Poetry (1.8.2)
Installing Poetry (1.8.2): Creating environment
Installing Poetry (1.8.2): Installing Poetry
Installing Poetry (1.8.2): Creating script
Installing Poetry (1.8.2): Done

Poetry (1.8.2) is installed now. Great!

To get started you need Poetry's bin directory (C:\Users\user\AppData\Roaming\Python\Scripts) in your `PATH`
environment variable.

Alternatively, you can call Poetry explicitly with `C:\Users\user\AppData\Roaming\Python\Scripts\poetry`.

You can test that everything is set up by executing:

`poetry --version`
```

下載後

```bash
poetry --version
```

#### 加入Path

還是沒辦法使用-> 要加入Path  [Path是什麼?](https://openhome.cc/Gossip/JavaEssence/WhatPath.html)

嘗試使用以下這段，但沒成功

```bash
$Env:Path += ";C:\Users\user\AppData\Roaming\Python\Scripts"; setx PATH "$Env:Path"
```

之後改問ChatGPT

1. 打開「控制面板」。
2. 點擊「系統和安全」。
3. 點擊「系統」。
4. 在左側選擇「進階系統設置」。
5. 在彈出的窗口中，點擊「環境變量」按鈕。
6. 在「系統變量」部分中，找到名為「PATH」的變量，並選擇它。
7. 點擊「編輯」按鈕。
8. 在彈出的窗口中，點擊「新增」。
9. 將 Poetry 的二進制目錄的路徑（在你的情況下是 C:\Users\user\AppData\Roaming\Python\Scripts）複製並粘貼到新增的文本框中。
10. 點擊「確定」按鈕，然後在所有窗口中點擊「確定」或「關閉」來保存變更。

就新增成功了Poetry (version 1.8.2)

### 初始化Poetry

[初始化Poetry](https://blog.kyomind.tw/python-poetry/#%E5%88%9D%E5%A7%8B%E5%8C%96-Poetry)
我想這後面的內容，暫時可能用不到，先回去繼續Week3HW
[Python 開發：pyproject.toml 介紹 + 使用教學](https://blog.kyomind.tw/pyproject-toml/)

經過一連串神奇的操作
conda activate Week3_RAG
cd D:\202404_Week3_RAG_Example\rag-example
才會是下面這樣
(Week3_RAG) PS D:\202404_Week3_RAG_Example\rag-example> poetry install
這樣應該有下載到對的地方吧?後來在虛擬環境的資料夾Anaconda3\envs\Week3_RAG\Lib\site-packages確認是有的

```bash
Installing dependencies from lock file

Package operations: 130 installs, 19 updates, 0 removals

  - Installing markupsafe (2.1.4)
  - Installing mpmath (1.3.0)
  - Downgrading certifi (2024.2.2 -> 2023.11.17)
  - Installing filelock (3.13.1)
  - Installing fsspec (2023.12.2)
  - Downgrading idna (3.7 -> 3.6)
  - Installing jinja2 (3.1.3)
  - Installing networkx (3.2.1)
  - Installing numpy (1.26.3)
  - Installing pycparser (2.21)
  - Installing six (1.16.0)
  - Installing sympy (1.12)
  - Downgrading typing-extensions (4.11.0 -> 4.9.0)
  - Downgrading urllib3 (2.2.1 -> 2.1.0)
  - Installing cffi (1.16.0)
  - Installing contourpy (1.2.0)
  - Installing cycler (0.12.1)
  - Installing fonttools (4.47.2)
  - Installing frozenlist (1.4.1)
  - Installing kiwisolver (1.4.5)
  - Installing multidict (6.0.4)
  - Installing mypy-extensions (1.0.0)
  - Installing pillow (10.2.0)
  - Installing protobuf (4.25.2)
  - Installing pyasn1 (0.6.0)
  - Downgrading pydantic (2.7.0 -> 1.10.14)
  - Installing pyparsing (3.1.1)
  - Installing python-dateutil (2.8.2)
  - Downgrading sniffio (1.3.1 -> 1.3.0)
  - Installing torch (2.1.2)
  - Installing tqdm (4.66.1)
  - Installing aiosignal (1.3.1)
  - Installing antlr4-python3-runtime (4.9.3)
  - Downgrading anyio (4.3.0 -> 4.2.0)
  - Installing attrs (23.2.0)
  - Installing onnxruntime (1.15.1)
  - Downgrading orjson (3.10.1 -> 3.9.12)
  - Installing rapidfuzz (3.6.1)
  - Downgrading rich (13.7.1 -> 13.7.0)
  - Installing python-multipart (0.0.6)
  - Installing soupsieve (2.5)
  - Installing transformers (4.37.0)
  - Installing xlsxwriter (3.1.9)
  - Installing onnx (1.15.0)
  - Installing onnxruntime (1.15.1)
  - Downgrading orjson (3.10.1 -> 3.9.12)
  - Installing rapidfuzz (3.6.1)
  - Downgrading rich (13.7.1 -> 13.7.0)
  - Installing python-multipart (0.0.6)
  - Installing soupsieve (2.5)
  - Installing transformers (4.37.0)
  - Installing xlsxwriter (3.1.9)
  - Installing backoff (2.2.1)
  - Installing beautifulsoup4 (4.12.3)
  - Installing chardet (5.2.0)
  - Installing emoji (2.10.0)
  - Installing filetype (1.2.0)
  - Downgrading gitpython (3.1.43 -> 3.1.41): Installing...
  - Downgrading gitpython (3.1.43 -> 3.1.41)
  - Installing google-generativeai (0.5.0)
  - Installing langdetect (1.0.9)
  - Downgrading langserve (0.1.0 -> 0.0.51)
  - Installing markdown (3.5.2)
  - Installing msg-parser (1.2.0)
  - Installing nltk (3.8.1)
  - Installing openai (1.9.0)
  - Installing openpyxl (3.1.2)
  - Installing pikepdf (8.11.2)
  - Installing pypandoc (1.12)
  - Installing pypdf (4.0.0)
  - Installing python-docx (1.1.0)
  - Installing python-iso639 (2024.1.2)
  - Installing python-magic (0.4.27)
  - Installing python-pptx (0.6.23)
  - Installing tabulate (0.9.0)
  - Installing tiktoken (0.5.2)
  - Downgrading tomlkit (0.12.4 -> 0.12.3)
  - Downgrading typer (0.9.4 -> 0.9.0)
  - Installing unstructured-client (0.15.2)
  - Installing unstructured-pytesseract (0.3.12)
  - Installing unstructured-inference (0.7.23)
  - Installing xlrd (2.0.1)
  - Installing faiss-cpu (1.7.4)
  - Installing langchain-experimental (0.0.49)
  - Installing langchain-google-genai (1.0.2)
  - Installing langchain-openai (0.0.3)
  - Installing psycopg (3.1.17)
  - Installing python-dotenv (1.0.0)
  - Installing reportlab (4.1.0)
  - Installing unstructured (0.12.2)

Installing the current project: pdf_rag (0.1.0)
```

終於完成Installation...
