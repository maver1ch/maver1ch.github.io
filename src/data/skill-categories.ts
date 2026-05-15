/**
 * Category-color mapping for skill pills.
 * Keys are case-insensitive substrings; first match wins (most specific first).
 * Falls back to "neutral" when no match.
 */

export type SkillCategory = 'lang' | 'framework' | 'cloud' | 'db' | 'concept' | 'neutral';

const RULES: Array<[RegExp, SkillCategory]> = [
  // Languages
  [/^(python|typescript|javascript|go|rust)$/i, 'lang'],

  // AI / ML frameworks
  [/(pytorch|tensorflow|langchain|langgraph|llamaindex|langfuse|langsmith|huggingface|flux|vllm)/i, 'framework'],

  // Cloud / Infra / DevOps
  [/^aws($| )/i, 'cloud'],
  [/(lambda|bedrock|eventbridge|sqs|ecs fargate|fargate|cdk|s3|rds|elasticache|cloudfront|api gateway)/i, 'cloud'],
  [/(docker|kubernetes|k8s|ray|github actions|ci\/cd|terraform|helm)/i, 'cloud'],

  // Databases / Storage / Messaging
  [/(qdrant|opensearch|postgresql|postgres|mongodb|mongo|redis|kafka|rabbitmq|elasticsearch|pinecone|weaviate|chroma)/i, 'db'],

  // Concepts / Patterns / Techniques
  [/(react pattern|multi-agent|llm-as-judge|semantic caching|pii redaction|sse streaming|prompt chaining|hybrid search|cross-encoder|hierarchical|rag|reranking|chunking|streaming|sse)/i, 'concept'],
];

export function classifySkill(label: string): SkillCategory {
  for (const [pattern, category] of RULES) {
    if (pattern.test(label)) return category;
  }
  return 'neutral';
}
