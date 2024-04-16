# 作業一 Prompt使用

[Playground的網址](https://platform.openai.com/playground/chat)

## 方法一 問題詳細，潛在做法也寫出

![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w2/Individual/coding/image/Week2HW_pic01.PNG)

## 方法二 AI角色扮演

扮演客服
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w2/Individual/coding/image/Week2HW_pic02.PNG)
扮演老師，來解釋很難的問題或論文，用擬人化的比喻來解釋
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w2/Individual/coding/image/Week2HW_pic03.PNG)

## 方法三 定義特定的輸入與輸出格式

好感度or回覆的信心評分，預估用戶看到回覆的信心程度是1-10分得幾分，高於8輸出 低於則重新生成。
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w2/Individual/coding/image/Week2HW_pic04.PNG)

## 方法四 定義讓 A I 處理問題的步驟

做聊天相關的可以follow這個方法，尤其是會記錄總結前面說過的話
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w2/Individual/coding/image/Week2HW_pic05.PNG)
如果我之後想做的內容是聊天機器人相關，那我就要再欄位加一個：生成一個問題來更了解用戶。
上面圖片的例子單純是客戶與客服，所以並沒有要求AI多了解用戶。

## 方法五 指定回覆訊息的長度

控制回覆的長度來控制聊天氛圍和回覆形式，像是人在聊天通常回覆的內容不會很長，不會像是AI囉哩八說一大段。如果短短的會更像真人一些。
其他例子:生成300字新聞、50字的快訊、12字的標題
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w2/Individual/coding/image/Week2HW_pic06.PNG)

## 方法六 定義分類， 並將問題分類

做聊天相關的也可以follow這個方法，讓ＡＩ判斷使用者目的例如無聊想聊天還是想解決問題尋求協助等來將問題分類並回

## ⽅法七 請 A I 思考他的回覆是否達成特定⽬的

這方法重點是讓ＡＩ思考，讓ＡＩ生成回覆後思考這個回覆有達成這目標的理由。
－
可以先去查一些某目的達成的要素來當成評分系統，將這些內容當Prompt給AI System欄位

## 右側欄位

### Temperature 越小越古板 越大越創意

文字1上下就好

### Frequency penality是讓AI模型減少生成重複的內容

最重要的!!!

右上角View code 可以複製將其貼到自己的程式碼上面使用。

## Playgroud是最重用的

選擇不同模型，測試Prompts

## API KEY不同應用就要開不同個

避免使用者或用途分不清
可以再Usage看不同的model的用量多少
![Image text](https://raw.githubusercontent.com/z-institute/AI-Dev-Batch-1-HW/Z24049001/w2/Individual/coding/image/Week2HW_pic07.PNG)

## Finetune 訓練語氣

閱讀一本書的內容，通常是RAG的做法。

### 同時要聰明又懂語氣就要結合Finetune + RAG，但我自己試有一些問題-----------------------------------

例如在RAG吃的文本沒有就會亂回或是回Sorry I dont know 或是當RAG後的結果再Finetune又會偏差
使得結果不如當純Finetune的結果好

### 將Google sheet 轉成jsonl格式檔案做為Finetune資料，期待老師之後會教如何做--------------------------------

寫一個Python script 從Google sheet自動生成Jsonl格式{"messages": [{"role": "system", "content": "您現在扮演的是XXXX的客服人員"}, {"role": "user", "content": 問題"}, {"role": "assistant", "content": 解答"}]}

### Finetune步驟

1. 左側Storages上傳jsonl訓練資料
2. 左側Finetuning按Create
3. 設定訓練資料jsonl
4. 設定Base model
等待約15分鐘~~~~~~
假設之前已經有訓練幾十筆資料，就可以選上次訓練過的model來做Base model節省訓練時間

#### suffix 模型名稱前綴

有寫會方便找到Model

### 小點

1. 訓練資料目前只吃問答
2. 可以先將QA內容給AI分類，再到Playground用前面學到的技巧方法六，先請他判斷是哪類，如果不是則回答....or不回答。限縮回答的範圍。
3. Ollma可以弄些輕量化的模型GGUF在本地，但還是需要GPU支援，

## Vast ai 可以購買線上GPU (不是On demad)

不過Openai比租機器便宜很多，租機器是Always on
有一些template

-----------time 1:31:30
