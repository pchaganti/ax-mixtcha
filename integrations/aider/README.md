
# Using mixtchas with aider

To use mixtchas with [aider](https://aider.chat), you need to create a `.aider.model.settings.yml` file. See the [aider documentation for advanced model configuration](https://aider.chat/docs/config/adv-model-settings.html) for more details. 

Because aider uses [litellm](https://github.com/BerriAI/litellm), and neither aider nor litellm currently "know about" mixtchas, we have to "trick" litellm into using the openai chat completions endpoint. 

To do this, we need `litellm_provider: "openai"` and we also need to prefix our model with `model: "openai/...`. 

Currently, streaming isn't supported [https://github.com/mixtcha/mixtcha/issues/2](https://github.com/mixtcha/mixtcha/issues/2), so after saving our mixtcha configuration to `.aider.model.settings.yml`, we need to run aider with `--no-stream`. 

It can be helpful to also use the `--verbose` flag to make sure that aider is reading the correct model settings file, and to use the `--no-show-model-warnings` flag since aider does not "know about" mixtcha, and will otherwise warn you. 

See below for examples of how to use mixtcha with aider.

From a url of a mixtcha configuration:

```
- name: url-mixtcha
  extra_params:
    api_base: "https://api.mixtcha.com"
    api_key: "sk-mix-1234yourkeyhere"
    model: "openai/https://raw.githubusercontent.com/mixtcha/mixtcha/refs/heads/deepseek-aider/experiments/deepseek-aider/multiple-hats.yaml"
    litellm_provider: "openai"
```

`aider --model url-mixtcha --verbose --no-stream --no-show-model-warnings`


From the direct text of a mixtcha configuration:
```
- name: direct-mixtcha
  extra_params:
    api_base: "https://api.mixtcha.com"
    api_key: "sk-mix-1234yourkeyhere"
    model: "openai/{delimiter: [<option>, </option>], layers: [{models: [deepseek/deepseek-chat, deepseek/deepseek-chat],
      systemPrompts: ['think through the problem like a test engineer, from the end
          to the beginning', 'think through the problem from first principles, step
          by step, from the beginning'], type: parallel}, {model: deepseek/deepseek-chat,
      prompt: 'Multiple answers were provided between <option> tags. Please synthesize
        them into a single, high-quality response. Do not assume that I have seen
        these responses. Consider all perspectives and create a comprehensive answer
        that leverages all approaches. Think step-by-step before providing your final
        answer.', type: aggregator}], messageMode: inline}"
    litellm_provider: "openai"
```

`aider --model direct-mixtcha --verbose --no-stream --no-show-model-warnings`

You can get the config yaml text like this, with `yaml.dump` 
```
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

You can also call single models on mixtcha:

```
- name: single-model
  extra_params:
    api_base: "https://api.mixtcha.com"
    api_key: "sk-mix-1234yourkeyhere"
    model: "openai/deepseek/deepseek-chat"
    litellm_provider: "openai"
```

`aider --model single-model --verbose --no-stream --no-show-model-warnings`