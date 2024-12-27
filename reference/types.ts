export type ModelName = string;
export type PromptType = string | null;

export interface BaseLayer {
  type: 'parallel' | 'aggregator';
}

export interface ParallelLayer extends BaseLayer {
  type: 'parallel';
  models: ModelName[];
  prompts: PromptType | PromptType[];
  systemPrompts: PromptType | PromptType[];
}

export interface AggregatorLayer extends BaseLayer {
  type: 'aggregator';
  model: ModelName;
  prompt: PromptType;
  systemPrompt: PromptType;
}

export type Layer = ParallelLayer | AggregatorLayer;

export interface LLMMixtureConfig {
  layers: Layer[];
  messageMode: "inline" | "concat";
  delimiter: [string, string];
}