export interface CaseStudyMeta {
  slug: string;
  title: string;
  client: string;
  period: string;
  metric: string;
  blurb: string;
  coverImage?: string;
  coverGradient: string;
  stack: string[];
  draft?: boolean;
}

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: 'hti-agentic-chatbot',
    title: 'Enterprise HR Agentic Chatbot',
    client: 'HTI Group',
    period: 'Apr 2025 – Dec 2025',
    metric: 'Multi-Agent · LLMOps',
    blurb:
      'LangGraph multi-agent system over hierarchical semantic chunks. AWS Lambda + ECS Fargate. Distributed observability via Langfuse. POC to enterprise production.',
    coverImage: '/assets/case-studies/hti/01-high-level-architecture.png',
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
    stack: ['LangGraph', 'LlamaIndex', 'AWS Lambda', 'ECS Fargate', 'Langfuse', 'AWS CDK', 'Qdrant'],
  },
  {
    slug: 'fpt-hr-conversational-ai',
    title: 'HR Conversational AI Platform',
    client: 'Covestro (via FPT Software)',
    period: 'Jan 2026 – Present',
    metric: 'Fortune 500 Migration',
    blurb:
      'Migrated legacy HR conversational AI for a Fortune 500 chemicals corporation. Event-driven microservices on AWS, semantic caching, LLM-as-judge eval, zero-trust + PII redaction.',
    coverGradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    stack: ['LangGraph', 'AWS Bedrock', 'EventBridge', 'SQS', 'OpenSearch', 'Langfuse', 'Lambda'],
  },
  {
    slug: 'fpt-contract-intelligence',
    title: 'AI Contract Intelligence System',
    client: 'FPT Software',
    period: '2026',
    metric: '+35% Extraction Accuracy',
    blurb:
      'Skill-based framework with prompt chaining + Qdrant vector RAG. Dynamic multi-model routing via AWS Bedrock. SSE streaming for low-latency responses. Scales to thousands of documents.',
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
    stack: ['Qdrant', 'AWS Bedrock', 'LangChain', 'SSE', 'Prompt Chaining', 'Python'],
  },
];
