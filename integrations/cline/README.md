# Using mixtchas with cline

Both [Cline](https://github.com/cline/cline) and the popular [Roo-Cline](https://github.com/RooVetGit/Roo-Cline) fork can be configured to use mixtchas. 

New users will need to install these extensions into VS Code / etc. You will also need to get past the initial welcome page that currently implies Cline only works with Claude. 

Then, in Settings: 
 - Choose `API Provider = OpenAI Compatible`
 - The Base URL is `https://api.mixtcha.com`
 - The API key is your `sk-mix-1234yourkeyhere` API key, which you can get at [https://mixtcha.com](https://mixtcha.com)
  
![set up cline with mixtcha](<CleanShot 2025-01-05 at 09.20.52@2x.png>)

## Using a Configuration Text String
You can paste a mixtcha configuration directly into the Model Name field. For example:
```
{delimiter: [<option>, </option>], layers: [{models: [deepseek/deepseek-chat, deepseek/deepseek-chat], systemPrompts: ['think through the problem like a test engineer, from the end to the beginning', 'think through the problem from first principles, step by step, from the beginning'], type: parallel}, {model: deepseek/deepseek-chat, prompt: 'Multiple answers were provided between <option> tags. Please synthesize them into a single, high-quality response. Do not assume that I have seen these responses. Consider all perspectives and create a comprehensive answer that leverages all approaches. Think step-by-step before providing your final answer.', type: aggregator}], messageMode: inline}
```
![text string](<CleanShot 2025-01-05 at 09.26.54@2x.png>)

Note: You can generate the configuration YAML text using Python's `yaml.dump()` function:
```python
config = {
    "layers": [
        {
            "type": "parallel",
            "models": ["deepseek/deepseek-chat", "deepseek/deepseek-chat"],
            "systemPrompts": [
                "think through the problem like a test engineer, from the end to the beginning",
                "think through the problem from first principles, step by step, from the beginning"
            ]
        },
        {
            "type": "aggregator",
            "model": "deepseek/deepseek-chat",
            "prompt": "Multiple answers were provided between <option> tags. Please synthesize them into a single, high-quality response. Do not assume that I have seen these responses. Consider all perspectives and create a comprehensive answer that leverages all approaches. Think step-by-step before providing your final answer."
        }
    ],
    "messageMode": "inline",
    "delimiter": ["<option>", "</option>"]
}

yaml_string = yaml.dump(config, default_flow_style=True)
print(yaml_string)
```

## Using a URL Configuration
You can use a mixtcha configuration hosted at a URL by setting the Model Name to:
```
https://raw.githubusercontent.com/mixtcha/mixtcha/refs/heads/deepseek-aider/experiments/deepseek-aider/multiple-hats.yaml
```
![url config](<CleanShot 2025-01-05 at 09.30.11@2x.png>)

## Using a Single Model
For simple use cases, you can directly specify a single model name:
```
deepseek/deepseek-chat
```
![single model](<CleanShot 2025-01-05 at 09.31.22@2x.png>)
Browse available models and pricing at [mixtcha.com/models_list.yaml](https://mixtcha.com/models_list.yaml)


