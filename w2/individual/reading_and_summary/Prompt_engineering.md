# Prompt Engineering Methods for Math Problems

As we known, LLMs are not good at inference, especially with mathematical problems. As a result, I researched on three prompt engineering methods and combined them to improve LLM on solving math problems.

## References
### Auto Prompt
[Large Language Models Are Human-Level Prompt Engineers](https://arxiv.org/abs/2211.01910)

The prompt **"Let's work this out in a step by step way to be sure we have the right answer."** elicits Chain-of-Thought Prompting reasoning and improves performance on the MultiArith and GSM8K benchmarks:

![image](images/Auto.png)



### DUP
[Deeply Understanding the Problems Makes LLMs Better Reasoners](https://arxiv.org/abs/2404.14963v2)

![image](images/DUP.png)

### Prompt Example of DUP
```
Stage 1. Please extract core question, only extract the most comprehensive and detailed one!
Stage 2. Note: Please extract the problem-solving information related to the core question [Core Question info], Only extract the most useful information, list them one by one!
Stage 3. Hint: [Problem-Solving Info]\n[Core Question]\n Please understand the Hint and question information, then solve the problem step by step and show the answer.
```


### ToT
[Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/abs/2305.10601)

![image](images/ToT.webp)

### Prompt Example of ToT
```
Imagine three different experts are answering this question.
All experts will write down 1 step of their thinking,
then share it with the group.
Then all experts will go on to the next step, etc.
If any expert realises they're wrong at any point then they leave.
The question is...
```

## Testing Data
[GSM8K:](https://huggingface.co/datasets/gsm8k?row=0)

GSM8K (Grade School Math 8K) is a dataset of 8.5K high quality linguistically diverse grade school math word problems. The dataset was created to support the task of question answering on basic mathematical problems that require multi-step reasoning.

## Final Prompt
```
prompt = """
Imagine three different experts are answering this question.
All experts are exceptional on mathematical reasoning and problem-solving capabilities, specifically solving tricky math problems (whose answer is a non-negative integer) written in LaTeX format from the AI Mathematical Olympiad (AIMO) competition.
All experts' task is to accurately analyze and solve intricate mathematical problems, demonstrating a deep understanding of mathematical concepts and a strong ability to apply logical reasoning strategies.

Instruction:
Stage 1. All experts will extract the most comprehensive and detailed core question, then share it with the group.
Stage 2. All experts will extract the most useful problem-solving information related to the core question [Core Question info], and they will list the information one by one!
Stage 3. Hint: [Problem-Solving Info]\n[Core Question]\n Please understand the Hint and question information, then solve the problem step by step and show the answer.
Stage 4. If any expert realises they're wrong at any point then they leave.
Stage 5. Provide the Final answer in the format below: Result = <your answer> <submit>

Now, let's work this out in a step by step way to be sure we have the right answer.

Problem:"""
```

## Result 

### Input
```
Natalia sold clips to 48 of her friends in April, and then she sold half as many clips in May. How many clips did Natalia sell altogether in April and May?
```

### Output
```
**Expert 1:**
The core question of the problem is: "How many clips did Natalia sell in total during the months of April and May?"

**Expert 2:**
Listing the most useful problem-solving information related to the core question:
1. Natalia sold clips to 48 friends in April.
2. She sold half that number of clips in May.
3. We are asked for the total number of clips sold in both April and May.

**Expert 3:**
[Problem-Solving Info]
- Number of clips sold in April = 48
- Number sold in May = half of April's number = 48 / 2 = 24
[Core Question]
- Total number of clips sold over April and May = April's clips + May's clips

Let's calculate the total:
In April = 48 clips
In May = 24 clips

Total = 48 + 24 = 72 clips

**Expert 1, 2, 3:** 
If we have all verified each other's calculations and understandings, and agree with the detailed problem-solving process, we should now provide the final answer.

Final answer:
Result = 72 <submit>
```