from flask import Flask, render_template, request
from openai import OpenAI

app = Flask(__name__, template_folder='放template的位址')

# client = OpenAI()
client = OpenAI(api_key="APIKEY放這裡")


# 定義首頁
@app.route('/')
def index():
    return render_template('index.html')

# 處理用戶輸入並生成回覆
@app.route('/generate_response', methods=['POST'])
def generate_response():
    user_input = request.form['user_input']
    
    # 調用 OpenAI API 生成回覆
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "你是用戶的專業客服，不是AI，請依照以下步驟執行：1. 每次跟用戶聊天後，總結之前的對話內容\n2.依照之前的對話內容，加上這次用戶給你的訊息，依找你的知識庫來生成相關的回覆。\n3. 依照你的回覆內容以1到10分給予信心程度。\n\n格式以下\n之前的對話總結：\n回覆：\n信心程度："
            },
            {
                "role": "user",
                "content": user_input
            }
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    # 獲取生成的回覆
    print(response.choices)
    generated_response = response.choices[0].message["content"]


    return render_template('response.html', user_input=user_input, generated_response=generated_response)

if __name__ == '__main__':
    app.run(debug=True)
