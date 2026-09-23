export interface SkillGroup {
  category: string;
  description: string;
  tools: string[];
  techniques: string[];
}

/**
 * Skill data — mirrors the "Technical Skills" section of the resume.
 * Tools render as pills; techniques stay as supporting data.
 */
export const skillGroups: SkillGroup[] = [
  {
    category: 'GenAI on AWS',
    description: 'Production AI on Bedrock — serverless, event-driven, private networking.',
    tools: ['AWS Bedrock', 'OpenSearch Serverless', 'AWS Lambda', 'ECS Fargate', 'SQS', 'EventBridge', 'DynamoDB', 'ElastiCache', 'S3', 'RDS', 'AWS CDK', 'CloudFormation'],
    techniques: ['Event-driven Microservices', 'Cross-account IAM/KMS Least-privilege', 'VPC-private Inference', 'Zero-downtime Cutover', 'CloudFormation Stack Refactor'],
  },
  {
    category: 'Agentic & RAG',
    description: 'Multi-agent orchestration, MCP services, retrieval at enterprise scale.',
    tools: ['LangGraph', 'MCP', 'LangChain', 'LlamaIndex', 'Qdrant', 'Neo4j', 'FAISS', 'PostgreSQL', 'MongoDB', 'Redis'],
    techniques: ['ReAct Pattern', 'Multi-Agent Routing', 'Hybrid Search (Vector + BM25 + Graph)', 'Cross-Encoder Reranking', 'Hierarchical Semantic Chunking', 'Metadata Filtering', 'Prompt & Context Engineering', 'Semantic Caching'],
  },
  {
    category: 'FM Evaluation & LLMOps',
    description: 'Evaluation harnesses, observability, compliance guardrails, CI/CD.',
    tools: ['RAGAS', 'Langfuse', 'LangSmith', 'GitHub Actions', 'Docker', 'Kubernetes', 'Ray'],
    techniques: ['LLM-as-Judge Eval', 'Deterministic recall@k Harness', 'A/B Parity Testing', 'Claim-level Fact-Checking (FEVER)', 'Distributed Tracing', 'PII Redaction'],
  },
  {
    category: 'Fine-tuning & Engineering',
    description: 'Model adaptation and the backend systems that serve it.',
    tools: ['Python', 'FastAPI', 'PyTorch', 'vLLM', 'TypeScript', 'gRPC', 'Kafka', 'RabbitMQ'],
    techniques: ['LoRA / QLoRA Fine-tuning', 'Async & SSE Streaming', 'Infrastructure as Code', 'Distributed Model Serving'],
  },
];

