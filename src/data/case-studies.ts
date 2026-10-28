export interface CaseStudyMeta {
  slug: string;
  title: string;
  client: string;
  period: string;
  blurb: string;
  coverImage?: string;
  /** true for illustrated covers: shown at full brightness, no tint or crop-in */
  coverIllustration?: boolean;
  coverGradient: string;
  stack: string[];
  draft?: boolean;
}

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: 'fpt-hr-conversational-ai',
    title: 'HR Conversational AI Platform',
    client: 'Covestro AG (via FPT Software)',
    period: 'Mar 2026 – Present',
    blurb:
      'Revived and then replaced a production HR assistant for a Fortune 500 chemicals corporation: measured baseline, semantic cache, HR-only knowledge base, then a zero-downtime move to an MCP-based agent platform on AWS.',
    coverImage: '/assets/case-studies/covestro/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    stack: ['LangGraph', 'MCP', 'AWS Bedrock', 'OpenSearch Serverless', 'AWS CDK', 'Langfuse'],
  },
  {
    slug: 'covestro-agent-configurator',
    title: 'Agent Configurator: Self-Service Agent Platform',
    client: 'Covestro AG (via FPT Software)',
    period: '2026 – Present',
    blurb:
      'Internal web app that lets the product owner and HR see the multi-agent system on a live canvas, create prompt-and-config agents, and ship changes safely: engine-checked, versioned, reviewed by diff, rolled back in a few clicks.',
    coverImage: '/assets/case-studies/agent-configurator/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
    stack: ['Web App', 'Config API', 'DynamoDB', 'Entra ID SSO', 'MCP'],
  },
  {
    slug: 'fpt-contract-intelligence',
    title: 'AI Contract Intelligence System',
    client: 'FPT Software',
    period: 'Jan 2026 – Feb 2026',
    blurb:
      'Skill-based framework with prompt chaining + Qdrant vector RAG. AWS Bedrock as multi-model LLM gateway. Async batch jobs on SQS scale to thousands of contracts per run.',
    coverImage: '/assets/case-studies/fpt-contract/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
    stack: ['Qdrant', 'AWS Bedrock', 'LangChain', 'Prompt Chaining', 'SQS', 'Python'],
  },
  {
    slug: 'hti-agentic-chatbot',
    title: 'Enterprise Agentic Chatbot & LLMOps Infrastructure',
    client: 'HTI Group',
    period: 'Apr 2025 – Dec 2025',
    blurb:
      'Supervisor + Knowledge, Action and ChitChat agents on LangGraph, each with its own ReAct loop. Docling parsing, hierarchical semantic chunking and a knowledge graph. Local POC to AWS production on ECS Fargate, Lambda and Bedrock.',
    coverImage: '/assets/case-studies/hti/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
    stack: ['LangGraph', 'LlamaIndex', 'Docling', 'Neo4j', 'ECS Fargate', 'AWS Lambda', 'AWS CDK'],
  },
  {
    slug: 'hg-chatbot',
    title: 'Enterprise Internal AI Chatbot',
    client: 'HG Group',
    period: 'Sep 2024 – Feb 2025',
    blurb:
      'On-premise RAG chatbot over the company document library. Hybrid Qdrant + MongoDB retrieval, hierarchical chunking, multi-LLM routing (GPT + Gemini), and self-hosted observability with Langfuse + Prometheus + Grafana.',
    coverImage: '/assets/case-studies/hg-chatbot/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    stack: ['BGE-M3', 'Qdrant', 'MongoDB', 'Ray Serve', 'Langfuse', 'Prometheus', 'GPT API'],
  },
  {
    slug: 'esg-business-report',
    title: 'Knowledge-Graph RAG for ESG Banking Reports',
    client: 'Academic Research',
    period: '',
    blurb:
      'GRI-aligned KG-RAG over Vietnamese bank ESG reports. Neo4j + hybrid retrieval + cross-encoder reranking + LLM-as-judge fact-checking. 88.14% accuracy on 1,440 expert-annotated QA pairs.',
    coverImage: '/assets/case-studies/esg-business-report/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
    stack: ['Neo4j', 'Knowledge Graph', 'Qwen3-8B', 'OLMoCR', 'FAISS', 'Cross-Encoder', 'FEVER'],
  },
];
