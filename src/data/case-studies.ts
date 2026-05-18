export interface CaseStudyMeta {
  slug: string;
  title: string;
  client: string;
  period: string;
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
    blurb:
      'LangGraph multi-agent system over hierarchical semantic chunks. AWS Lambda + ECS Fargate. Distributed observability via Langfuse. POC to enterprise production.',
    coverImage: '/assets/case-studies/hti/01-high-level-architecture.png',
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
    stack: ['LangGraph', 'LlamaIndex', 'AWS Lambda', 'ECS Fargate', 'Langfuse', 'AWS CDK', 'Qdrant'],
  },
  {
    slug: 'fpt-hr-conversational-ai',
    title: 'HR Conversational AI Platform',
    client: 'Covestro AG (via FPT Software)',
    period: 'Jan 2026 – Present',
    blurb:
      'Migrated legacy HR conversational AI for a Fortune 500 chemicals corporation. Event-driven microservices on AWS, semantic caching, LLM-as-judge eval, zero-trust + PII redaction.',
    coverImage: '/assets/case-studies/covestro/images/1-general-architecture.png',
    coverGradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    stack: ['LangGraph', 'AWS Bedrock', 'EventBridge', 'SQS', 'OpenSearch', 'Langfuse', 'Lambda'],
  },
  {
    slug: 'fpt-contract-intelligence',
    title: 'AI Contract Intelligence System',
    client: 'FPT Software',
    period: 'Feb 2026 – Present',
    blurb:
      'Skill-based framework with prompt chaining + Qdrant vector RAG. AWS Bedrock as multi-model LLM gateway. Async batch jobs on SQS scale to thousands of contracts per run.',
    coverImage: '/assets/case-studies/fpt-contract/images/2-high-level-architecture.png',
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
    stack: ['Qdrant', 'AWS Bedrock', 'LangChain', 'Prompt Chaining', 'SQS', 'Python'],
  },
  {
    slug: 'hg-chatbot',
    title: 'Enterprise Internal AI Chatbot',
    client: 'HG Group',
    period: 'Sep 2024 – Feb 2025',
    blurb:
      'On-premise RAG chatbot over the company document library. Hybrid Qdrant + MongoDB retrieval, hierarchical chunking, multi-LLM routing (GPT + Gemini), and self-hosted observability with Langfuse + Prometheus + Grafana.',
    coverImage: '/assets/case-studies/hg-chatbot/04-on-premise-aiops-model-layer.png',
    coverGradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    stack: ['BGE-M3', 'Qdrant', 'MongoDB', 'Ray Serve', 'Langfuse', 'Prometheus', 'GPT API'],
  },
  {
    slug: 'esg-business-report',
    title: 'GRI-Aligned ESG Assessment for Vietnamese Banks',
    client: 'FPT University Capstone (AIP491)',
    period: 'Jan 2026 – May 2026',
    blurb:
      'Capstone research building a GRI-aligned ESG assessment system over Vietnamese bank sustainability reports. Neo4j knowledge graph + hybrid retrieval (BM25 + dense + cross-encoder) + claim-level LLM-as-judge fact-checking. 88.14% accuracy on 1,440 expert-annotated QA pairs across 18 banks.',
    coverImage: '/assets/case-studies/esg-business-report/1-overall-system-architecture.png',
    coverGradient: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
    stack: ['Neo4j', 'Knowledge Graph', 'Qwen3-8B', 'OLMoCR', 'FAISS', 'Cross-Encoder', 'FEVER'],
  },
];
