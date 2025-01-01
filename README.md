# mixtcha
## 🧪 quickly mix LLMs together 🧪

Mixtcha allows you to effortlessly blend multiple LLMs (GPT-4, Claude, etc.) into a single API call. Run models in parallel, aggregate their responses, and get high-quality results.

## Quick Start

1. Get your API key from [mixtcha.com](https://mixtcha.com) and add some credits to your Mixtcha wallet.

2. Save the API key in `.env`:

    ```plaintext
    MIXTCHA_API_KEY=sk-mix-1234-your-key
    ```

3. Install dependencies:

    ```bash
    pip install openai python-dotenv pyyaml
    ```

4. Start mixing LLMs:

    ```python
    import os
    import dotenv
    import openai
    import yaml

    dotenv.load_dotenv()
    client = openai.OpenAI(
        api_key=os.getenv("MIXTCHA_API_KEY"),
        base_url="https://api.mixtcha.com"
    )

    # Define a parallel + aggregator configuration
    config = {
        "layers": [
            {
                "type": "parallel",
                "models": ["openai/gpt-4o", "anthropic/claude-3.5-sonnet"]
            },
            {
                "type": "aggregator", 
                "model": "anthropic/claude-3.5-sonnet",
                "prompt": "Synthesize the previous responses into a single, high-quality answer."
            }
        ],
        "messageMode": "inline",
        "delimiter": ["<option>", "</option>"]
    }

    response = client.chat.completions.create(
        model=yaml.dump(config),
        messages=[
            {"role": "user", "content": "Why are mixtures of LLMs powerful?"}
        ]
    )

    print(response.choices[0].message.content)
    ```

## Features

- **Parallel Processing**: Run multiple LLMs simtaneously
- **Smart Aggregation**: Synthesize multiple responses into one
- **Simple API**: Uses familiar OpenAI-style interface, use mixtcha with any application or client that allows you to override the `base_url` and `model`
- **Flexible Configuration**: Define custom LLM mixtures in YAML/JSON
- **Transparent**: Inspect intermediate responses from each model, including the cost

## Next Steps

- Check out our [Quickstart Notebook](./examples/quickstart.ipynb) for a detailed walkthrough
- Browse available models and pricing at [mixtcha.com/models_list.yaml](https://mixtcha.com/models_list.yaml)
- See our [TypeScript type definitions](./reference/types.ts) for type-safe configurations
- Save your mixtcha configurations as YAML/JSON files and [share them with the community](https://github.com/mixtcha/mixtcha/discussions/categories/show-and-tell).

