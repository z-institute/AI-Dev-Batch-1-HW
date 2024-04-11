# AccuGPTsheet Implementation
## Introduction
[AccuGPTsheet](https://github.com/accucrazy/AccuGPTsheet) allows us to run GPT-3.5 Turbo in Google Sheet.

## Installation and Setup
1. Open Google Sheet and then click on the "Extensions -> Apps Script" to launch the Google Apps Script editor

![img01](images/img01.png)

2. Rename App Script to "AccuGPTsheet"

![img05](images/img05.png)


3. Delete all code in the original App Script and paste all content in "[AccuGPTsheet](https://github.com/accucrazy/AccuGPTsheet) -> [main.js](https://github.com/accucrazy/AccuGPTsheet/blob/main/main.js)" to App Script

 ![img02](images/img02.png)

3. Find "apiKey" in the code and replace it with your own API Key (you can find API Key in Openai at [this website](https://platform.openai.com/playground/chat), do not forget to pay for the bills if your quota is used up)

![img03](images/img03.png)

4. Click on "Save project" on the top of the script and close the script editor

![img04](images/img04.png)

## Usage examples

1. Close Google Sheet and reload it, you will see "AccuGPTsheet" in the tool box next to "Help"

![img06](images/img06.png)

2. Enter any query in a cell, you can do different queries in different cells

![img08](images/img08.png)

3. Click on a query(cell) that you want GPT to answer and click "AccuGPTsheet -> Get Single Response" (You may asked for entering google account in this stage)

![img09](images/img09.png)


**if you have this problem while entering google account, here are some tutorials of solving this problem by using [Google Cloud](https://console.cloud.google.com/welcome/new): [Chinese Tutorial](https://realnewbie.com/front-end/this-app-is-blocked/), [English Tutorial](https://stackoverflow.com/questions/67898285/how-to-resolve-this-app-is-blocked-error-for-shared-google-apps-script-library)** 

![img12](images/img12.png)


4. Finally, you can see the response from GPT-3.5 Turbo in the Google Sheet !

![img10](images/img10.png)

5. Keep doing queries and get respones as many as you want !

![img11](images/img11.png)
