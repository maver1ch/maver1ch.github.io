export interface SkillGroup {
  category: string;
  description: string;
  tools: string[];
  techniques: string[];
}

/**
 * Skill data — separated into Tools (concrete frameworks/products)
 * and Techniques (concepts/patterns/methods).
 * Tools render as pills, techniques as bullet checks.
 */
export const skillGroups: SkillGroup[] = [
  {
    category: 'Agentic AI',
    description: 'Multi-agent systems, RAG patterns, model orchestration.',
    tools: ['Python', 'PyTorch', 'LangChain', 'LangGraph', 'LlamaIndex', 'FLUX.1 LoRA', 'vLLM'],
    techniques: ['ReAct Pattern', 'Multi-Agent Routing', 'Skill-based Decomposition', 'Tool Calling'],
  },
  {
    category: 'Cloud & DevOps',
    description: 'Production AWS infrastructure, IaC, container orchestration.',
    tools: ['AWS Lambda', 'AWS Bedrock', 'EventBridge', 'SQS', 'OpenSearch', 'ECS Fargate', 'Docker', 'Kubernetes', 'Ray', 'AWS CDK', 'GitHub Actions'],
    techniques: ['Event-driven Microservices', 'Auto-scaling', 'Zero-trust VPC', 'CI/CD via IaC'],
  },
  {
    category: 'LLMOps & Eval',
    description: 'Observability, evaluation, compliance, performance.',
    tools: ['Langfuse', 'LangSmith'],
    techniques: ['LLM-as-Judge Eval', 'Claim-level Fact-Checking (FEVER)', 'Semantic Caching', 'PII Redaction', 'SSE Streaming', 'Prompt Chaining', 'Distributed Tracing'],
  },
  {
    category: 'Data & Retrieval',
    description: 'Vector, full-text, graph search. Hybrid retrieval at scale.',
    tools: ['Qdrant', 'FAISS', 'Neo4j', 'OpenSearch', 'PostgreSQL', 'MongoDB', 'Redis', 'OLMoCR', 'Kafka', 'RabbitMQ'],
    techniques: ['Hybrid Search (Vector + BM25 + Graph)', 'Knowledge-Graph RAG', 'Cross-Encoder Reranking', 'Hierarchical Semantic Chunking', 'Auto-Merge Retrieval'],
  },
];
